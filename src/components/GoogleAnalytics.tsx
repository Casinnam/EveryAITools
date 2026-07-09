import Script from 'next/script';

/**
 * GA4 measurement ID. Baked in so analytics keep working when the host injects
 * NEXT_PUBLIC_* only at runtime; override per-environment if needed.
 */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-56B6LRTM3J';

/**
 * Loads the Google tag (gtag.js) once from the root layout, so every route gets
 * it. GA4 enhanced measurement tracks App Router client-side navigations via
 * history events, so no manual page_view call is needed on route change.
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}

export default GoogleAnalytics;
