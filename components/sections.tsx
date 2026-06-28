import Link from 'next/link';
import { ArrowRight, BadgeCheck, Flame, Mail, MapPin, Phone, Sparkles, Target, Zap } from 'lucide-react';
import { business, faqs, painPoints, processSteps, services, videos } from '@/lib/site-data';
import { ContactForm, ExitIntentCapture, HeroEnergy, MarketingQuiz, MotionIn, ReviewCarousel, ScrollProgress, VideoGallery } from './site-widgets';

export function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <ServicesPreview />
      <WhyEmc />
      <MarketingQuiz />
      <ProcessSection />
      <ReviewsSection />
      <VideoPreview />
      <LeadMagnet />
      <FaqSection />
      <ConsultationCta />
      <ExitIntentCapture />
    </>
  );
}

export function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-black px-4 py-16 text-white md:px-6 md:py-24">
      <HeroEnergy />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
        <div>
          <MotionIn>
            <p className="kicker">EMC Marketing · Fayetteville, Arkansas</p>
            <h1 className="hero-title mt-5 max-w-5xl font-black uppercase leading-[.78]">
              Make them stop scrolling.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-white/75">
              Strategy, social, paid ads, content, websites, SEO, and AEO for brands that are tired of looking polite online.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={business.bookingUrl} target="_blank" rel="noreferrer" className="btn-acid" data-event="cta_hero_book">
                Book a consultation <ArrowRight size={18} />
              </a>
              <Link href="/services/" className="btn-ghost">
                See services
              </Link>
            </div>
            <p className="mt-3 text-sm text-white/50">No fake urgency. Just a sharper first conversation.</p>
          </MotionIn>
        </div>
        <MotionIn className="relative">
          <div className="tilt-panel">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="kicker text-black/60">Live diagnosis</p>
                <h2 className="mt-3 text-5xl font-black uppercase leading-[.86] text-black">Attention leaks here.</h2>
              </div>
              <Sparkles className="text-black" size={36} />
            </div>
            <div className="mt-8 grid gap-3">
              {painPoints.map((point) => (
                <div key={point} className="flex gap-3 border-t border-black/20 pt-3 text-sm font-semibold text-black">
                  <span>+</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -left-5 hidden rotate-[-6deg] border-2 border-white bg-black px-5 py-3 text-sm font-black uppercase tracking-[.2em] text-[var(--acid)] md:block">
            Human-made energy
          </div>
        </MotionIn>
      </div>
    </section>
  );
}

export function ServicesPreview() {
  return (
    <section className="section-bone" aria-labelledby="services-preview">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="kicker text-black/55">Capabilities</p>
            <h2 id="services-preview" className="headline mt-3 text-black">
              Useful work, not content confetti.
            </h2>
          </div>
          <Link href="/services/" className="btn-dark">
            Full service menu <ArrowRight size={17} />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <MotionIn key={service.slug} className="group service-card">
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-black text-black/35">0{index + 1}</span>
                <Zap className="text-[var(--acid-dark)] transition group-hover:rotate-12" />
              </div>
              <h3 className="mt-8 text-3xl font-black uppercase leading-none">{service.title}</h3>
              <p className="mt-4 text-black/70">{service.hook}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.includes.slice(0, 3).map((item) => (
                  <span key={item} className="rounded-full border border-black/15 px-3 py-1 text-xs font-bold uppercase tracking-[.14em] text-black/60">
                    {item}
                  </span>
                ))}
              </div>
            </MotionIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyEmc() {
  return (
    <section className="section-dark" aria-labelledby="why-emc">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[.85fr_1.15fr]">
        <MotionIn>
          <p className="kicker">Why EMC</p>
          <h2 id="why-emc" className="headline mt-3">
            Sharp enough to convert. Weird enough to remember.
          </h2>
        </MotionIn>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['Clear strategy first', 'Pretty work is not the plan. It is what happens after the plan knows where it is going.'],
            ['Local search awareness', 'Fayetteville and Northwest Arkansas businesses need to show up where people are already looking.'],
            ['Human copy', 'No bland “growth partner” fog. The words should sound like somebody with a pulse wrote them.'],
            ['Built for action', 'Every page, post, ad, and CTA needs a next step people understand.']
          ].map(([title, body]) => (
            <MotionIn key={title} className="proof-card">
              <BadgeCheck className="text-[var(--acid)]" />
              <h3 className="mt-5 text-2xl font-black">{title}</h3>
              <p className="mt-3 text-white/65">{body}</p>
            </MotionIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section-bone" aria-labelledby="process">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="kicker text-black/55">Process</p>
        <h2 id="process" className="headline mt-3 text-black">
          From “something feels off” to something people act on.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <MotionIn key={step.title} className="border-l-2 border-black p-5">
              <p className="text-sm font-black text-[var(--acid-dark)]">0{index + 1}</p>
              <h3 className="mt-6 text-3xl font-black uppercase">{step.title}</h3>
              <p className="mt-3 text-black/65">{step.body}</p>
            </MotionIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section className="section-dark" aria-labelledby="reviews">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="kicker">Social proof</p>
          <h2 id="reviews" className="headline mt-3">
            Reviews belong to the people who wrote them.
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Google review text is intentionally placeholder-only until verified copy can be pulled or provided. The structure is ready without making fake claims.
          </p>
          <a href={business.reviewUrl} target="_blank" rel="noreferrer" className="btn-acid mt-7 inline-flex" data-event="cta_google_review">
            Leave EMC a Google Review <ArrowRight size={17} />
          </a>
        </div>
        <ReviewCarousel />
      </div>
    </section>
  );
}

export function VideoPreview() {
  return (
    <section className="section-bone" aria-labelledby="video-preview">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <p className="kicker text-black/55">Content lab</p>
          <h2 id="video-preview" className="headline mt-3 text-black">
            Content should feel like proof.
          </h2>
          <p className="mt-5 text-lg text-black/70">
            The gallery pulls from EMC Social Club on YouTube and keeps long-form videos separate from Shorts, because those formats ask for different attention.
          </p>
          <Link href="/videos/" className="btn-dark mt-7 inline-flex">
            Watch the gallery <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {videos.slice(0, 3).map((video) => (
            <div key={video.videoId} className="video-tile">
              <img src={video.thumbnail} alt={`${video.title} YouTube thumbnail`} loading="lazy" className="h-full w-full object-cover" />
              <span>{video.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LeadMagnet() {
  return (
    <section className="bg-[var(--acid)] px-4 py-14 text-black md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[.22em] text-black/55">Lead magnet</p>
          <h2 className="mt-2 text-4xl font-black uppercase leading-none md:text-6xl">Steal the first-page checklist.</h2>
          <p className="mt-3 max-w-2xl text-black/70">Offer clarity, local SEO, answer blocks, proof, CTAs, and the tiny leaks that make good marketing feel quiet.</p>
        </div>
        <a href={business.bookingUrl} target="_blank" rel="noreferrer" className="btn-dark" data-event="cta_download_marketing_scorecard">
          Get the scorecard <ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section-dark" aria-labelledby="faq">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="kicker">Answers search engines can quote</p>
          <h2 id="faq" className="headline mt-3">
            Quick answers.
          </h2>
        </div>
        <div className="grid gap-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="faq-card">
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConsultationCta() {
  return (
    <section className="section-dark border-t border-white/10" aria-labelledby="consultation">
      <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
        <Flame className="mx-auto text-[var(--acid)]" size={42} />
        <h2 id="consultation" className="cta-headline mx-auto mt-5 max-w-4xl">
          Give your marketing a point of view.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/68">Book the conversation. Bring the messy goals. EMC will help find the first useful move.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={business.bookingUrl} target="_blank" rel="noreferrer" className="btn-acid" data-event="cta_final_book">
            Book a consultation <ArrowRight size={18} />
          </a>
          <a href={`mailto:${business.email}`} className="btn-ghost" data-event="cta_final_email">
            Email instead
          </a>
        </div>
      </div>
    </section>
  );
}

export function AboutPageContent() {
  return (
    <>
      <PageHero eyebrow="About EMC" title="Built by Elizabeth. Tuned for attention." body="EMC Marketing started as Elizabeth's Media Creations and grew into a sharp, practical agency for brands that need stronger creative direction, cleaner strategy, and less forgettable marketing." />
      <section className="section-bone">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="tilt-panel bg-black text-white">
            <p className="kicker">Founder note</p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-none">The E in EMC.</h2>
          </div>
          <div className="prose-copy text-black">
            <p>
              EMC keeps the current site's human tone: transparent, collaborative, practical, and allergic to sleepy marketing. The goal is not to sound bigger than the business. The goal is to make the work feel clear, alive, and useful.
            </p>
            <p>
              Services span social media, paid ads, brand identity, content production, website design, SEO, AEO, Google Business support, audits, and consultation.
            </p>
          </div>
        </div>
      </section>
      <WhyEmc />
      <ConsultationCta />
    </>
  );
}

export function ServicesPageContent() {
  return (
    <>
      <PageHero eyebrow="Services" title="The useful menu." body="Pick the pressure point. EMC can sharpen the message, build the campaign, fix the site, organize the content, or audit what is already running." />
      <section className="section-bone">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:px-6">
          {services.map((service, index) => (
            <article key={service.slug} className="service-row">
              <div>
                <p className="text-sm font-black text-black/35">0{index + 1}</p>
                <h2 className="mt-3 text-4xl font-black uppercase leading-none">{service.title}</h2>
              </div>
              <div>
                <p className="text-xl font-black">{service.hook}</p>
                <p className="mt-3 text-black/68">{service.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.includes.map((item) => (
                    <span key={item} className="rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-[.14em] text-white">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <MarketingQuiz />
      <ConsultationCta />
    </>
  );
}

export function ResultsReviewsPageContent() {
  return (
    <>
      <PageHero eyebrow="Results & reviews" title="Proof without pretending." body="This page is wired for verified Google reviews, review schema, and proof points. Review schema stays off until real verified text is added." />
      <ReviewsSection />
      <ProcessSection />
      <ConsultationCta />
    </>
  );
}

export function VideosPageContent() {
  return (
    <>
      <PageHero eyebrow="Videos" title="The content shelf." body="Real EMC Social Club YouTube videos and Shorts, separated by format so visitors can browse the long-form ideas or the quick hits." />
      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <VideoGallery />
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}

export function ContactPageContent() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Bring the messy marketing problem." body="Email, call, book a slot, or send the form. The form stores locally for now with clear TODO hooks for Google Workspace integration." />
      <section className="section-dark">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="grid content-start gap-4">
            <a className="contact-card" href={business.phoneHref} data-event="cta_contact_call">
              <Phone /> {business.phone}
            </a>
            <a className="contact-card" href={`mailto:${business.email}`} data-event="cta_contact_email">
              <Mail /> {business.email}
            </a>
            <a className="contact-card" href={business.bookingUrl} target="_blank" rel="noreferrer" data-event="cta_contact_book">
              <MapPin /> Book a consultation
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <HeroEnergy />
      <div className="relative mx-auto max-w-7xl">
        <p className="kicker">{eyebrow}</p>
        <h1 className="hero-title mt-5 max-w-5xl font-black uppercase leading-[.8]">{title}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-white/72">{body}</p>
      </div>
    </section>
  );
}
