# Every AI Finder

## Getting Started

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

Every AI Finder uses its own Supabase project. Configure these public variables
locally and in the production deployment:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Run `supabase/schema.sql` in the project's SQL Editor to create the app profile
table and its row-level security policy. In Supabase Authentication URL settings,
set the Site URL to `https://everyaifinder.com` and add these allowed redirect URLs:

- `https://everyaifinder.com/auth/callback`
- `https://www.everyaifinder.com/auth/callback`
- `http://localhost:3000/auth/callback`

Google sign-in additionally requires enabling and configuring the Google
provider in Supabase. It is shown by default; set
`NEXT_PUBLIC_SUPABASE_GOOGLE_AUTH_ENABLED=false` only when it needs to be
temporarily hidden. Email/password sign-in uses the Email provider.

## Data

The lightweight tool list is generated from the full tool data:

```bash
npm run data
```

`npm run build` runs this step automatically through `prebuild`.

## Verification

Run lint and production build checks before deploying:

```bash
npm run lint
npm run build
```

## Deployment

Production deploys from the connected GitHub repository and Cloudflare Pages setup.
