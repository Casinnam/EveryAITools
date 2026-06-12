import type { Language } from '@/data/translations';
import type { MultilingualString, Tool } from '@/types';
import { DATA_LAST_UPDATED } from '@/lib/seo';

export interface ToolInsights {
  bestFor: string[];
  notIdealFor: string[];
  freePlanNote: string;
  paidPlanNote: string;
  koreanNote: string;
  mobileNote: string;
  commercialNote: string;
  lastUpdated: string;
}

const pick = (value: MultilingualString | undefined, language: Language): string | undefined => {
  if (!value) return undefined;
  return value[language] || value.en;
};

const pickList = (values: MultilingualString[] | undefined, language: Language): string[] =>
  (values ?? []).map((value) => pick(value, language)).filter((value): value is string => !!value);

/**
 * Derives transparent decision-support notes for a tool detail page. Editorial
 * overrides on the Tool record (bestFor, freePlanNotes, ...) win; otherwise the
 * notes are generated from the tool's structured attributes so every one of the
 * 500+ tools gets a complete, honest profile.
 */
export function getToolInsights(tool: Tool, language: Language, categoryName: string): ToolInsights {
  const ko = language === 'ko';

  let bestFor = pickList(tool.bestFor, language);
  if (bestFor.length === 0) {
    bestFor = pickList(tool.useCases, language).slice(0, 3);
    if (tool.beginnerFriendly) {
      bestFor.push(ko ? '복잡한 설정 없이 바로 시작하고 싶은 초보자' : 'Beginners who want to start without a steep learning curve');
    }
    if (tool.pricingType !== 'Paid') {
      bestFor.push(ko ? '결제 전에 무료로 먼저 테스트해 보고 싶은 사용자' : 'Users who want to test the tool for free before paying');
    }
  }

  let notIdealFor = pickList(tool.notIdealFor, language);
  if (notIdealFor.length === 0) {
    if (!tool.beginnerFriendly) {
      notIdealFor.push(ko ? '학습 시간 없이 즉시 결과가 필요한 입문자' : 'Complete beginners who need results without any learning time');
    }
    if (!tool.koreanSupport) {
      notIdealFor.push(ko ? '한국어 인터페이스와 출력이 꼭 필요한 사용자' : 'Users who require a fully localized Korean interface and output');
    }
    if (!tool.mobileSupport) {
      notIdealFor.push(ko ? '주로 스마트폰에서 작업하는 모바일 중심 사용자' : 'Mobile-first users who work primarily from a phone');
    }
    if (tool.pricingType === 'Paid') {
      notIdealFor.push(ko ? '무료 플랜이 반드시 필요한 사용자' : 'Users who need a permanent free plan');
    }
    if (!tool.commercialUse) {
      notIdealFor.push(ko ? '결과물을 상업적으로 판매해야 하는 비즈니스 사용자' : 'Businesses that need to sell or license the output commercially');
    }
    if (notIdealFor.length === 0) {
      notIdealFor.push(
        ko
          ? `${categoryName} 외의 작업이 주 목적인 사용자 — 카테고리에 맞는 다른 도구를 먼저 확인해 보세요`
          : `Users whose main job is outside ${categoryName} — check a tool matched to your category first`,
      );
    }
    notIdealFor = notIdealFor.slice(0, 3);
  }

  let freePlanNote = pick(tool.freePlanNotes, language);
  if (!freePlanNote) {
    switch (tool.pricingType) {
      case 'Free':
        freePlanNote = ko
          ? '핵심 기능을 무료로 사용할 수 있습니다. 사용량 제한이나 변경 사항은 공식 사이트에서 확인하세요.'
          : 'Core features are available for free. Verify usage limits and any recent changes on the official site.';
        break;
      case 'Freemium':
        freePlanNote = ko
          ? '무료 플랜이 제공되지만 사용량·기능 제한이 있습니다. 결제 전에 무료 한도로 충분한지 먼저 테스트해 보세요.'
          : 'A free tier is available with usage or feature limits. Test whether the free quota covers your workflow before upgrading.';
        break;
      default:
        freePlanNote = ko
          ? '상시 무료 플랜은 제공되지 않습니다. 무료 체험판이나 환불 정책이 있는지 공식 사이트에서 확인하세요.'
          : 'There is no permanent free plan. Check the official site for a trial period or refund policy before subscribing.';
    }
  }

  let paidPlanNote = pick(tool.paidPlanNotes, language);
  if (!paidPlanNote) {
    if (tool.pricingType === 'Free') {
      paidPlanNote = ko
        ? '현재 기준 별도의 유료 플랜 없이 무료로 제공됩니다. 정책은 변경될 수 있으니 공식 사이트를 확인하세요.'
        : 'Currently offered free of charge without a separate paid plan. Policies can change — confirm on the official site.';
    } else if (tool.startingPrice) {
      paidPlanNote = ko
        ? `유료 플랜은 약 ${tool.startingPrice}부터 시작합니다. 정확한 플랜 구성과 한도는 공식 가격 페이지에서 확인하세요.`
        : `Paid plans start around ${tool.startingPrice}. Confirm exact tiers and limits on the official pricing page.`;
    } else {
      paidPlanNote = ko
        ? '유료 플랜 가격은 사용량과 팀 규모에 따라 다릅니다. 공식 가격 페이지에서 최신 정보를 확인하세요.'
        : 'Paid pricing varies by usage and team size. Check the official pricing page for current rates.';
    }
  }

  const koreanNote = tool.koreanSupport
    ? (ko
      ? '한국어 입력과 출력을 지원합니다. 세부 현지화 품질은 작업 유형에 따라 다를 수 있습니다.'
      : 'Supports Korean input and output. Localization depth can vary by task type.')
    : (ko
      ? '한국어 지원이 제한적입니다. 인터페이스와 결과물이 주로 영어 기준입니다.'
      : 'Korean support is limited. The interface and output are primarily English-based.');

  const mobileNote = tool.mobileSupport
    ? (ko
      ? '모바일 앱 또는 모바일 웹을 지원해 이동 중에도 사용할 수 있습니다.'
      : 'Offers a mobile app or mobile-friendly web experience for working on the go.')
    : (ko
      ? '데스크톱·웹 브라우저 중심 도구입니다. 모바일 사용성은 제한적입니다.'
      : 'Primarily a desktop or web-browser tool; mobile usability is limited.');

  let commercialNote = pick(tool.commercialNotes, language);
  if (!commercialNote) {
    commercialNote = tool.commercialUse
      ? (ko
        ? '상업적 사용이 허용됩니다. 단, 플랜별 라이선스 조건이 다를 수 있으니 약관을 확인하세요.'
        : 'Commercial use is allowed. License terms can differ per plan, so review the terms of service.')
      : (ko
        ? '상업적 사용에 제한이 있을 수 있습니다. 수익화 목적이라면 라이선스 조건을 먼저 확인하세요.'
        : 'Commercial use may be restricted. Verify license terms before using outputs in paid work.');
  }

  return {
    bestFor: bestFor.slice(0, 4),
    notIdealFor,
    freePlanNote,
    paidPlanNote,
    koreanNote,
    mobileNote,
    commercialNote,
    lastUpdated: tool.lastUpdated ?? DATA_LAST_UPDATED,
  };
}
