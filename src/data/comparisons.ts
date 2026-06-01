import { Comparison } from '../types';

export const comparisons: Comparison[] = [
  {
    id: 'chatgpt-vs-claude-vs-gemini',
    title: {
      en: 'ChatGPT vs Claude vs Gemini: Which AI Assistant is Best for You?',
      ko: 'ChatGPT vs Claude vs Gemini: 나에게 꼭 맞는 최강 AI 비서는?'
    },
    slug: 'chatgpt-vs-claude-vs-gemini',
    toolIds: ['chatgpt', 'claude', 'gemini'],
    summary: {
      en: 'A deep comparative look at the top three general-purpose AI assistants. While ChatGPT excels in versatility and features, Claude dominates in writing quality, and Gemini shines with Google ecosystem integration.',
      ko: '글로벌 3대 대형 AI 서비스의 장단점 총정리! 다재다능하고 기능이 많은 ChatGPT, 소름 돋게 자연스러운 문장력의 Claude, 구글 연동성과 실시간 검색 최적화의 Gemini 중 나에게 필요한 도구를 비교해 드립니다.'
    },
    tableData: [
      {
        feature: { en: 'Primary Strengths', ko: '최고 강점 분야' },
        values: {
          chatgpt: {
            en: 'Versatility, Coding, Custom GPTs',
            ko: '엄청난 범용성, 코딩, 맞춤형 챗봇(GPTs)'
          },
          claude: {
            en: 'Flawless writing, reasoning, code logic',
            ko: '고급스러운 글쓰기 톤, 소스 분석, 정교한 논리 추론'
          },
          gemini: {
            en: 'Real-time search, Google ecosystem sync',
            ko: '구글 검색 연동 속도, 구글 서비스 결합'
          }
        }
      },
      {
        feature: { en: 'Writing Aesthetics', ko: '문장력 및 작문 자연스러움' },
        values: {
          chatgpt: { en: 'Excellent (Slightly textbook)', ko: '매우 우수 (가끔 교과서 같은 어조)' },
          claude: { en: 'Outstanding (Extremely human-like)', ko: '독보적 (인간 전문 작가 감성)' },
          gemini: { en: 'Good (Can feel slightly robotic)', ko: '우수 (가끔 딱딱하고 정형적)' }
        }
      },
      {
        feature: { en: 'Korean Support Rating', ko: '한국어 자연스러움 점수' },
        values: {
          chatgpt: '9.5 / 10',
          claude: '9.8 / 10',
          gemini: '9.0 / 10'
        }
      },
      {
        feature: { en: 'Free Plan Value', ko: '무료 혜택 제공 수준' },
        values: {
          chatgpt: {
            en: 'Generous (Access to GPT-4o, builder custom GPTs)',
            ko: '대단히 넉넉함 (최신 GPT-4o 제한적 무료 사용 및 GPTs 마켓 개방)'
          },
          claude: {
            en: 'Strict limits (Very few messages allowed per day)',
            ko: '매우 박함 (조금만 질문해도 몇 시간 질문 제한 락이 걸림)'
          },
          gemini: {
            en: 'Good (Unlimited standard searches, fast)',
            ko: '우수 (인터넷 검색 및 대화가 횟수 제한 없이 빠른 편)'
          }
        }
      },
      {
        feature: { en: 'Web Search Integration', ko: '실시간 웹 검색 성능' },
        values: {
          chatgpt: true,
          claude: false,
          gemini: true
        }
      }
    ],
    prosAndCons: {
      chatgpt: {
        pros: [
          { en: 'Huge community library of custom GPT bots', ko: '수십만 개 이상의 맞춤형 GPT 비서 마켓 자유 이용' },
          { en: 'Best coding capabilities on average', ko: '전반적인 코드 생성 및 오류 수정 능력이 최정상급' }
        ],
        cons: [
          { en: 'Can sometimes hallucinate incorrect facts', ko: '가끔 그럴듯하게 잘못된 지식을 팩트처럼 대답함' }
        ]
      },
      claude: {
        pros: [
          { en: 'Stunningly natural long essays and articles', ko: '긴 블로그나 보도자료를 윤문할 때 가장 고급스러움' },
          { en: 'Huge document upload capabilities (PDF analysis)', ko: '두꺼운 기획 문서나 코드 전체 파일도 거뜬히 이해함' }
        ],
        cons: [
          { en: 'Very strict limit caps on messages', ko: '질문 횟수 제한이 매우 잦아 맥이 끊길 수 있음' }
        ]
      },
      gemini: {
        pros: [
          { en: 'Direct email draft/Docs export buttons', ko: '지메일 답장 쓰기 및 구글 시트로 표 내보내기 최강 편리' },
          { en: 'Best real-time news search integration', ko: '최신 언론 보도나 검색 트렌드를 파악하는 정보 신뢰도 최고' }
        ],
        cons: [
          { en: 'Strict content censorship filters', ko: '조금이라도 논란의 여지가 있는 질문은 답변 거부' }
        ]
      }
    },
    recommendation: {
      en: 'Choose **Claude** if you are writing long blogs, professional novels, or need complex code reviewed. Choose **ChatGPT** if you want custom integrations, automated workflows, and robust general-purpose tasking. Choose **Gemini** if your life is already built inside Gmail and Google Drive and you require real-time research.',
      ko: '블로그 마케팅, 책 집필, 혹은 긴 소스코드를 넣고 정교한 요약을 원한다면 단연 **Claude**를 추천합니다. 다양한 특화 기능 챗봇, 코딩 초안 작성, 챗GPT 어플 활용이 중요하다면 **ChatGPT**가 정답입니다. 지메일, 구글 시트, 캘린더를 메인으로 일하며 실시간 뉴스와 정보 검색이 필수라면 **Gemini**가 최고의 도우미입니다.'
    }
  }
];
export default comparisons;
