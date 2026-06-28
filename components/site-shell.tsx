'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Mail, Menu, Phone, X } from 'lucide-react';
import { business, ctaEvents, navItems, socials } from '@/lib/site-data';
import { Chatbot } from './site-widgets';

function track(event: string) {
  window.dispatchEvent(new CustomEvent('emc:analytics', { detail: { event } }));
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6" aria-label="Main navigation">
          <Link href="/" className="group flex items-center gap-3" aria-label="EMC Marketing home">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--acid)] text-lg font-black text-black shadow-[0_0_30px_rgba(184,255,0,.35)]">
              EMC
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-[.28em] text-white sm:block">Marketing</span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} className={`nav-pill ${active ? 'nav-pill-active' : ''}`}>
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <a
              data-event={ctaEvents.phoneClick}
              onClick={() => track(ctaEvents.phoneClick)}
              href={business.phoneHref}
              className="icon-link"
              aria-label={`Call EMC Marketing at ${business.phone}`}
            >
              <Phone size={18} />
            </a>
            <a
              data-event={ctaEvents.emailClick}
              onClick={() => track(ctaEvents.emailClick)}
              href={`mailto:${business.email}`}
              className="icon-link"
              aria-label={`Email ${business.email}`}
            >
              <Mail size={18} />
            </a>
            <a
              data-event={ctaEvents.bookConsultation}
              onClick={() => track(ctaEvents.bookConsultation)}
              href={business.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-acid"
            >
              Book a chat <ArrowUpRight size={17} />
            </a>
          </div>
          <button className="icon-link lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
        </nav>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[60] bg-black p-6 text-white">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[.28em] text-[var(--acid)]">EMC Marketing</span>
            <button className="icon-link" onClick={() => setOpen(false)} aria-label="Close menu">
              <X />
            </button>
          </div>
          <div className="mt-12 grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="mobile-link">
                {item.label}
              </Link>
            ))}
          </div>
          <a href={business.bookingUrl} target="_blank" rel="noreferrer" className="btn-acid mt-10 w-full justify-center">
            Book a consultation <ArrowUpRight size={18} />
          </a>
        </div>
      ) : null}

      <main id="main" className="pt-20">
        {children}
      </main>
      <Footer />
      <StickyCta />
      <Chatbot />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12 text-white md:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_.8fr_.8fr_.8fr]">
        <div>
          <p className="kicker">Fayetteville, AR marketing agency</p>
          <h2 className="mt-3 max-w-xl text-5xl font-black uppercase leading-[.88] md:text-7xl">
            Leave the kind of mark people notice.
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="icon-link" aria-label={social.label}>
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
        <FooterCol title="Pages" links={navItems} />
        <FooterCol
          title="Contact"
          links={[
            { label: business.email, href: `mailto:${business.email}` },
            { label: business.phone, href: business.phoneHref },
            { label: 'Book consultation', href: business.bookingUrl }
          ]}
        />
        <FooterCol
          title="Extra"
          links={[
            { label: 'EMC Vault', href: business.vaultUrl },
            { label: 'Leave EMC a Google Review', href: business.reviewUrl }
          ]}
        />
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[.2em] text-white/60">
        <span>{'\u00a9'} 2026 EMC Marketing</span>
        <span>Built to be loud, useful, and measurable.</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[.24em] text-[var(--acid)]">{title}</h3>
      <div className="mt-4 grid gap-2">
        {links.map((link) => (
          <a key={`${title}-${link.label}`} href={link.href} className="text-sm text-white/70 transition hover:text-[var(--acid)]">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function StickyCta() {
  return (
    <a
      href={business.bookingUrl}
      target="_blank"
      rel="noreferrer"
      data-event={ctaEvents.bookConsultation}
      onClick={() => track(ctaEvents.bookConsultation)}
      className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--acid)] bg-black/80 px-5 py-3 text-sm font-bold uppercase tracking-[.18em] text-white shadow-[0_0_35px_rgba(184,255,0,.18)] backdrop-blur md:flex"
    >
      Get the marketing diagnosis <ArrowUpRight size={16} />
    </a>
  );
}

import React from 'react';
