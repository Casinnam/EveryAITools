'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  '162435560601-jft3n9qeba8pm1jtvcgqdpfd10r4rlfe.apps.googleusercontent.com';

interface GoogleCredentialResponse {
  credential?: string;
}

interface GoogleAccountsId {
  initialize: (options: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    cancel_on_tap_outside?: boolean;
    context?: 'signin' | 'signup' | 'use';
    use_fedcm_for_prompt?: boolean;
  }) => void;
  prompt: () => void;
  cancel: () => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleAccountsId;
      };
    };
  }
}

/**
 * Shows Google's browser-managed account chooser to signed-out visitors.
 * The returned Google ID token is exchanged for this app's Supabase session.
 */
export function GoogleOneTap() {
  const { configured, ready, user, signInWithGoogleIdToken } = useAuth();
  const [scriptReady, setScriptReady] = useState(false);
  const initialized = useRef(false);
  const googleAuthEnabled = process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_AUTH_ENABLED !== 'false';

  const handleCredential = useCallback(
    (response: GoogleCredentialResponse) => {
      if (!response.credential) return;
      void signInWithGoogleIdToken(response.credential).catch((error) => {
        console.warn('Google One Tap sign-in failed:', error);
      });
    },
    [signInWithGoogleIdToken],
  );

  useEffect(() => {
    const googleId = window.google?.accounts.id;

    if (!scriptReady || !googleId || !configured || !ready || user || !googleAuthEnabled) {
      if (user) googleId?.cancel();
      return;
    }

    if (!initialized.current) {
      googleId.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredential,
        context: 'signin',
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: true,
      });
      initialized.current = true;
    }

    googleId.prompt();
  }, [configured, googleAuthEnabled, handleCredential, ready, scriptReady, user]);

  if (!configured || !googleAuthEnabled || user) return null;

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onReady={() => setScriptReady(true)}
    />
  );
}
