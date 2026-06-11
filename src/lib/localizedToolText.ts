import type { Language } from '../data/translations';
import type { MultilingualString, Tool } from '../types';

type ToolTextField = 'description' | 'longDescription' | 'beginnerDescription';
type ToolListField = 'features' | 'pros' | 'cons' | 'useCases';

const mojibakePattern = /[�]|[?]{2,}|[媛-熙]/;
const hangulPattern = /[가-힣]/g;
const latinPattern = /[A-Za-z]/g;

function isUsableLocalizedText(value: string | undefined, language: Language, englishFallback?: string): value is string {
  if (!value || !value.trim()) return false;
  if (language !== 'ko') return true;

  const normalized = value.trim();
  if (englishFallback && normalized === englishFallback.trim()) return false;
  if (mojibakePattern.test(normalized)) return false;

  const hangulCount = normalized.match(hangulPattern)?.length ?? 0;
  const latinCount = normalized.match(latinPattern)?.length ?? 0;

  if (hangulCount === 0 && latinCount > 8) return false;
  if (latinCount > Math.max(18, hangulCount * 2) && normalized.length > 24) return false;

  return true;
}

function readLocalizedText(value: MultilingualString | undefined, language: Language): string | undefined {
  if (!value) return undefined;
  const localized = value[language];
  return isUsableLocalizedText(localized, language, value.en) ? localized : undefined;
}

function koreanFieldFallback(tool: Tool, field: ToolTextField, categoryName: string): string {
  switch (field) {
    case 'description':
      return `${tool.name}은 ${categoryName} 분야에서 활용할 수 있는 AI 도구입니다. 기능, 가격, 사용 목적을 비교해 내 작업에 맞는지 판단할 수 있도록 정리했습니다.`;
    case 'beginnerDescription':
      return `${tool.name}은 ${categoryName} 작업을 더 쉽게 시작하도록 도와주는 AI 도구입니다. 처음 사용한다면 작은 작업부터 입력해 결과를 확인하고, 필요한 부분을 직접 다듬는 방식으로 접근하는 것이 좋습니다.`;
    case 'longDescription':
    default:
      return `${tool.name}은 ${categoryName} 관련 작업을 보조하는 AI 서비스입니다. 반복적인 작업을 줄이고 결과물을 더 빠르게 만들 수 있도록 설계되었으며, 실제 선택 전에는 가격, 출력 품질, 한국어 지원 여부, 상업적 사용 조건을 함께 확인하는 것이 좋습니다.`;
  }
}

const koreanListFallbacks: Record<ToolListField, string[]> = {
  features: [
    'AI를 활용해 핵심 작업을 더 빠르게 처리',
    '반복적인 워크플로우를 줄이는 자동화 기능',
    '프로젝트 목적에 맞게 결과를 조정할 수 있는 구성',
  ],
  pros: [
    '처음 도입해도 비교적 쉽게 활용 가능',
    '반복 작업 시간을 줄이는 데 도움',
    '비슷한 도구와 비교해 선택 기준을 세우기 좋음',
  ],
  cons: [
    '세부 가격과 제한 사항은 공식 사이트 확인 필요',
    '중요한 결과물은 직접 검토와 수정이 필요',
    '작업 목적에 따라 만족도가 달라질 수 있음',
  ],
  useCases: [
    '업무 초안이나 아이디어를 빠르게 만들기',
    '비슷한 AI 도구와 비교해 후보를 좁히기',
    '실무 프로젝트에 맞는 자동화 흐름 검토하기',
  ],
};

const englishListFallbacks: Record<ToolListField, string[]> = {
  features: ['Core AI-assisted workflow', 'Automation for repetitive tasks', 'Adjustable outputs for practical projects'],
  pros: ['Relatively easy to adopt', 'Useful for saving time on repeat work', 'Good candidate for side-by-side comparison'],
  cons: ['Pricing and limits should be checked on the official site', 'Important outputs still need human review', 'Fit depends on your exact workflow'],
  useCases: ['Drafting first-pass work quickly', 'Shortlisting similar AI tools', 'Testing practical workflow automation'],
};

export function getToolText(tool: Tool, field: ToolTextField, language: Language, categoryName: string): string {
  const value = readLocalizedText(tool[field], language);
  if (value) return value;
  if (language === 'ko') return koreanFieldFallback(tool, field, categoryName);
  return tool[field]?.en || koreanFieldFallback(tool, field, categoryName);
}

export function getToolList(tool: Tool, field: ToolListField, language: Language): string[] {
  const source = tool[field];
  const fallback = language === 'ko' ? koreanListFallbacks[field] : englishListFallbacks[field];

  if (!source.length) return fallback;

  return source.map((item, index) => readLocalizedText(item, language) || fallback[index % fallback.length]);
}

export function getToolFaqs(tool: Tool, language: Language, categoryName: string) {
  if (language === 'ko') {
    return [
      {
        question: `${tool.name}은 어떤 작업에 적합한가요?`,
        answer: `${tool.name}은 ${categoryName} 관련 작업을 더 빠르게 준비하거나 반복 업무를 줄이고 싶을 때 검토할 만한 도구입니다.`,
      },
      {
        question: `${tool.name}을 무료로 사용할 수 있나요?`,
        answer: `현재 가격 유형은 ${tool.pricingType}입니다. 실제 무료 한도, 유료 플랜, 사용량 제한은 공식 사이트에서 최종 확인하는 것이 좋습니다.`,
      },
      {
        question: `${tool.name}을 선택하기 전에 무엇을 확인해야 하나요?`,
        answer: '가격, 한국어 지원, 모바일 사용성, 상업적 사용 조건, 출력물 품질을 함께 비교해 보세요.',
      },
    ];
  }

  return [
    {
      question: `What is ${tool.name} best for?`,
      answer: `${tool.name} is worth considering for ${categoryName} workflows where you want faster drafts, automation, or clearer tool comparison.`,
    },
    {
      question: `Can I use ${tool.name} for free?`,
      answer: `Its current pricing type is ${tool.pricingType}. Check the official site for exact free limits, paid plans, and usage restrictions.`,
    },
    {
      question: `What should I check before choosing ${tool.name}?`,
      answer: 'Compare pricing, language support, mobile availability, commercial-use terms, and output quality before committing.',
    },
  ];
}
