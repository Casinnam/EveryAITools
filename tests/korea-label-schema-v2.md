# KoreaProfile v2 — 정리된 스키마 (구현 대기)

> v1 설계 문서(`korea-label-schema.md`)를 **코드베이스에 맞게 정리**한 버전.
> 변경 원칙: (1) camelCase 통일, (2) MVP/optional 분리, (3) 기존 Tool 필드 중복 제거,
> (4) 이미 배포된 `KoreaProfile`(19개 적용)을 비파괴로 확장 + 마이그레이션.

---

## 1. 핵심 결정 요약

| 영역 | v1 제안 | v2 결정 | 이유 |
|---|---|---|---|
| 네이밍 | snake_case (`is_korean_made`) | **camelCase** (`domestic`) | 코드베이스 전체가 camelCase |
| 기존 KoreaProfile | 별도 신규 | **흡수·확장** | 평행 스키마 방지, 19개 재활용 |
| `korean_ui` | 신규 boolean | **제거** → 기존 `Tool.koreanSupport` 재활용 | 중복 |
| `commercial_use_kr` | 신규 enum | **제거** → 기존 `Tool.commercialUse` + `commercialNotes` | 중복 |
| `mobile_app` | 신규 object | **제거** → 기존 `Tool.mobileSupport` | 중복 |
| `paid_from_usd`/`billing_cycle` | 신규 | **제거** → 기존 `Tool.pricingType` + `startingPrice` | 중복 |
| `korean_support_channel` | 신규 enum | **제거(보류)** | 저ROI·빠른 노후화 |
| `kr_verified` | 신규 boolean | **제거** | 프로필 존재 = 검증됨(수기 추가만 함). 자동 시드 안 함 |
| `kr_checked_by` | 신규 | **제거** | 내부용·비표시. git 히스토리로 충분 |
| `korean_io` (5단계) | 채택 | **채택** → `koreanQuality` 5단계로 확장 | 3→5단계 세분화는 개선 |

---

## 2. v2 타입 (구현안)

```ts
export type KoreanQuality = 'native' | 'high' | 'medium' | 'low' | 'none';
export type KoreaStatus = 'live' | 'limited' | 'beta' | 'discontinued' | 'blocked';
export type PaymentMethod =
  | 'domestic_card' | 'overseas_card' | 'kakao_pay' | 'naver_pay'
  | 'toss' | 'phone_billing' | 'app_store' | 'play_store'
  | 'paypal' | 'bank_transfer' | 'free';

export interface KoreaProfile {
  // ── MVP 필수(배지·필터 구동) ─────────────────────────────
  domestic: boolean;            // 국산 (v1 is_korean_made)
  koreanQuality: KoreanQuality; // 한국어 입출력 품질 (v1 korean_io, 3→5단계)
  status: KoreaStatus;          // 한국 서비스 상태 (v1 kr_status)
  verifiedOn: string;           // 마지막 확인일 ISO (v1 kr_last_checked)

  // ── Optional 확장 ───────────────────────────────────────
  foreignCardNeeded?: boolean;  // 해외카드 필요 (v1 requires_overseas_card)
  krwBilling?: boolean;         // 실제 원화 청구 (자동환산 아님)
  pricingKRW?: string;          // 원화 표시 문자열 (v1 price_display_ko)
  maker?: string;               // 제작사 (예: "뤼튼테크놀로지스")
  makerCountry?: string;        // ISO 국가코드 ("KR"/"US")
  paymentMethods?: PaymentMethod[];
  signupMethods?: ('kakao'|'naver'|'google'|'apple'|'email'|'phone')[];
  bestForKo?: string[];         // 한국 관점 추천 용도
  koreanNote?: MultilingualString; // 한국 사용자 메모 (v1 korean_notes_ko)
  sourceUrl?: string;           // 확인 출처 URL (v1 kr_source_url, 상세 각주)
}
```

> `Tool.korea?: KoreaProfile` 는 v1과 동일(이미 배포됨). 비파괴 확장.

**필드 4개만 필수**라 새 도구도 빠르게 채울 수 있고, 나머지는 알면 채우는 구조.

---

## 3. 기존 19개 프로필 마이그레이션 (자동 규칙)

현재 `koreaProfiles.ts`의 값 → v2 매핑:

- `koreanQuality`: `'good'` → **`'high'`**, `'limited'` → **`'medium'`** (`'native'` 유지)
- `status`: `'b2b-only'` → **`'limited'`** (`'live'`/`'discontinued'` 유지)
- `domestic`/`verifiedOn`/`foreignCardNeeded`/`pricingKRW`/`koreanNote`: **그대로** (이름·의미 동일)
- 신규 optional(`maker`/`krwBilling`/`sourceUrl` 등): 알면 추가, 없으면 비움

→ 즉 **타입 값만 일부 리맵 + optional 추가**. 데이터 손실 없음, 19개 수동 검토 불필요(스크립트/일괄 치환 가능).

---

## 4. 필터 (MVP 3개 먼저)

기존 `?korean=true`(koreanSupport) 옆에 추가:

| UI 라벨 | 쿼리 | 조건 |
|---|---|---|
| ★ 국산만 | `?domestic=true` | `korea.domestic === true` |
| 해외카드 불필요 | `?noForeignCard=true` | `korea && korea.foreignCardNeeded !== true` |
| 한국어 우수↑ | `?koQuality=high` | `korea.koreanQuality ∈ {native, high}` |

> 나머지 필터(원화결제·소셜로그인·상태)는 데이터가 쌓인 뒤 2차로. `discontinued`/`blocked`는 기본 정렬 하단.

`src/lib/toolFilters.ts`에 위 3개만 추가(parse/serialize/filter).

---

## 5. UI 표시 (기존 컴포넌트 확장)

**ToolCard 배지** (이미 `국산`·`서비스 종료` 있음 → 추가):
- `해외카드 필요`(경고색) — `foreignCardNeeded === true`
- `한국어 ◎` — `koreanQuality ∈ {native, high}` (선택)

**상세 "한국 사용자 정보" 패널** (이미 있음 → 행 추가):
- 한국어 품질(5단계 라벨) · 원화 결제 여부 · 결제수단 · 제작사 · `bestForKo`
- 하단 각주: "한국 정보 마지막 확인: {verifiedOn} · 출처 {sourceUrl}"

---

## 6. 검증 운영 룰 (v1 §7 그대로 채택 — 이게 차별점)

- 등재·변경 시 `verifiedOn` 갱신 필수.
- 90일 경과 항목은 재확인 대상(쿼리: `verifiedOn < today-90d`).
- 종료/차단 발견 즉시 `status` 변경.
- "마지막 확인일"을 카드·상세에 노출.

---

## 7. 구현 순서 (OK 시)

1. 타입 v2 반영 + 19개 프로필 값 리맵 (빌드 green 확인)
2. UI: ToolCard 배지(해외카드) + 상세 패널 행 확장 + 번역
3. 필터 3개(`domestic`/`noForeignCard`/`koQuality`) — toolFilters.ts + /tools UI
4. **글로벌 도구 한국 라벨 배치**: 트래픽 상위 글로벌 ~30개에 v2 프로필(결제·원화·품질 실제 확인)
5. `/korean` 글로벌 섹션이 자동으로 풍성해짐

> 카테고리별 랭킹 페이지는 이 스키마와 독립 → 병행 가능.
