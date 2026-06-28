'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Bot, Check, ChevronLeft, ChevronRight, Download, MessageCircle, Play, Send, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { business, ctaEvents, reviews, videoCategories, videos } from '@/lib/site-data';

function track(event: string, detail?: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent('emc:analytics', { detail: { event, ...detail } }));
}

function pickMixedVideos(count = 3) {
  const longVideos = videos.filter((video) => video.category === 'Videos');
  const shorts = videos.filter((video) => video.category === 'Shorts');
  const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
  const required = [shuffle(longVideos)[0], shuffle(shorts)[0]].filter(Boolean);
  const used = new Set(required.map((video) => video.videoId));
  const rest = shuffle(videos).filter((video) => !used.has(video.videoId));
  return [...required, ...rest].slice(0, count);
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="fixed left-0 top-0 z-[80] h-1 origin-left bg-[var(--acid)]" style={{ scaleX, width: '100%' }} />;
}

export function DynamicVideoPreview() {
  const [previewVideos, setPreviewVideos] = useState(() => videos.slice(0, 3));

  useEffect(() => {
    setPreviewVideos(pickMixedVideos());
    const interval = window.setInterval(() => setPreviewVideos(pickMixedVideos()), 9000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {previewVideos.map((video) => (
          <motion.a
            key={video.videoId}
            href={video.watchUrl}
            target="_blank"
            rel="noreferrer"
            className="video-tile group"
            data-event="cta_home_video_preview"
            title={`Watch ${video.title} on YouTube`}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            <img
              src={video.thumbnail}
              alt={`${video.title} YouTube thumbnail`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <span>{video.category}</span>
          </motion.a>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function MarketingQuiz() {
  const questions = [
    { q: 'Your clearest offer is...', a: ['Obvious in 5 seconds', 'Somewhere on the site', 'Mostly in my head'] },
    { q: 'Your content usually gets...', a: ['Replies and saves', 'Likes from familiar people', 'Polite silence'] },
    { q: 'Your website CTA feels...', a: ['Direct and useful', 'Fine, probably', 'A little apologetic'] },
    { q: 'Your reviews/social proof are...', a: ['Current and visible', 'Scattered around', 'Not pulling weight'] }
  ];
  const [answers, setAnswers] = useState<number[]>([]);
  const score = answers.reduce((sum, value) => sum + (2 - value), 0);
  const finished = answers.length === questions.length;
  const result =
    score >= 6
      ? 'Your foundation has traction. EMC would sharpen the campaign path and make the attention easier to convert.'
      : score >= 3
        ? 'There is useful material here, but the signal is probably split. EMC would tighten the offer, creative, and CTA.'
        : 'Your marketing may be asking people to work too hard. EMC would start with message clarity and a cleaner conversion path.';

  return (
    <section className="section-dark" aria-labelledby="quiz-title">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="kicker">Interactive diagnostic</p>
          <h2 id="quiz-title" className="headline mt-3">
            What is killing your marketing?
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/70">
            Four quick questions. No shame spiral. Just a cleaner read on what needs attention first.
          </p>
        </div>
        <div className="rounded-sm border border-white/15 bg-white/[.04] p-5 shadow-2xl md:p-7">
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-[var(--acid)] transition-all" style={{ width: `${(answers.length / questions.length) * 100}%` }} />
          </div>
          {!finished ? (
            <div>
              <p className="text-sm uppercase tracking-[.2em] text-[var(--acid)]">
                Question {answers.length + 1} of {questions.length}
              </p>
              <h3 className="mt-3 text-2xl font-black">{questions[answers.length].q}</h3>
              <div className="mt-6 grid gap-3">
                {questions[answers.length].a.map((answer, index) => (
                  <button
                    key={answer}
                    className="quiz-option"
                    onClick={() => setAnswers((current) => [...current, index])}
                    data-event="quiz_answer_select"
                  >
                    {answer} <ArrowRight size={17} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="kicker">Your readout</p>
              <h3 className="mt-3 text-3xl font-black text-[var(--acid)]">Score: {score}/8</h3>
              <p className="mt-4 text-lg text-white/78">{result}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={business.bookingUrl} target="_blank" rel="noreferrer" className="btn-acid" data-event={ctaEvents.bookConsultation}>
                  Talk through it <ArrowRight size={17} />
                </a>
                <button className="btn-ghost" onClick={() => setAnswers([])}>
                  Run it again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const active = reviews[index];
  return (
    <div className="rounded-sm border border-white/15 bg-black p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="kicker">Google reviews</p>
        <div className="flex gap-2">
          <button className="icon-link" onClick={() => setIndex((index - 1 + reviews.length) % reviews.length)} aria-label="Previous review">
            <ChevronLeft size={18} />
          </button>
          <button className="icon-link" onClick={() => setIndex((index + 1) % reviews.length)} aria-label="Next review">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="mt-8 min-h-56">
        <p className="text-2xl tracking-[.12em] text-[var(--acid)]">{'\u2605'.repeat(active.rating)}</p>
        <blockquote className="mt-5 text-2xl font-black leading-tight md:text-4xl">"{active.body}"</blockquote>
        <p className="mt-5 text-sm uppercase tracking-[.18em] text-white/50">{active.author}</p>
        <p className="mt-2 text-xs uppercase tracking-[.16em] text-white/35">
          Google review {'\u00b7'} {active.relativeTime}
        </p>
      </div>
      <a href={business.reviewUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-5 inline-flex" data-event={ctaEvents.reviewClick}>
        Leave EMC a Google Review <ArrowRight size={17} />
      </a>
    </div>
  );
}

export function VideoGallery() {
  const [filter, setFilter] = useState('Videos');
  const [active, setActive] = useState<(typeof videos)[number] | null>(null);
  const filtered = videos.filter((video) => video.category === filter);
  const isShorts = filter === 'Shorts';
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {videoCategories.map((category) => (
          <button key={category} onClick={() => setFilter(category)} className={`filter-pill ${filter === category ? 'filter-pill-active' : ''}`}>
            {category}
          </button>
        ))}
      </div>
      <div className={`mt-8 grid gap-5 ${isShorts ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-2'}`}>
        {filtered.map((video) => (
          <button
            key={video.videoId}
            className={`video-card group text-left ${video.category === 'Shorts' ? 'mx-auto w-full max-w-[19rem] sm:max-w-[21rem]' : ''}`}
            onClick={() => setActive(video)}
          >
            <span className={`grid place-items-center overflow-hidden rounded-sm bg-white/10 ${video.category === 'Shorts' ? 'aspect-[9/12]' : 'aspect-video'}`}>
              <img
                src={video.thumbnail}
                alt={`${video.title} thumbnail from EMC Social Club on YouTube`}
                loading="lazy"
                className="h-full w-full object-cover opacity-75 transition group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="absolute grid h-14 w-14 place-items-center rounded-full bg-[var(--acid)] text-black">
                <Play fill="currentColor" />
              </span>
            </span>
            <span className="mt-4 block text-xl font-black">{video.title}</span>
            <span className="mt-1 block text-sm uppercase tracking-[.18em] text-[var(--acid)]">{video.category}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active ? (
          <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-black/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="w-full max-w-4xl">
              <button className="icon-link ml-auto mb-3" onClick={() => setActive(null)} aria-label="Close video">
                <X />
              </button>
              <div className={active.category === 'Shorts' ? 'mx-auto max-w-sm' : ''}>
                <iframe
                  src={`${active.embedUrl}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className={`w-full rounded-sm border border-white/15 bg-black ${active.category === 'Shorts' ? 'aspect-[9/16]' : 'aspect-video'}`}
                />
              </div>
              <h3 className="mt-4 text-2xl font-black text-white">{active.title}</h3>
              <p className="mt-2 text-white/60">{active.description}</p>
              <a href={active.watchUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-5 inline-flex">
                Open on YouTube <ArrowRight size={17} />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '');
    const phone = String(form.get('phone') || '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Use a real email so Elizabeth can reply.');
      return;
    }
    if (phone && phone.replace(/\D/g, '').length < 10) {
      setError('Phone number looks short. Add the area code.');
      return;
    }
    const payload = Object.fromEntries(form.entries());
    const leads = JSON.parse(localStorage.getItem('emc-contact-leads') || '[]');
    localStorage.setItem('emc-contact-leads', JSON.stringify([...leads, { ...payload, createdAt: new Date().toISOString() }]));
    // TODO: Send payload to Google Sheets lead capture.
    // TODO: Send Gmail notification to EMC Marketing.
    // TODO: Create Google Calendar booking handoff.
    // TODO: Send Google Chat / Workspace alert.
    track(ctaEvents.contactSubmit, { source: 'contact_form' });
    setError('');
    setSent(true);
    event.currentTarget.reset();
  }
  return (
    <form className="grid gap-4 rounded-sm border border-white/15 bg-white/[.04] p-5 md:p-7" onSubmit={submit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Business need" name="need" required />
      </div>
      <label className="grid gap-2">
        <span className="form-label">What is going on?</span>
        <textarea name="message" rows={5} required className="form-input resize-y" />
      </label>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      {sent ? <p className="text-sm text-[var(--acid)]">Got it. EMC has the signal.</p> : null}
      <button className="btn-acid justify-center" type="submit">
        Send the signal <Send size={17} />
      </button>
    </form>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className="grid gap-2">
      <span className="form-label">{label}</span>
      <input className="form-input" {...props} />
    </label>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const messages = JSON.parse(localStorage.getItem('emc-chat-leads') || '[]');
    localStorage.setItem('emc-chat-leads', JSON.stringify([...messages, { ...payload, createdAt: new Date().toISOString() }]));
    // TODO: Google Sheets lead capture.
    // TODO: Gmail notification.
    // TODO: Google Calendar booking.
    // TODO: Google Chat / Workspace alert.
    track(ctaEvents.chatSubmit, { source: 'floating_chat' });
    setSubmitted(true);
  }
  return (
    <>
      <button
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[var(--acid)] text-black shadow-[0_0_35px_rgba(184,255,0,.35)]"
        onClick={() => {
          setOpen(true);
          track(ctaEvents.chatOpen);
        }}
        aria-label="Open EMC assistant"
      >
        <MessageCircle />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-sm border border-[var(--acid)] bg-black text-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--acid)] text-black">
                  <Bot />
                </span>
                <div>
                  <p className="font-black">EMC Assistant</p>
                  <p className="text-xs text-white/55">Start here</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <X />
              </button>
            </div>
            <div className="p-4">
              <p className="rounded-sm bg-white/10 p-3 text-sm text-white/80">
                Tell me what is bugging your marketing. Quick version is perfect.
              </p>
              {submitted ? (
                <div className="mt-4 rounded-sm border border-[var(--acid)] p-4">
                  <Check className="text-[var(--acid)]" />
                  <p className="mt-3 font-bold">Captured locally.</p>
                  <p className="mt-1 text-sm text-white/60">Next hook: Sheets, Gmail, Calendar, and Google Chat.</p>
                </div>
              ) : (
                <form className="mt-4 grid gap-3" onSubmit={submit}>
                  <input className="form-input" name="name" placeholder="Name" required />
                  <input className="form-input" name="email" type="email" placeholder="Email" required />
                  <input className="form-input" name="phone" type="tel" placeholder="Phone" />
                  <textarea className="form-input resize-y" name="need" rows={3} placeholder="Business need" required />
                  <button className="btn-acid justify-center" type="submit">
                    Send <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function ExitIntentCapture() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const seen = sessionStorage.getItem('emc-exit-intent');
    const onMouseLeave = (event: MouseEvent) => {
      if (!seen && event.clientY <= 0) {
        sessionStorage.setItem('emc-exit-intent', 'true');
        setShow(true);
      }
    };
    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, []);
  return (
    <AnimatePresence>
      {show ? (
        <motion.div className="fixed inset-0 z-[85] grid place-items-center bg-black/80 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="max-w-lg rounded-sm border border-[var(--acid)] bg-black p-6 text-white">
            <button className="icon-link ml-auto" onClick={() => setShow(false)} aria-label="Close popup">
              <X />
            </button>
            <p className="kicker">Before you disappear</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none">Want the marketing scorecard?</h2>
            <p className="mt-4 text-white/70">A quick checklist for offer clarity, content signal, search readiness, and conversion leaks.</p>
            <a href={business.bookingUrl} target="_blank" rel="noreferrer" className="btn-acid mt-6" data-event={ctaEvents.leadMagnet}>
              Get the scorecard <Download size={17} />
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function MotionIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55 }} className={className}>
      {children}
    </motion.div>
  );
}

export function HeroEnergy() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--acid)]/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute right-[-10%] top-[20%] h-72 w-72 rounded-full bg-[var(--acid)]/20 blur-3xl"
        animate={{ x: [0, -40, 10, 0], y: [0, 20, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <div className="noise" />
    </div>
  );
}

export function useVideoCount() {
  return useMemo(() => videos.length, []);
}
