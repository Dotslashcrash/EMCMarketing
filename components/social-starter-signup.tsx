'use client';

import Script from 'next/script';
import { ArrowRight } from 'lucide-react';
import type { MouseEvent } from 'react';

const formUrl = 'https://app.votel.ai/f/social_starter';

type EmbedApi = {
  createPopup: (formId: string, options: { trigger: 'button' }) => { open: () => void };
};

let popup: ReturnType<EmbedApi['createPopup']> | undefined;

export function SocialStarterSignup({ className = 'btn-acid' }: { className?: string }) {
  function openSignup(event: MouseEvent<HTMLAnchorElement>) {
    // Preserve the hosted form as a fallback if the embed script is unavailable.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const embedWindow = window as Window & { CRMEmbed?: EmbedApi; VotelEmbed?: EmbedApi };
    const embed = embedWindow.CRMEmbed || embedWindow.VotelEmbed;
    if (!embed) return;

    event.preventDefault();
    popup ??= embed.createPopup('social_starter', { trigger: 'button' });
    popup.open();

    const frame = document.querySelector<HTMLIFrameElement>('iframe[src^="https://app.votel.ai/f/social_starter?"]');
    const modal = frame?.parentElement;
    const overlay = modal?.parentElement;
    if (!modal || !overlay || overlay.dataset.emcSignup) return;
    overlay.dataset.emcSignup = 'true';

    // Only adjust the host container; the cross-origin form keeps Votel's styling.
    modal.style.overflowY = 'auto';
    modal.style.maxHeight = '90dvh';
    modal.style.background = '#050505';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Social Starter Signup');
    frame.title = 'Social Starter Signup';
    const closeButton = modal.querySelector('button');
    closeButton?.setAttribute('aria-label', 'Close Social Starter Signup');
    if (closeButton) {
      closeButton.style.position = 'sticky';
      closeButton.style.top = '0';
      closeButton.style.display = 'block';
      closeButton.style.marginLeft = 'auto';
      closeButton.style.minWidth = '44px';
      closeButton.style.minHeight = '44px';
      closeButton.style.background = '#050505';
      closeButton.style.color = '#fff';
    }

    const trigger = event.currentTarget;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== overlay)
      .map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    closeButton?.focus();

    const observer = new MutationObserver(() => {
      if (overlay.isConnected) return;
      observer.disconnect();
      document.body.style.overflow = previousOverflow;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      if (trigger.isConnected) trigger.focus();
    });
    observer.observe(document.body, { childList: true });
    window.dispatchEvent(new CustomEvent('emc:analytics', { detail: { event: 'cta_social_starter_signup' } }));
  }

  return (
    <>
      <Script id="votel-form-embed" src="https://app.votel.ai/form-embed/v1.js" strategy="afterInteractive" />
      <a href={formUrl} className={className} onClick={openSignup} aria-haspopup="dialog" data-event="cta_social_starter_signup">
        Social Starter Signup <ArrowRight size={18} />
      </a>
    </>
  );
}
