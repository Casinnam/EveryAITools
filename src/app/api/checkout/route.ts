import { NextResponse } from 'next/server';

export const runtime = 'edge';

type PaidPlan = 'Featured' | 'Premium';

const paidPlans: Record<PaidPlan, { priceId: string; mode: 'payment' | 'subscription' }> = {
  Featured: {
    priceId: 'price_1TuktYPIweOlFZ9PYzYWrr5X',
    mode: 'payment',
  },
  Premium: {
    priceId: 'price_1TukuCPIweOlFZ9PqJ3PPoV3',
    mode: 'subscription',
  },
};

function isPaidPlan(value: unknown): value is PaidPlan {
  return value === 'Featured' || value === 'Premium';
}

function metadataValue(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 500) : '';
}

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to the server environment.' },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isPaidPlan(body.plan)) {
    return NextResponse.json({ error: 'Invalid paid listing plan.' }, { status: 400 });
  }

  const email = metadataValue(body.email);
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
  }

  const plan = paidPlans[body.plan];
  const returnUrl = new URL('/submit', request.url);
  const successUrl = new URL('/submit/success', request.url);
  successUrl.searchParams.set('session_id', '{CHECKOUT_SESSION_ID}');
  const cancelUrl = new URL(returnUrl);

  const params = new URLSearchParams({
    mode: plan.mode,
    'line_items[0][price]': plan.priceId,
    'line_items[0][quantity]': '1',
    customer_email: email,
    success_url: successUrl.toString(),
    cancel_url: cancelUrl.toString(),
    'metadata[listing_plan]': body.plan,
    'metadata[tool_name]': metadataValue(body.toolName),
    'metadata[website_url]': metadataValue(body.websiteUrl),
  });

  const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
    cache: 'no-store',
  });

  const session = (await stripeResponse.json()) as {
    url?: string;
    error?: { message?: string };
  };

  if (!stripeResponse.ok || !session.url) {
    return NextResponse.json(
      { error: session.error?.message || 'Unable to start Stripe Checkout.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: session.url });
}
