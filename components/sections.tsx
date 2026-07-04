import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, BadgeCheck, BarChart3, Flame, Mail, MapPin, Phone, Sparkles, Target, TrendingUp, Zap } from 'lucide-react';
import { business, faqs, painPoints, processSteps, services, videoFaqs } from '@/lib/site-data';
import { ContactForm, DynamicVideoPreview, ExitIntentCapture, HeroEnergy, MarketingQuiz, MotionIn, ReviewCarousel, ScrollProgress, VideoGallery } from './site-widgets';

const serviceTracks = [
  {
    title: 'Foundation',
    body: 'Clarify the offer, brand voice, local search basics, tracking, and the first useful conversion path.',
    fit: 'Newer businesses, local service providers, or teams with scattered assets.',
    outputs: ['Offer and CTA cleanup', 'Google Business direction', 'Website and content audit', '30-day action plan']
  },
  {
    title: 'Content engine',
    body: 'Build a practical content rhythm across organic social, short-form video, review prompts, and campaign moments.',
    fit: 'Brands that need consistent visibility without sounding like everyone else.',
    outputs: ['Monthly content calendar', 'Reel and post concepts', 'Caption and hook direction', 'Repurposing workflow']
  },
  {
    title: 'Growth campaigns',
    body: 'Connect paid ads, landing pages, creative tests, and reporting so spend has a job and a feedback loop.',
    fit: 'Businesses ready to turn attention into lead flow, bookings, or sales.',
    outputs: ['Meta campaign plan', 'Creative testing map', 'Landing-page recommendations', 'Monthly readout']
  }
];

const marketingTiers = [
  {
    name: 'Startup Business',
    revenue: '$0-$500k annual revenue',
    benchmark: 'Aggressive early-stage plans often reserve 10-15% of projected revenue for marketing, but many local startups begin with a tighter cash-first test budget.',
    monthlyBudget: '$750-$2,500',
    emcEstimate: '$500-$1,500/mo plus project work',
    paidMedia: '$250-$1,000/mo',
    tactics: ['Offer and audience definition', 'Google Business setup', 'Launch social kit', 'Founder-led short-form video', 'Landing page or one-page site', 'Review and referral prompts'],
    analysis: 'Best use of money: prove the message, capture local demand, and avoid overbuying ads before the offer is clear.'
  },
  {
    name: 'Small Business',
    revenue: '$500k-$2M annual revenue',
    benchmark: 'Common small-business planning ranges sit around 7-8% of revenue, while narrower advertising-only averages can be much lower.',
    monthlyBudget: '$3,000-$12,000',
    emcEstimate: '$1,500-$4,500/mo',
    paidMedia: '$750-$4,000/mo',
    tactics: ['Local SEO and service pages', 'Consistent organic social', 'Meta lead campaigns', 'Email list capture', 'Review generation', 'Monthly content production'],
    analysis: 'Best use of money: build repeatable visibility, separate service lines, and track cost per lead before scaling spend.'
  },
  {
    name: 'Medium Business',
    revenue: '$2M-$10M annual revenue',
    benchmark: 'Established companies often benchmark marketing near 7.7-9.4% of revenue, adjusted by industry, margin, and growth goals.',
    monthlyBudget: '$12,000-$60,000',
    emcEstimate: '$4,500-$12,000/mo',
    paidMedia: '$4,000-$25,000/mo',
    tactics: ['Quarterly campaign strategy', 'SEO/AEO content clusters', 'Paid social and search testing', 'Creative production days', 'CRM/email nurturing', 'Dashboard reporting'],
    analysis: 'Best use of money: connect channels into campaigns, fund enough creative testing, and report on pipeline instead of isolated clicks.'
  },
  {
    name: 'Enterprise',
    revenue: '$10M+ annual revenue',
    benchmark: 'Enterprise budgets vary widely by category, but national benchmarks still commonly land in the high-single-digit revenue range for total marketing.',
    monthlyBudget: '$60,000+',
    emcEstimate: '$12,000+/mo or scoped campaign pods',
    paidMedia: '$25,000+/mo',
    tactics: ['Brand governance', 'Multi-market campaign planning', 'Executive thought leadership', 'Creative testing systems', 'Agency/vendor coordination', 'Attribution and board-ready reporting'],
    analysis: 'Best use of money: protect brand consistency, coordinate specialist teams, and turn marketing data into decisions leadership can actually use.'
  }
];

const benchmarkSources = [
  'Gartner 2025 CMO Spend Survey: average marketing budget near 7.7% of company revenue.',
  'Deloitte/Duke CMO Survey 2025: marketing budgets reported around 9.4% of revenue, with digital spend still growing.',
  'SBA small-business guidance: advertising averages vary widely; some small businesses spend near 1.08% of revenue on advertising alone.',
  'BDC planning rule: B2B often budgets 2-5% of revenue, while B2C often budgets 5-10%.',
  'WebFX 2025/2026 pricing benchmarks: digital marketing service retainers commonly range from hundreds to several thousand dollars monthly, with channel-specific ranges for SEO, social, PPC, and web design.'
];

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
            Real words from clients who trusted EMC with the messy, high-stakes work of getting noticed.
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
            Watch Elizabeth break down the marketing habits, content choices, and brand moves that make people pay attention.
          </p>
          <Link href="/videos/" className="btn-dark mt-7 inline-flex">
            Watch the gallery <ArrowRight size={17} />
          </Link>
        </div>
        <DynamicVideoPreview />
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
        <a href={business.scorecardUrl} target="_blank" rel="noreferrer" className="btn-dark" data-event="cta_download_marketing_scorecard">
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
      <PageHero eyebrow="Services" title="Strategy, content, ads, websites." body="A service page should not feel like a drawer full of labels. EMC organizes the work by the problem it solves: foundation, visibility, and growth." />
      <LocalContext
        eyebrow="How EMC scopes work"
        title="Start with the leak. Build the system around it."
        body="Some brands need a cleaner offer. Some need a content engine. Some need paid campaigns that stop guessing. The right scope depends on where attention is being lost."
      />
      <section className="section-bone" aria-labelledby="service-tracks">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="kicker text-black/55">Engagement tracks</p>
          <h2 id="service-tracks" className="headline mt-3 max-w-5xl text-black">Choose the shape of the work.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {serviceTracks.map((track) => (
              <article key={track.title} className="service-card">
                <p className="text-sm font-black uppercase tracking-[.18em] text-black/35">{track.fit}</p>
                <h3 className="mt-6 text-4xl font-black uppercase leading-none">{track.title}</h3>
                <p className="mt-4 text-black/70">{track.body}</p>
                <ul className="mt-6 grid gap-3">
                  {track.outputs.map((item) => (
                    <li key={item} className="flex gap-3 border-t border-black/15 pt-3 text-sm font-bold text-black/70">
                      <ArrowRight size={16} className="mt-0.5 text-[var(--acid-dark)]" /> {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-dark" aria-labelledby="service-menu">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:px-6">
          <div className="mb-5 max-w-3xl">
            <p className="kicker">Service menu</p>
            <h2 id="service-menu" className="headline mt-3">The actual levers.</h2>
            <p className="mt-5 text-lg text-white/68">These can stand alone, but they work best when they point at the same offer and the same buyer decision.</p>
          </div>
          {services.map((service, index) => (
            <article key={service.slug} className="grid gap-6 border border-white/15 bg-white/[.04] p-6 md:grid-cols-[.7fr_1.3fr] md:p-8">
              <div>
                <p className="text-sm font-black text-[var(--acid)]">0{index + 1}</p>
                <h2 className="mt-3 text-4xl font-black uppercase leading-none">{service.title}</h2>
              </div>
              <div>
                <p className="text-xl font-black">{service.hook}</p>
                <p className="mt-3 text-white/68">{service.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.includes.map((item) => (
                    <span key={item} className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[.14em] text-white/70">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}

export function ResultsReviewsPageContent() {
  return (
    <>
      <PageHero eyebrow="Results & planning" title="What should marketing cost?" body="Reviews show trust. Budget tiers show what a realistic marketing plan can include at different business sizes." />
      <LocalContext
        eyebrow="Budget reality"
        title="The right spend depends on revenue, margins, category, and how fast you need growth."
        body="The tiers below use public market benchmarks as planning ranges, not promises. Paid media, production, software, and agency work should be separated so the real cost of growth is visible."
      />
      <MarketingTiersSection />
      <ReviewsSection />
      <ConsultationCta />
    </>
  );
}

export function VideosPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="EMC Social Club."
        body="A dedicated video library for quick marketing lessons, Shorts, campaign thinking, and the creative habits that help brands become easier to remember."
        action={
          <a href={business.youtubeUrl} target="_blank" rel="noreferrer" className="btn-acid mt-7 inline-flex" data-event="cta_youtube_subscribe">
            Subscribe on YouTube <ArrowRight size={17} />
          </a>
        }
      />
      <section className="section-bone" aria-labelledby="video-split">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="kicker text-black/55">Watch by intent</p>
            <h2 id="video-split" className="headline mt-3 text-black">Shorts for sparks. Videos for context.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Shorts', 'Quick hits for content mistakes, brand instincts, ad warnings, and social media gut checks.'],
              ['Videos', 'Longer lessons for business owners who want the why behind the tactic before they spend money.']
            ].map(([title, body]) => (
              <div key={title} className="border-2 border-black bg-white p-6">
                <PlayIconLabel title={title} />
                <p className="mt-4 text-lg font-semibold text-black/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <VideoGallery />
        </div>
      </section>
      <VideoLearningSection />
      <ConsultationCta />
    </>
  );
}

function MarketingTiersSection() {
  return (
    <section className="section-bone" aria-labelledby="marketing-tiers">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <p className="kicker text-black/55">Cost analysis</p>
            <h2 id="marketing-tiers" className="headline mt-3 text-black">Four practical budget tiers.</h2>
          </div>
          <p className="text-lg font-semibold leading-8 text-black/68">
            Use these as planning bands. The low end protects cash and validates the message; the high end supports faster learning, more production, and more paid distribution.
          </p>
        </div>
        <div className="mt-10 grid gap-5">
          {marketingTiers.map((tier) => (
            <article key={tier.name} className="border-2 border-black bg-white p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
                <div>
                  <p className="text-sm font-black uppercase tracking-[.18em] text-black/45">{tier.revenue}</p>
                  <h3 className="mt-3 text-4xl font-black uppercase leading-none">{tier.name}</h3>
                  <p className="mt-4 text-black/68">{tier.benchmark}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Metric label="Total monthly plan" value={tier.monthlyBudget} />
                  <Metric label="EMC estimate" value={tier.emcEstimate} />
                  <Metric label="Paid media" value={tier.paidMedia} />
                </div>
              </div>
              <div className="mt-7 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.18em] text-black/45">Recommended tactics</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tier.tactics.map((tactic) => (
                      <span key={tactic} className="rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-[.12em] text-white">
                        {tactic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-l-2 border-[var(--acid-dark)] pl-5">
                  <BarChart3 className="text-[var(--acid-dark)]" />
                  <p className="mt-3 text-sm font-bold leading-6 text-black/72">{tier.analysis}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 border border-black/15 bg-black p-6 text-white">
          <p className="kicker">Benchmark basis</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {benchmarkSources.map((source) => (
              <p key={source} className="text-sm leading-6 text-white/68">
                {source}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/15 bg-black p-4 text-white">
      <p className="text-xs font-black uppercase tracking-[.16em] text-white/45">{label}</p>
      <p className="mt-3 text-2xl font-black text-[var(--acid)]">{value}</p>
    </div>
  );
}

function PlayIconLabel({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-black text-[var(--acid)]">
        <TrendingUp size={20} />
      </span>
      <h3 className="text-3xl font-black uppercase">{title}</h3>
    </div>
  );
}

export function ContactPageContent() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Bring the messy marketing problem." body="Email, call, book a slot, or send the form. Bring the chaos, the half-formed idea, or the thing that has been quietly bugging you." />
      <LocalContext
        eyebrow="Start local, move fast"
        title="Fayetteville roots. Real conversations. No maze."
        body="Whether you are in Northwest Arkansas or building from somewhere else, the first step is simple: tell EMC what is unclear, what is not converting, and what needs to feel more like you."
      />
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

function LocalContext({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="bg-[var(--acid)] px-4 py-12 text-black md:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-[.8fr_1.2fr] md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[.22em] text-black/60">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none md:text-5xl">{title}</h2>
        </div>
        <p className="text-lg font-semibold leading-8 text-black/75">{body}</p>
      </div>
    </section>
  );
}

function VideoLearningSection() {
  return (
    <section className="section-bone" aria-labelledby="video-learning">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="kicker text-black/55">What you will learn</p>
          <h2 id="video-learning" className="headline mt-3 text-black">
            Small videos. Useful signals.
          </h2>
          <p className="mt-5 text-lg text-black/70">
            EMC Social Club is for business owners, marketers, and local brands that want sharper content instincts without sitting through a seminar.
          </p>
        </div>
        <div className="grid gap-3">
          {videoFaqs.map((faq) => (
            <details key={faq.q} className="border border-black/15 bg-white p-5">
              <summary className="cursor-pointer text-xl font-black">{faq.q}</summary>
              <p className="mt-3 leading-7 text-black/70">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, body, action }: { eyebrow: string; title: string; body: string; action?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <HeroEnergy />
      <div className="relative mx-auto max-w-7xl">
        <p className="kicker">{eyebrow}</p>
        <h1 className="hero-title mt-5 max-w-5xl font-black uppercase leading-[.8]">{title}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-white/72">{body}</p>
        {action}
      </div>
    </section>
  );
}
