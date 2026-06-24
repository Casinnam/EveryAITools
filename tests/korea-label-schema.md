# 한국 특화 라벨 스키마 설계 (everyaitools)

> 목적: 기존 도구 데이터(477개)를 깨지 않고, 한국 사용자의 의사결정에 직결되는
> "한국 특화" 정보를 일관된 구조로 추가한다. 이 스키마가 곧 aixploria·moket이
> 못 채우는 **신뢰 + 한국 정밀도** 차별점이 된다.

---

## 0. 설계 원칙

1. **비파괴(additive):** 기존 tool 객체에 `korea` 하위 객체만 추가. 기존 필드는 그대로.
2. **1 필드 = 1 의사결정:** 모든 한국 필드는 사용자의 실제 질문 하나에 답한다.
   - "한국어로 쓸 만한가?" → 언어 품질 그룹
   - "원화로 내나, 얼마인가?" → 가격 그룹
   - "해외카드 없이 결제되나?" → 결제 그룹
   - "지금 한국에서 살아있나?" → 검증 그룹
3. **필터용 / 표시용 분리:** enum·boolean은 필터·배지로, `*_note_ko`는 카드/상세 설명으로.
4. **검증이 데이터에 박힌다:** `kr_status`, `kr_last_checked`, `kr_source_url`로
   "확인 후 등재 + 확인일 표기"를 강제 → editor-tested의 증거.
5. **이중언어:** 표시 텍스트는 한국어(`_ko`) 기준, 필요 시 영어 병기.

---

## 1. 필드 정의

### 그룹 A — 한국어 품질 / 국적

| key | 타입 | 값 / enum | 설명 | 필터 | 배지/표시 |
|---|---|---|---|---|---|
| `is_korean_made` | boolean | true/false | **국산 여부 (해자 핵심)** | ✅ | ✅ ★국산 |
| `maker` | string | 회사/제작자명 | 예: "뤼튼테크놀로지스" | | ✅ |
| `maker_country` | string | ISO 국가코드 | "KR","US"… | ✅ | |
| `korean_ui` | boolean | true/false | UI·메뉴 한국어 제공 | ✅ | ✅ |
| `korean_io` | enum | `native`/`high`/`medium`/`low`/`none` | **입출력(생성결과) 한국어 품질** | ✅ | ✅ |
| `korean_notes_ko` | string | 자유 텍스트(ko) | "존댓말 자연스러움, 맞춤법 보정 약함" | | ✅ |

`korean_io` 값 정의:
- `native` — 한국어가 기본/특화 (국산 다수)
- `high` — 영어권 도구지만 한국어 결과가 매우 자연스러움 (ChatGPT, Claude 등)
- `medium` — 의미는 통하나 어색하거나 용어 번역체
- `low` — 한국어 가능하나 품질 낮음
- `none` — 한국어 미지원

### 그룹 B — 가격 (KRW)

| key | 타입 | 값 | 설명 | 필터 | 배지/표시 |
|---|---|---|---|---|---|
| `krw_billing` | boolean | true/false | **실제 원화 청구 여부**(자동환산 아님) | ✅ | ✅ |
| `paid_from_krw` | number\|null | 예: 19800 | 유료 시작가(원). 달러결제면 null | | ✅ |
| `paid_from_usd` | number\|null | 예: 20 | 달러 시작가(있으면) | | ✅ |
| `billing_cycle` | enum | `monthly`/`yearly`/`one_time`/`usage` | 과금 주기 | | ✅ |
| `price_display_ko` | string | "월 19,800원~" / "$20/mo (약 28,000원)" | 표시 전용 문자열 | | ✅ |
| `price_note_ko` | string | "달러 결제, 환율 변동 있음" | | | ✅ |

> 환산가는 표시용 참고치임을 `price_note_ko`에 명시(환율 변동 면책).

### 그룹 C — 결제 방식

| key | 타입 | 값 | 설명 | 필터 | 배지/표시 |
|---|---|---|---|---|---|
| `requires_overseas_card` | boolean | true/false | **해외결제 가능 카드 필요 여부**(한국 페인포인트 1순위) | ✅ | ✅ |
| `payment_methods` | string[] | enum 배열(아래) | 지원 결제수단 | ✅ | ✅ |
| `payment_note_ko` | string | "인앱결제만 가능, 웹 결제 불가" | | | ✅ |

`payment_methods` enum:
`domestic_card`(국내카드) · `overseas_card`(해외카드) · `kakao_pay` · `naver_pay` ·
`toss` · `phone_billing`(휴대폰결제) · `app_store`(앱스토어 인앱) · `play_store` ·
`paypal` · `bank_transfer`(계좌이체) · `free`(결제불필요)

### 그룹 D — 한국 접근성 / 가입

| key | 타입 | 값 | 설명 | 필터 | 배지/표시 |
|---|---|---|---|---|---|
| `available_in_korea` | boolean | true/false | 한국에서 접속·가입 가능 | ✅ | (false일 때만) |
| `signup_methods` | string[] | `kakao`/`naver`/`google`/`apple`/`email`/`phone` | 소셜 로그인 포함 | ✅ | ✅ |
| `mobile_app` | object | {ios,android,one_store:bool} | 앱 제공(원스토어 포함) | ✅ | ✅ |
| `korean_support_channel` | enum | `none`/`email`/`chat`/`community`/`phone` | 한국어 고객지원 | | ✅ |

### 그룹 E — 한국 맥락 용도 / 상업적 이용

| key | 타입 | 값 | 설명 | 필터 | 배지/표시 |
|---|---|---|---|---|---|
| `commercial_use_kr` | enum | `allowed`/`paid_only`/`restricted`/`unknown` | 한국 상업적 이용 가부 | ✅ | ✅ |
| `commercial_note_ko` | string | "유료플랜만 상업적 사용 허용" | | | ✅ |
| `best_for_ko` | string[] | 한국 사용자 관점 추천 용도 | "한국어 블로그 초안","유튜브 자막" | | ✅ |

### 그룹 F — 검증 메타데이터 (신뢰 차별점)

| key | 타입 | 값 | 설명 | 필터 | 배지/표시 |
|---|---|---|---|---|---|
| `kr_status` | enum | `active`/`limited`/`beta`/`discontinued`/`blocked` | **현재 한국 서비스 상태** | ✅ | ✅ |
| `kr_verified` | boolean | true/false | 에디터 한국 정보 검증 완료 | ✅ | ✅ ✔검증 |
| `kr_last_checked` | date | "2026-06-22" (ISO) | 마지막 확인일 | | ✅ |
| `kr_checked_by` | string | "jae" | 확인자 | | |
| `kr_source_url` | string\|null | 확인 출처 URL | | | (상세 각주) |

`kr_status` 값 정의:
- `active` — 정상 서비스
- `limited` — 일부 기능/지역 제한 (예: 기업용만, 하이퍼클로바X)
- `beta` — 베타/얼리액세스
- `discontinued` — 종료 (예: CLOVA X 소비자판 2026-04 종료) → 목록에선 "종료" 배지 + 검색 하위 노출
- `blocked` — 한국에서 접속/가입 불가

---

## 2. TypeScript 타입

```ts
type KoreanIO = "native" | "high" | "medium" | "low" | "none";
type PaymentMethod =
  | "domestic_card" | "overseas_card" | "kakao_pay" | "naver_pay"
  | "toss" | "phone_billing" | "app_store" | "play_store"
  | "paypal" | "bank_transfer" | "free";
type CommercialKR = "allowed" | "paid_only" | "restricted" | "unknown";
type KrStatus = "active" | "limited" | "beta" | "discontinued" | "blocked";

interface KoreaMeta {
  // A. 언어/국적
  is_korean_made: boolean;
  maker?: string;
  maker_country?: string;      // "KR" | "US" ...
  korean_ui: boolean;
  korean_io: KoreanIO;
  korean_notes_ko?: string;

  // B. 가격(KRW)
  krw_billing: boolean;
  paid_from_krw: number | null;
  paid_from_usd: number | null;
  billing_cycle?: "monthly" | "yearly" | "one_time" | "usage";
  price_display_ko?: string;
  price_note_ko?: string;

  // C. 결제
  requires_overseas_card: boolean;
  payment_methods: PaymentMethod[];
  payment_note_ko?: string;

  // D. 접근성/가입
  available_in_korea: boolean;
  signup_methods?: ("kakao"|"naver"|"google"|"apple"|"email"|"phone")[];
  mobile_app?: { ios: boolean; android: boolean; one_store: boolean };
  korean_support_channel?: "none"|"email"|"chat"|"community"|"phone";

  // E. 용도/상업적 이용
  commercial_use_kr: CommercialKR;
  commercial_note_ko?: string;
  best_for_ko?: string[];

  // F. 검증
  kr_status: KrStatus;
  kr_verified: boolean;
  kr_last_checked: string;     // ISO date
  kr_checked_by?: string;
  kr_source_url?: string | null;
}

// 기존 Tool 인터페이스에 추가 (비파괴)
interface Tool {
  // ...기존 필드(id, name, category, pricing, rating 등)...
  korea?: KoreaMeta;           // optional → 점진적 마이그레이션 가능
}
```

---

## 3. JSON 예시

### 3-1. 국산 도구 (뤼튼)

```json
{
  "id": "wrtn",
  "name": "뤼튼",
  "category": "chatbots",
  "korea": {
    "is_korean_made": true,
    "maker": "뤼튼테크놀로지스",
    "maker_country": "KR",
    "korean_ui": true,
    "korean_io": "native",
    "korean_notes_ko": "한국어 대화·글쓰기 품질 최상. 여러 모델을 무료로 묶어 제공.",

    "krw_billing": true,
    "paid_from_krw": 0,
    "paid_from_usd": null,
    "billing_cycle": "monthly",
    "price_display_ko": "전면 무료",
    "price_note_ko": "기본 기능 무료. 일부 고급 기능 유료화 가능성 있음.",

    "requires_overseas_card": false,
    "payment_methods": ["free", "kakao_pay", "naver_pay", "app_store"],
    "payment_note_ko": "기본 사용은 결제 불필요.",

    "available_in_korea": true,
    "signup_methods": ["kakao", "naver", "google", "apple", "email"],
    "mobile_app": { "ios": true, "android": true, "one_store": false },
    "korean_support_channel": "email",

    "commercial_use_kr": "allowed",
    "commercial_note_ko": "약관 확인 권장. 생성물 상업적 활용 일반적으로 가능.",
    "best_for_ko": ["한국어 블로그 초안", "한국어 검색·요약", "이미지 생성 입문"],

    "kr_status": "active",
    "kr_verified": true,
    "kr_last_checked": "2026-06-22",
    "kr_checked_by": "jae",
    "kr_source_url": "https://wrtn.ai/"
  }
}
```

### 3-2. 글로벌 도구 + 한국 라벨만 입힘 (ChatGPT)

```json
{
  "id": "chatgpt",
  "name": "ChatGPT",
  "category": "writing",
  "korea": {
    "is_korean_made": false,
    "maker": "OpenAI",
    "maker_country": "US",
    "korean_ui": true,
    "korean_io": "high",
    "korean_notes_ko": "한국어 출력 자연스러움. 고유명사·최신 한국 정보는 환각 주의.",

    "krw_billing": false,
    "paid_from_krw": null,
    "paid_from_usd": 20,
    "billing_cycle": "monthly",
    "price_display_ko": "$20/월 (약 28,000원)",
    "price_note_ko": "달러 결제, 환율에 따라 청구액 변동.",

    "requires_overseas_card": true,
    "payment_methods": ["overseas_card"],
    "payment_note_ko": "해외결제 가능 카드 필요. 일부 국내카드 거절 사례 있음.",

    "available_in_korea": true,
    "signup_methods": ["google", "apple", "email", "phone"],
    "mobile_app": { "ios": true, "android": true, "one_store": false },
    "korean_support_channel": "none",

    "commercial_use_kr": "allowed",
    "commercial_note_ko": "플랜별 약관 상이, 사용 전 ToS 확인.",
    "best_for_ko": ["글 초안", "장문 요약", "코딩 보조"],

    "kr_status": "active",
    "kr_verified": true,
    "kr_last_checked": "2026-06-22",
    "kr_checked_by": "jae",
    "kr_source_url": "https://chatgpt.com/"
  }
}
```

### 3-3. 종료 케이스 (CLOVA X 소비자판)

```json
{
  "id": "clova-x",
  "name": "CLOVA X",
  "korea": {
    "is_korean_made": true,
    "maker": "네이버",
    "maker_country": "KR",
    "korean_io": "native",
    "korean_notes_ko": "한국어·한국 맥락 강점이었으나 소비자용 챗봇 종료.",
    "krw_billing": false,
    "paid_from_krw": null, "paid_from_usd": null,
    "requires_overseas_card": false,
    "payment_methods": [],
    "available_in_korea": false,
    "commercial_use_kr": "unknown",
    "kr_status": "discontinued",
    "kr_verified": true,
    "kr_last_checked": "2026-06-22",
    "kr_source_url": "https://clova-x.naver.com/"
  }
}
```

---

## 4. 사이트 필터 매핑 (URL 파라미터)

기존 필터 옆에 "한국" 필터 그룹을 추가. 모든 값은 URL에 유지(공유 가능).

| 필터 UI 라벨 | 쿼리 파라미터 | 조건 |
|---|---|---|
| ★ 국산만 | `?kr_made=true` | `korea.is_korean_made === true` |
| 한국어 우수 이상 | `?ko=high` | `korean_io ∈ {native, high}` |
| 원화 결제 | `?krw=true` | `krw_billing === true` |
| 해외카드 불필요 | `?no_overseas_card=true` | `requires_overseas_card === false` |
| 카카오/네이버 로그인 | `?social=kakao` | `signup_methods` 포함 |
| 한국 서비스 중(active) | `?kr_status=active` | 기본값으로 적용 권장 |
| 검증된 항목만 | `?kr_verified=true` | `kr_verified === true` |

> 기본 정렬·노출에서 `discontinued`/`blocked`는 하단으로 내리거나 별도 "종료된 도구" 탭으로.

---

## 5. 카드 / 상세 표시 매핑 (배지)

**도구 카드(목록)** — 배지 우선순위:
1. `★국산` (is_korean_made)
2. `한국어 ◎` (korean_io = native/high)
3. `원화결제` (krw_billing)
4. `해외카드필요` (requires_overseas_card, 경고색)
5. `✔한국검증` (kr_verified)
6. (상태가 active가 아니면) `종료`/`제한`/`차단`

**상세 페이지** — "한국 사용자를 위한 정보" 섹션 신설:
- 한국어 품질: {korean_io 라벨} + `korean_notes_ko`
- 가격: `price_display_ko` + `price_note_ko`
- 결제: `payment_methods` 아이콘 + `requires_overseas_card` 경고 + `payment_note_ko`
- 가입/앱: `signup_methods`, `mobile_app`
- 상업적 이용: `commercial_use_kr` + `commercial_note_ko`
- 하단 각주: "한국 정보 마지막 확인: {kr_last_checked} · 출처 {kr_source_url}"

---

## 6. 기존 477개 마이그레이션 전략

`korea`는 optional이므로 한 번에 다 채울 필요 없음. 우선순위:

1. **1차(즉시): 국산 35~45개** — 전 필드 손으로 정확히 채움. `kr_verified=true`.
2. **2차: 트래픽 상위 글로벌 50개** — 라벨만 입힘(생성 데이터 재활용 아님, 결제·가격은 실제 확인).
3. **3차: 나머지** — 최소 필드만 기본값으로 시드 후, `kr_verified=false`로 표시.

**기본값(미검증 시드)** 규칙:
```
korean_ui: false, korean_io: "medium",
krw_billing: false, requires_overseas_card: true,
available_in_korea: true, commercial_use_kr: "unknown",
kr_status: "active", kr_verified: false, kr_last_checked: 시드일
```
→ `kr_verified=false`인 항목은 상세에서 "한국 정보 미검증" 표기. 사용자에게 정직 + 우리 작업 큐.

---

## 7. 검증 운영 룰 (이게 차별점)

- 신규 등재 또는 정보 변경 시 `kr_last_checked` 갱신 필수.
- 90일 경과한 `kr_verified=true` 항목은 재확인 큐로 자동 분류(쿼리: `kr_last_checked < today-90d`).
- 한국 서비스 종료/차단 발견 시 즉시 `kr_status` 변경 → 목록 신뢰 유지.
- "마지막 확인일"을 카드/상세에 노출 → aixploria·moket이 안 하는 신뢰 신호.

---

## 8. 다음 단계 후보

- [ ] 국산 도구 상세 페이지용 **한국어 리뷰 템플릿** (보일러플레이트 탈피)
- [ ] 위 필터를 반영한 **`/tools?kr_made=true` 전용 랜딩**("한국 AI 도구 모음")
- [ ] `kr_verified=false` 항목 일괄 검증용 **체크리스트 시트**
