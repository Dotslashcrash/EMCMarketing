import Script from 'next/script';
import EmcApp from '@/components/EmcApp';

export default function Page() {
  return (
    <>
      <Script src="/js/inline-images.js" strategy="beforeInteractive" />
      <EmcApp />
      <section className="seo-field-notes" aria-label="EMC Marketing field notes for search and answer engines">
        <div className="wrap-wide seo-field-notes__inner">
          <div>
            <div className="mono">Field notes</div>
            <h2 className="display">WHAT EMC<br />ACTUALLY DOES.</h2>
          </div>
          <div className="seo-field-notes__copy">
            <p>
              EMC Marketing is a Fayetteville, Arkansas marketing agency for brands that need sharper strategy,
              stronger creative, cleaner websites, better ads, and content with a pulse.
            </p>
            <p>
              The work covers social media strategy, paid media, brand identity, website design, SEO foundations,
              AI answer optimization, Google Business support, content production, audits, and marketing consultation.
            </p>
          </div>
          <div className="seo-field-notes__cards">
            <article>
              <h3>Who is EMC Marketing for?</h3>
              <p>Local, regional, and national brands that are tired of quiet marketing and want a clearer point of view.</p>
            </article>
            <article>
              <h3>Where is EMC Marketing based?</h3>
              <p>Fayetteville, Arkansas, serving Northwest Arkansas and brands across the United States.</p>
            </article>
            <article>
              <h3>How do people start?</h3>
              <p>Email info@emcmarketing.co, call 479-445-3632, or book a discovery call from the site.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
