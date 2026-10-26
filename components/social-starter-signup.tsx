'use client';

import Script from 'next/script';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';

const formUrl = 'https://app.votel.ai/f/social_starter';
const sessionKey = 'emc-social-starter-shown';

type EmbedApi = {
  createPopup: (formId: string, options: { trigger: 'button' }) => { open: () => void };
};

let popup: ReturnType<EmbedApi['createPopup']> | undefined;
let shownThisVisit = false;

function hasShownSignup() {
  try {
    return shownThisVisit || sessionStorage.getItem(sessionKey) === 'true';
  } catch {
    return shownThisVisit;
  }
}

export function SocialStarterSignup({ className = 'btn-acid' }: { className?: string }) {
  const signupLink = useRef<HTMLAnchorElement>(null);
  const [embedReady, setEmbedReady] = useState(false);

  useEffect(() => {
    if (!embedReady || hasShownSignup()) return;
    const timer = window.setTimeout(() => {
      if (!hasShownSignup()) showSignup(signupLink.current, 'automatic');
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [embedReady]);

  function showSignup(trigger: HTMLElement | null, source: 'automatic' | 'button') {
    const embedWindow = window as Window & { CRMEmbed?: EmbedApi; VotelEmbed?: EmbedApi };
    const embed = embedWindow.CRMEmbed || embedWindow.VotelEmbed;
    if (!embed) return false;

    popup ??= embed.createPopup('social_starter', { trigger: 'button' });
    popup.open();

    const frame = document.querySelector<HTMLIFrameElement>('iframe[src^="https://app.votel.ai/f/social_starter?"]');
    const modal = frame?.parentElement;
    const overlay = modal?.parentElement;
    if (!modal || !overlay) return false;
    shownThisVisit = true;
    try {
      sessionStorage.setItem(sessionKey, 'true');
    } catch {
      // The in-memory flag still prevents repeated prompts when storage is blocked.
    }
    if (overlay.dataset.emcSignup) return true;
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
      if (trigger?.isConnected) trigger.focus();
    });
    observer.observe(document.body, { childList: true });
    window.dispatchEvent(new CustomEvent('emc:analytics', { detail: { event: 'cta_social_starter_signup', source } }));
    return true;
  }

  function openSignup(event: MouseEvent<HTMLAnchorElement>) {
    // Preserve the hosted form as a fallback if the embed script is unavailable.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (showSignup(event.currentTarget, 'button')) event.preventDefault();
  }

  return (
    <>
      <Script id="votel-form-embed" src="https://app.votel.ai/form-embed/v1.js" strategy="afterInteractive" onReady={() => setEmbedReady(true)} />
      <a ref={signupLink} href={formUrl} className={className} onClick={openSignup} aria-haspopup="dialog" data-event="cta_social_starter_signup">
        Social Starter Signup <ArrowRight size={18} />
      </a>
    </>
  );
}
