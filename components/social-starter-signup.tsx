'use client';

import Script from 'next/script';
import { useRef, useState } from 'react';

type EmbedApi = {
  createWidget: (formId: string, options: {
    container: HTMLElement;
    width: string;
    transparent: boolean;
    title: string;
    onLoad: () => void;
    onError: () => void;
    onSubmit: () => void;
  }) => unknown;
};

export function SocialStarterSignup() {
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  function mountForm() {
    const embedWindow = window as Window & { CRMEmbed?: EmbedApi; VotelEmbed?: EmbedApi };
    const embed = embedWindow.CRMEmbed || embedWindow.VotelEmbed;
    if (!embed || !container.current || container.current.querySelector('iframe')) return;
    // Votel handles the frame's content height; leave it unconstrained so every field is displayed.
    embed.createWidget('social_starter', {
      container: container.current,
      width: '100%',
      transparent: true,
      title: 'Social Starter Signup',
      onLoad: () => setStatus('ready'),
      onError: () => setStatus('error'),
      onSubmit: () => window.dispatchEvent(new CustomEvent('emc:analytics', {
        detail: { event: 'social_starter_submitted', source: 'inline' }
      }))
    });
  }

  return (
    <>
      <Script id="votel-form-embed" src="https://app.votel.ai/form-embed/v1.js" strategy="afterInteractive" onReady={mountForm} onError={() => setStatus('error')} />
      {status !== 'ready' ? (
        <p role="status" className="px-5 py-4 text-sm text-white/70">
          {status === 'error' ? 'Having trouble loading the form? Use the signup link below.' : 'Loading your Social Starter signup…'}
        </p>
      ) : null}
      <div ref={container} id="social-starter-form" />
      <p className="px-5 py-4 text-center text-sm text-white/60">
        Prefer a separate page?{' '}
        <a href="https://app.votel.ai/f/social_starter" className="text-[var(--acid)] underline underline-offset-4">
          Open the signup form
        </a>
      </p>
    </>
  );
}
