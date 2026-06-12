'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import { ToolCard } from '@/components/ToolCard';
import { Sparkles, ArrowLeft, ArrowRight, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Question {
  id: number;
  question: { en: string; ko: string };
  options: {
    label: { en: string; ko: string };
    value: string;
  }[];
}

interface MatchReason {
  en: string;
  ko: string;
}

export function FinderClient() {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  // Quiz Answers State
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  // 5 Step-by-Step Questions Design
  const questions: Question[] = [
    {
      id: 1,
      question: {
        en: 'What do you want to create or accomplish?',
        ko: '어떤 작업을 주로 해결하고 싶으신가요?'
      },
      options: [
        { label: { en: 'Write articles or blog posts', ko: '블로그 포스팅 및 긴 글 쓰기' }, value: 'writing' },
        { label: { en: 'Produce videos, YouTube scripts & edits', ko: '영상 제작, 유튜브 시나리오 및 편집' }, value: 'video-generation' },
        { label: { en: 'Generate digital art & graphics', ko: '예술 이미지, 일러스트 그래픽 생성' }, value: 'image-generation' },
        { label: { en: 'Create voiceovers, narration & audio', ko: '음성 더빙, 내레이션 및 오디오 제작' }, value: 'audio-voice' },
        { label: { en: 'Write software code or build websites', ko: '컴퓨터 프로그래밍 및 웹사이트 코딩' }, value: 'coding-dev' },
        { label: { en: 'Draft presentation slides & documents', ko: '발표 슬라이드 및 문서 제작' }, value: 'presentation-docs' }
      ]
    },
    {
      id: 2,
      question: {
        en: 'What is your software skill level?',
        ko: '사용자의 인공지능 도구 숙련도는 어느 정도인가요?'
      },
      options: [
        { label: { en: 'Beginner (I want simple, easy tools)', ko: '초보자 (복잡한 배움 없이 당장 쓸 수 있는 도구)' }, value: 'beginner' },
        { label: { en: 'Intermediate (Comfortable learning settings)', ko: '중급자 (약간의 설정법과 편집을 곁들일 수준)' }, value: 'intermediate' },
        { label: { en: 'Professional (I need maximum features & logic)', ko: '전문가 (코딩이나 복잡하고 세밀한 픽셀 조작 필요)' }, value: 'professional' }
      ]
    },
    {
      id: 3,
      question: {
        en: 'Do you require a free-to-use plan?',
        ko: '월 구독료 없는 무료 도구가 필수인가요?'
      },
      options: [
        { label: { en: 'Yes, 100% Free only', ko: '예, 비용이 전혀 들지 않는 완전 무료 희망' }, value: 'free' },
        { label: { en: 'Freemium is okay (Free version exists)', ko: '일부 무료 사용 가능(Freemium)이면 수용' }, value: 'freemium' },
        { label: { en: 'Paid is fine if the quality is excellent', ko: '유료 결제 전용이더라도 성능만 뛰어나다면 무관' }, value: 'any' }
      ]
    },
    {
      id: 4,
      question: {
        en: 'What matter or feature is most critical to you?',
        ko: '성능 중에서 가장 중요하게 여기는 가치는 무엇인가요?'
      },
      options: [
        { label: { en: 'Easy interface & fast output', ko: '직관적이고 단순한 디자인 및 빠른 결과 생성' }, value: 'easy' },
        { label: { en: 'Professional output quality & detail', ko: '디테일한 연출 화질 및 최종 결과물의 뛰어난 퀄리티' }, value: 'quality' },
        { label: { en: 'Natural Korean language output support', ko: '매끄럽고 자연스러운 한글 대화 및 출력 지원' }, value: 'korean' },
        { label: { en: 'Commercial usage rights allowed', ko: '수익 창출용 상업적 사용 권한 라이선스 허용' }, value: 'commercial' }
      ]
    },
    {
      id: 5,
      question: {
        en: 'Where do you prefer to perform your work?',
        ko: '어떤 기기 환경에서 작업하시는 것을 선호하시나요?'
      },
      options: [
        { label: { en: 'Web browser only (PC or Laptop)', ko: '오직 웹 브라우저 (데스크톱 및 노트북 인터넷 창)' }, value: 'web' },
        { label: { en: 'Mobile application or Both', ko: '스마트폰 모바일 앱 겸용' }, value: 'mobile' }
      ]
    }
  ];

  const handleSelectOption = (value: string) => {
    setAnswers({ ...answers, [currentStep + 1]: value });
  };

  const handleNext = () => {
    if (!answers[currentStep + 1]) return;
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  // RECOMMENDATION ENGINE: Calculate matching score (%) and collect transparent
  // match reasons for each tool in our database.
  const getRecommendedTools = () => {
    const quizCategory = answers[1]; // categoryId target
    const quizSkill = answers[2]; // 'beginner' | 'intermediate' | 'professional'
    const quizFree = answers[3]; // 'free' | 'freemium' | 'any'
    const quizMatters = answers[4]; // 'easy' | 'quality' | 'korean' | 'commercial'
    const quizDevice = answers[5]; // 'web' | 'mobile'

    const quizCategoryRecord = categories.find((category) => category.id === quizCategory);

    const toolsWithScores = tools.map((tool) => {
      let score = 0;
      let totalWeights = 0;
      const reasons: MatchReason[] = [];

      // 1. Category Matching (Weight: 40 points)
      totalWeights += 40;
      if (tool.categoryId === quizCategory) {
        score += 40;
        if (quizCategoryRecord) {
          reasons.push({
            en: `Matches your goal: ${quizCategoryRecord.name.en}`,
            ko: `선택한 작업과 일치: ${quizCategoryRecord.name.ko}`,
          });
        }
      }

      // 2. Skill Level (Weight: 15 points)
      totalWeights += 15;
      if (quizSkill === 'beginner') {
        if (tool.beginnerFriendly) {
          score += 15;
          reasons.push({ en: 'Beginner-friendly — easy to pick up without training', ko: '초보자도 별도 학습 없이 쉽게 시작할 수 있음' });
        } else {
          score += 3; // penalty for pro-only tools for beginners
        }
      } else if (quizSkill === 'professional') {
        if (!tool.beginnerFriendly) {
          score += 15; // Pro users like Cursor, Runway
          reasons.push({ en: 'Deep, professional-grade controls for advanced users', ko: '전문가를 위한 세밀한 고급 기능 제공' });
        } else {
          score += 10;
        }
      } else {
        score += 15; // intermediate matches almost anything
      }

      // 3. Pricing Requirement (Weight: 20 points)
      totalWeights += 20;
      if (quizFree === 'free') {
        if (tool.pricingType === 'Free') {
          score += 20;
          reasons.push({ en: 'Completely free to use', ko: '완전 무료로 사용 가능' });
        } else if (tool.pricingType === 'Freemium') {
          score += 12;
          reasons.push({ en: 'Offers a usable free tier (with limits)', ko: '제한은 있지만 쓸 만한 무료 버전 제공' });
        }
      } else if (quizFree === 'freemium') {
        if (tool.pricingType === 'Free' || tool.pricingType === 'Freemium') {
          score += 20;
          reasons.push({ en: 'Free plan available so you can test before paying', ko: '결제 전에 테스트할 수 있는 무료 플랜 제공' });
        }
      } else {
        score += 20; // Paid or any is okay
      }

      // 4. What matters most (Weight: 15 points)
      totalWeights += 15;
      if (quizMatters === 'easy' && tool.beginnerFriendly) {
        score += 15;
        reasons.push({ en: 'Simple interface with fast results', ko: '직관적인 화면과 빠른 결과 생성' });
      } else if (quizMatters === 'quality' && tool.rating >= 4.7) {
        score += 15;
        reasons.push({ en: `High editor rating (${tool.rating}/5) for output quality`, ko: `결과물 품질 에디터 평점 ${tool.rating}/5점` });
      } else if (quizMatters === 'korean' && tool.koreanSupport) {
        score += 15;
        reasons.push({ en: 'Supports natural Korean input and output', ko: '자연스러운 한국어 입력·출력 지원' });
      } else if (quizMatters === 'commercial' && tool.commercialUse) {
        score += 15;
        reasons.push({ en: 'Commercial use of outputs is allowed', ko: '결과물의 상업적 사용 허용' });
      } else {
        score += 5; // default fallback
      }

      // 5. Device preference (Weight: 10 points)
      totalWeights += 10;
      if (quizDevice === 'mobile') {
        if (tool.mobileSupport) {
          score += 10;
          reasons.push({ en: 'Mobile app or mobile web supported', ko: '모바일 앱 또는 모바일 웹 지원' });
        } else {
          score += 4;
        }
      } else {
        score += 10; // Web support is universal
      }

      // Calculate final match percentage
      const matchPercentage = Math.round((score / totalWeights) * 100);

      return {
        ...tool,
        matchPercentage,
        matchReasons: reasons,
      };
    });

    // Sort by match score descending, then rating descending
    return toolsWithScores
      .filter(t => t.matchPercentage >= 40) // only show tools with reasonable match
      .sort((a, b) => b.matchPercentage - a.matchPercentage || b.rating - a.rating)
      .slice(0, 3); // Return TOP 3
  };

  const recommendedTools = showResults ? getRecommendedTools() : [];
  const activeQuestion = questions[currentStep];
  const progressPercent = Math.round(((currentStep + (showResults ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 transition-all duration-300">

      {/* 1. HEADER */}
      <div className="text-center space-y-2">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {t('finderTitle')}
        </h1>
        <p className="mx-auto max-w-lg text-sm text-slate-500">
          {t('finderSubtitle')}
        </p>
      </div>

      {/* 2. PROGRESS BAR */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wide">
          <span>Progress</span>
          <span className="text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3. INTERACTIVE QUIZ INTERACTION */}
      {!showResults ? (
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-8 animate-in fade-in duration-300">

          {/* Question Text */}
          <div className="space-y-1">
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Question {activeQuestion.id} of {questions.length}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white leading-snug">
              {activeQuestion.question[language] || activeQuestion.question['en']}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeQuestion.options.map((opt) => {
              const isSelected = answers[activeQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`w-full text-left p-5 rounded-2xl border-2 font-bold text-sm transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/20 dark:text-indigo-300'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
                  }`}
                >
                  <span>{opt.label[language] || opt.label['en']}</span>
                  {isSelected && <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-extrabold text-[10px]">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Buttons Navigation */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center space-x-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('finderPrevBtn')}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!answers[activeQuestion.id]}
              className="flex items-center space-x-1 px-5 py-3 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 active:scale-95 transition-all shadow-md shadow-indigo-600/10"
            >
              <span>{currentStep === questions.length - 1 ? t('finderResultBtn') : t('finderNextBtn')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </section>
      ) : (
        /* 4. RESULTS DASHBOARD */
        <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
            <h2 className="text-lg font-black text-slate-950 dark:text-white flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
              <span>Your Personalized Top Recommendations</span>
            </h2>
            <button
              onClick={resetQuiz}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t('finderResetBtn')}</span>
            </button>
          </div>

          {recommendedTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedTools.map((tool) => (
                <div key={tool.id} className="relative flex flex-col gap-3">
                  {/* Match percentage floating badge */}
                  <div className="absolute -top-3 -right-2 z-10 flex items-center space-x-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 text-[10px] font-black text-white shadow-md">
                    <span>{t('finderMatch')}: {tool.matchPercentage}%</span>
                  </div>
                  <ToolCard tool={tool} />

                  {/* Why this tool was recommended */}
                  {tool.matchReasons.length > 0 && (
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/5">
                      <p className="text-[11px] font-black uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                        {t('finderWhyTitle')}
                      </p>
                      <ul className="mt-2.5 space-y-1.5">
                        {tool.matchReasons.slice(0, 4).map((reason, index) => (
                          <li key={index} className="flex items-start gap-1.5 text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                            <span>{language === 'ko' ? reason.ko : reason.en}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white py-16 px-4 text-center dark:border-slate-800 dark:bg-slate-900">
              <AlertCircle className="mx-auto h-12 w-12 text-slate-400 animate-bounce" />
              <h3 className="mt-4 text-sm font-extrabold text-slate-900 dark:text-white">No Match Found</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                {t('finderNoResult')}
              </p>
              <button
                onClick={resetQuiz}
                className="mt-6 inline-flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>{t('finderResetBtn')}</span>
              </button>
            </div>
          )}

        </section>
      )}

    </div>
  );
}

export default FinderClient;
