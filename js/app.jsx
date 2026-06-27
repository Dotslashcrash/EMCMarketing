  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "heroVariant": "zine",
    "greenTone": "classic"
  }/*EDITMODE-END*/;

  const LINKS = {
    vault:    'https://payhip.com/EMCmarketing',
    smarter:  'https://emcmarketing.aweb.page/exclusive-updates-insights',
    crew:     'https://sites.google.com/elizabethsmediacreations.com/emcrew/home',
    calendly: 'https://emcmarketingllc.hbportal.co/schedule/69ea5f23ac1f98003f0c335a',
    inquiry:  'https://emcmarketingllc.hbportal.co/public/69f2a55b9ef61e3300999198/1-Inquiry_form',
    apply:    'https://forms.gle/jDvzgVo561F7rsah7',
  };
  const SOCIAL = [
    { code: 'FB', label: 'Facebook',  url: 'https://www.facebook.com/profile.php?id=100095202204919' },
    { code: 'IG', label: 'Instagram', url: 'https://www.instagram.com/elizabethsmediacreations/' },
    { code: 'LI', label: 'LinkedIn',  url: 'https://www.linkedin.com/in/elizabethrenae/' },
    { code: 'YT', label: 'YouTube',   url: 'https://www.youtube.com/@EMCSocialClub' },
  ];
  const EXT = { target: '_blank', rel: 'noopener noreferrer' };

  const { useEffect, useRef, useState } = React;

  // ====== Hooks ======
  function useReveal(threshold = 0.12) {
    const ref = useRef(null);
    useEffect(() => {
      if (!ref.current) return;
      const el = ref.current;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) el.classList.add('in'); });
      }, { threshold });
      io.observe(el);
      return () => io.disconnect();
    }, []);
    return ref;
  }
  function useScrollY() {
    const [y, setY] = useState(0);
    useEffect(() => {
      const onScroll = () => setY(window.scrollY);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return y;
  }

  // ====== Reveal wrapper ======
  function Reveal({ children, className = '', ...rest }) {
    const ref = useReveal();
    return <div ref={ref} className={`reveal ${className}`} {...rest}>{children}</div>;
  }

  // ====== Photo placeholder / real image / video ======
  function Photo({ label, aspect = '4/5', variant = 'default', style = {}, src, video, objectPosition = 'center' }) {
    const cls = variant === 'bone' ? 'ph ph--bone' : variant === 'acid' ? 'ph ph--acid' : 'ph';
    if (video) {
      return (
        <div className={cls} style={{aspectRatio: aspect, width: '100%', ...style}}>
          <video src={video} autoPlay loop muted playsInline preload="metadata" aria-label={label}
            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition, position: 'absolute', inset: 0}} />
        </div>
      );
    }
    if (src) {
      return (
        <div className={cls} style={{aspectRatio: aspect, width: '100%', ...style}}>
          <img src={src} alt={label} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition, position: 'absolute', inset: 0}} />
        </div>
      );
    }
    return (
      <div className={cls} style={{aspectRatio: aspect, width: '100%', ...style}}>
        <span className="ph__label">↑ PHOTO · {label}</span>
      </div>
    );
  }

  function Reel({ src, aspect = '9/16', style = {}, poster }) {
    return (
      <div className="ph" style={{aspectRatio: aspect, width: '100%', ...style}}>
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, border: 0}}
        />
      </div>
    );
  }

  // ====== Xmarks ======
  function Xrow({ n = 4, size = 52, lit = 1, color = 'rgba(255,255,255,0.2)' }) {
    return (
      <div className="x-row" style={{fontSize: size, gap: size * 0.3}}>
        {Array.from({length: n}).map((_, i) => (
          <svg key={i} width={size} height={size} viewBox="0 0 100 100" style={{flex: '0 0 auto'}}>
            <path d="M18 15 L85 85 M85 18 L15 85"
              stroke={i >= n - lit ? 'var(--acid)' : color}
              strokeWidth="14" strokeLinecap="round" fill="none" />
          </svg>
        ))}
      </div>
    );
  }

  // ====== Nav ======
  function Nav({ page, setPage }) {
    const y = useScrollY();
    const solid = y > 60;
    const [menuOpen, setMenuOpen] = useState(false);
    const items = [
      { id: 'home', l: 'Home' },
      { id: 'services', l: 'Services' },
      { id: 'websites', l: 'Websites' },
      { id: 'portfolio', l: 'Portfolio' },
      { id: 'about', l: 'About' },
      { id: 'careers', l: 'Careers' },
      { id: 'contact', l: 'Contact' },
    ];
    const go = (id) => { setPage(id); setMenuOpen(false); };

    useEffect(() => {
      document.body.style.overflow = menuOpen ? 'hidden' : '';
      return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
      <nav className={`nav ${solid ? 'solid' : ''} ${menuOpen ? 'nav--open' : ''}`}>
        <div className="nav__logo" onClick={() => { setPage('home'); setMenuOpen(false); }}>
          <img src="/images/emc-logo.svg" alt="EMC Marketing" style={{height: 40, width: 'auto', display: 'block'}} />
        </div>
        <div className="nav__links">
          {items.map(i => (
            <a key={i.id} className={`nav__link ${page === i.id ? 'active' : ''}`}
              onClick={() => setPage(i.id)}>{i.l}</a>
          ))}
        </div>
        <div className="nav__right">
          <a className="nav__link nav__crew" style={{fontSize: 12}} href={LINKS.crew} {...EXT}>EMCREW</a>
          <a className="nav__cta" href={LINKS.calendly} {...EXT}>Book a chat →</a>
          <button className="nav__burger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className="nav__drawer">
          {items.map(i => (
            <a key={i.id} className={page === i.id ? 'active' : ''} onClick={() => go(i.id)}>{i.l}</a>
          ))}
          <div className="nav__drawer-divider"></div>
          <a href={LINKS.crew} {...EXT} onClick={() => setMenuOpen(false)}>EMCREW</a>
          <a className="nav__drawer-cta" href={LINKS.calendly} {...EXT} onClick={() => setMenuOpen(false)}>Book a chat →</a>
        </div>
      </nav>
    );
  }

  // ====== Marquee ======
  function Marquee({ items, variant = '' }) {
    return (
      <div className={`marquee ${variant}`}>
        <div className="marquee__track">
          {[...items, ...items].map((t, i) => (
            <span key={i} style={{display: 'inline-flex', alignItems: 'center', gap: 28}}>
              {t}
              <span style={{width: 18, height: 18, display: 'inline-block'}}>
                <svg viewBox="0 0 100 100" width="18" height="18">
                  <path d="M18 15 L85 85 M85 18 L15 85" stroke="currentColor" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.55"/>
                </svg>
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  // ====== Scroll bar ======
  function ScrollBar() {
    const [pct, setPct] = useState(0);
    useEffect(() => {
      const on = () => { const h = document.documentElement.scrollHeight - window.innerHeight; setPct(h > 0 ? (window.scrollY / h) * 100 : 0); };
      on(); window.addEventListener('scroll', on, { passive: true });
      return () => window.removeEventListener('scroll', on);
    }, []);
    return <div className="scroll-bar" style={{width: `${pct}%`}} />;
  }

  // ====== Footer ======
  function Footer({ setPage }) {
    return (
      <footer className="foot">
        <div className="foot__grid">
          <div>
            <div className="foot__head">LEAVE<br/>A MARK.</div>
            <div style={{marginTop: 28}}>
              <a className="btn btn--acid" href={LINKS.calendly} {...EXT}>Book a chat →</a>
            </div>
          </div>
          <div className="foot__col">
            <div className="foot__col-title">Menu</div>
            <a onClick={() => setPage('home')}>Home</a>
            <a onClick={() => setPage('services')}>Services</a>
            <a onClick={() => setPage('about')}>About</a>
            <a onClick={() => setPage('contact')}>Contact</a>
          </div>
          <div className="foot__col">
            <div className="foot__col-title">The goods</div>
            <a href={LINKS.vault} {...EXT}>Shop the Vault</a>
            <a href={LINKS.smarter} {...EXT}>Make Me Smarter</a>
            <a onClick={() => setPage('portfolio')}>Portfolio</a>
            <a onClick={() => setPage('careers')}>Careers</a>
          </div>
          <div className="foot__col">
            <div className="foot__col-title">Holler</div>
            <a href="mailto:info@emcmarketing.co">info@emcmarketing.co</a>
            <a href="tel:4794453632">479-445-3632</a>
            <div style={{display: 'flex', gap: 10, marginTop: 14}}>
              {SOCIAL.map(s => (
                <a key={s.code} href={s.url} {...EXT} aria-label={s.label} style={{width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', cursor: 'pointer'}}>{s.code}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="foot__bottom">
          <span>© 2026 EMC MARKETING</span>
          <span>MADE LOUD IN FAYETTEVILLE, AR</span>
          <span>NOT BORING SINCE DAY ONE</span>
        </div>
      </footer>
    );
  }

  // ====== Rotating word ======
  function RotatingWord({ words, interval = 1800, color = 'var(--acid)' }) {
    const [i, setI] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setI(v => (v + 1) % words.length), interval);
      return () => clearInterval(t);
    }, []);
    return (
      <span style={{position: 'relative', display: 'inline-block', minWidth: '5ch', verticalAlign: 'top'}}>
        {words.map((w, idx) => (
          <span key={idx} style={{
            position: idx === 0 ? 'relative' : 'absolute', left: 0, top: 0,
            color, opacity: idx === i ? 1 : 0,
            transform: idx === i ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity .4s, transform .4s', whiteSpace: 'nowrap',
          }}>{w}</span>
        ))}
      </span>
    );
  }

  // ====== HERO variants ======
  function HeroClassic() {
    const y = useScrollY();
    return (
      <section style={{position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'var(--ink)', paddingTop: 130, paddingBottom: 80}}>
        <div className="wrap-wide" style={{position: 'relative'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center', minHeight: 'calc(100vh - 210px)'}}>
            <div>
              <Reveal>
                <div style={{display: 'flex', gap: 14, marginBottom: 28, alignItems: 'center', flexWrap: 'wrap'}}>
                  <span className="tag">● Taking clients for Q3</span>
                  <span className="mono" style={{opacity: 0.6}}>5.0 ★★★★★ · 40+ brands</span>
                </div>
              </Reveal>
              <Reveal>
                <h1 className="display" style={{fontSize: 'clamp(70px, 10vw, 164px)', color: '#fff'}}>
                  YOUR<br/>
                  MARKETING<br/>
                  <s style={{textDecorationColor: 'var(--acid)', textDecorationThickness: 8}}>SUCKS</s><br/>
                  <RotatingWord words={['SLAPS NOW.','HITS NOW.','WORKS NOW.','SELLS NOW.']} />
                </h1>
              </Reveal>
              <Reveal>
                <p style={{maxWidth: 520, marginTop: 32, fontSize: 17, lineHeight: 1.55, opacity: 0.82, color: '#fff'}}>
                  It's time for you to leave a mark online. We blend strategy, creative and chaos into work that makes people stop scrolling — and start spending.
                </p>
              </Reveal>
              <Reveal>
                <div style={{display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap'}}>
                  <a className="btn btn--acid" href={LINKS.vault} {...EXT}>Shop the EMC Vault →</a>
                  <a className="btn btn--ghost" href={LINKS.smarter} {...EXT}>Make me smarter</a>
                </div>
              </Reveal>
              <Reveal>
                <div style={{marginTop: 56, display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap'}}>
                  <Xrow n={5} lit={1} size={38} />
                  <div className="mono" style={{opacity: 0.55, maxWidth: 240, color: '#fff'}}>
                    Four marketers would rather cross you off. We'd rather cash you out.
                  </div>
                </div>
              </Reveal>
            </div>
            <div style={{position: 'relative'}}>
              <div style={{position: 'absolute', top: '-8%', right: '-10%', width: '110%', aspectRatio: '1',
                borderRadius: '50%', background: 'var(--acid)', transform: `translateY(${-y * 0.08}px)`, zIndex: 1}} />
              <div style={{position: 'relative', zIndex: 2, transform: `translateY(${-y * 0.04}px)`}}>
                <Photo label="Elizabeth / Hero shot" aspect="4/5" variant="default" src={window.__ELIZ_PT} objectPosition="center top" />
              </div>
              <div style={{position: 'absolute', bottom: 28, left: -14, zIndex: 3, transform: 'rotate(-8deg)'}}>
                <span className="stamp" style={{background: 'var(--ink)', color: 'var(--acid)', padding: '14px 18px', fontSize: 14}}>CERTIFIED LOUD®</span>
              </div>
              <div style={{position: 'absolute', top: 40, right: 0, zIndex: 3, transform: 'rotate(6deg)'}}>
                <span className="stamp" style={{background: 'var(--acid)', color: 'var(--ink)', padding: '10px 14px', fontSize: 12}}>NOT BORING</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function HeroZine({ setPage }) {
    const y = useScrollY();
    return (
      <section style={{position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'var(--ink)', paddingTop: 130, paddingBottom: 60}}>
        <div className="wrap-wide">
          <Reveal>
            <h1 className="display" style={{fontSize: 'clamp(88px, 17vw, 300px)', color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.82}}>
              YOUR<br/>
              <span style={{color: 'var(--acid)'}}>MARKETING</span><br/>
              SUCKS&nbsp;<span style={{color: 'var(--acid)', fontStyle: 'italic', display: 'inline-block', transform: 'skewX(-6deg)'}}>LESS</span><br/>
              NOW.
            </h1>
          </Reveal>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginTop: 60, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.15)'}}>
            <Reveal>
              <div className="mono" style={{color: 'var(--acid)', marginBottom: 10}}>01 / STATUS</div>
              <p style={{fontSize: 15, opacity: 0.85, lineHeight: 1.55, color: '#fff'}}>We take your vision and turn it into something your competitors quietly screenshot.</p>
            </Reveal>
            <Reveal>
              <div className="mono" style={{color: 'var(--acid)', marginBottom: 10}}>02 / METHOD</div>
              <p style={{fontSize: 15, opacity: 0.85, lineHeight: 1.55, color: '#fff'}}>Strategy, creative, media buy. We do the whole loud thing — not just the pretty part.</p>
            </Reveal>
            <Reveal>
              <div className="mono" style={{color: 'var(--acid)', marginBottom: 10}}>03 / ACTION</div>
              <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
                <a className="btn btn--acid" style={{padding: '14px 22px'}} href={LINKS.calendly} {...EXT}>Book a chat →</a>
                <button className="btn btn--ghost" style={{padding: '14px 22px'}} onClick={() => setPage('portfolio')}>Portfolio</button>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="hero-zine__founder" style={{position: 'absolute', right: 'max(3vw, 40px)', top: 200, width: 220, zIndex: 3, transform: `rotate(6deg) translateY(${-y * 0.08}px)`, border: '4px solid #fff'}}>
          <Photo label="Founder" aspect="3/4" variant="acid" src={window.__ELIZ_PT} objectPosition="center 20%" />
          <div style={{background: '#fff', color: '#000', padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textAlign: 'center'}}>EXHIBIT A · FOUNDER</div>
        </div>
      </section>
    );
  }

  function HeroSplit() {
    const y = useScrollY();
    return (
      <section style={{position: 'relative', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.15fr 1fr', background: 'var(--ink)', paddingTop: 88}}>
        <div style={{padding: '72px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <span className="tag" style={{alignSelf: 'flex-start', marginBottom: 28}}>● CURRENTLY CRUSHING Q2</span>
          <Reveal>
            <h1 className="display" style={{fontSize: 'clamp(80px, 11vw, 180px)', color: '#fff'}}>
              MAKE<br/>THEM<br/><span style={{color: 'var(--acid)'}}>STARE.</span>
            </h1>
          </Reveal>
          <Reveal>
            <p style={{maxWidth: 480, marginTop: 30, fontSize: 18, opacity: 0.85, color: '#fff'}}>
              Your marketing sucks less now. EMC turns scroll-past brands into stop-and-stare brands. Loud by design, measured by intent.
            </p>
          </Reveal>
          <Reveal>
            <div style={{display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap'}}>
              <button className="btn btn--acid">Start screaming →</button>
              <button className="btn btn--ghost">Shut up & show me</button>
            </div>
          </Reveal>
        </div>
        <div style={{position: 'relative', background: 'var(--acid)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden'}}>
          <div style={{width: '85%', transform: `translateY(${-y * 0.05}px)`, marginBottom: 0}}>
            <Photo label="Elizabeth" aspect="4/5" variant="bone" src={window.__ELIZ_PT} objectPosition="center top" />
          </div>
          <div style={{position: 'absolute', top: 60, left: 40, fontFamily: 'var(--font-display)', color: 'var(--ink)', fontSize: 'clamp(72px, 9vw, 140px)', lineHeight: 0.86}}>
            LOUD<br/>BY<br/>DESIGN.
          </div>
        </div>
      </section>
    );
  }

  function Hero({ variant, setPage }) {
    if (variant === 'classic') return <HeroClassic />;
    if (variant === 'split') return <HeroSplit />;
    return <HeroZine setPage={setPage} />;
  }

  // ====== Services grid ======
  const SERVICES = [
    { n: '01', title: 'SOCIAL THAT\nACTUALLY MOVES', body: "We don't 'post content.' We engineer scroll-stoppers. Organic posts, reels, UGC, community — tied back to revenue, not vanity.", tags: ['Instagram','TikTok','LinkedIn'] },
    { n: '02', title: 'PAID ADS,\nNO GAMBLING', body: 'Google and Meta buys that respect your budget. Tight tracking, honest reporting, zero guru-speak.', tags: ['Google','Meta','YouTube'] },
    { n: '03', title: 'BRAND THAT\nHITS BACK', body: 'Logos, identity, packaging, decks. Built to look loud in a feed and professional in a boardroom. Both, not either.', tags: ['Identity','Packaging','Web'] },
    { n: '04', title: 'CONTENT\nON-DEMAND', body: 'Photography, short-form video, copywriting. The monthly machine that feeds your feeds without you crying.', tags: ['Photo','Video','Copy'] },
    { n: '05', title: 'STRATEGY\n(THE BORING PART)', body: "Positioning, audience, messaging architecture, competitor digs. The thinking that makes the pretty stuff actually work.", tags: ['Research','Positioning','Audit'] },
    { n: '06', title: 'CONVERSION\n& CRM', body: 'Email flows, landing pages, funnels that sell while you sleep. Because beautiful ads mean nothing if the checkout is trash.', tags: ['Klaviyo','Shopify','HubSpot'] },
  ];
  function ServicesGrid({ setPage }) {
    return (
      <section className="section section--bone">
        <div className="wrap-wide">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24}}>
            <div>
              <div className="section__label">§ 001 — Capabilities & Expertise</div>
              <Reveal>
                <h2 className="display" style={{fontSize: 'clamp(56px, 9vw, 140px)', maxWidth: 1000, color: 'var(--ink)'}}>
                  WE DO THE <span style={{color: 'var(--acid)'}}>WHOLE</span> THING.
                </h2>
              </Reveal>
              <p style={{maxWidth: 560, marginTop: 20, color: '#222', fontSize: 17, lineHeight: 1.55}}>
                Six capabilities, one brain. Mix and match or hand us the keys — most clients end up doing the second thing once they see the first one work.
              </p>
            </div>
            <button className="btn btn--ink" onClick={() => setPage('contact')}>Let's chat →</button>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1.5px solid var(--ink)'}}>
            {SERVICES.map((s, i) => (
              <div key={s.n} style={{
                padding: 32,
                borderRight: (i+1) % 3 !== 0 ? '1.5px solid var(--ink)' : 'none',
                borderBottom: i < 3 ? '1.5px solid var(--ink)' : 'none',
                background: 'var(--bone)', color: 'var(--ink)',
                minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                transition: 'background .25s, color .25s', cursor: 'pointer', position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--bone)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bone)'; e.currentTarget.style.color = 'var(--ink)'; }}>
                <div>
                  <div className="mono" style={{opacity: 0.55}}>{s.n}</div>
                  <h3 className="display" style={{fontSize: 32, marginTop: 12, whiteSpace: 'pre-line'}}>{s.title}</h3>
                  <p style={{marginTop: 16, fontSize: 14, lineHeight: 1.5, opacity: 0.85}}>{s.body}</p>
                </div>
                <div style={{marginTop: 20, display: 'flex', gap: 6, flexWrap: 'wrap'}}>
                  {s.tags.map(t => (
                    <span key={t} style={{padding: '4px 10px', border: '1px solid currentColor', borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase'}}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ====== Stats ======
  function StatsStrip() {
    const stats = [{n:'40+',l:'Brands served'},{n:'5.0★',l:'Average rating'},{n:'12×',l:'Avg. ROAS'},{n:'2.4M',l:'Organic imp/mo'}];
    return (
      <section style={{background: 'var(--ink)', padding: '60px 0', borderTop: '1.5px solid var(--acid)', borderBottom: '1.5px solid var(--acid)'}}>
        <div className="wrap-wide" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24}}>
          {stats.map((s, i) => (
            <div key={i} style={{borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none', padding: '0 24px'}}>
              <div className="display" style={{fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--acid)'}}>{s.n}</div>
              <div className="mono" style={{opacity: 0.7, marginTop: 6, color: '#fff'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }


  const QUOTES = [
    { author: 'SANCHEEZE', role: 'Press kit / merch', body: "I had the honor of working with @emcsocial on a press kit. Well, she knew what to do, I just asked her to do it. She told me what she needed and came up with this. To say I'm impressed is an understatement." },
    { author: 'TJ WOLFE', role: 'UCG / founder', body: "If you're looking for a brand marketing expert who actually gets it, look no further. Elizabeth doesn't just 'do marketing' — she crafts identity. She listens. She delivers. She elevates. Five stars isn't enough." },
    { author: 'ALICIA', role: 'Realtor', body: "I can't recommend EMC highly enough. She created a stunning logo and full suite of real estate marketing materials. Attention to detail, deep understanding of my industry — the one to call." },
  ];
  function Testimonials() {
    return (
      <section className="section" style={{background: 'var(--ink)'}}>
        <div className="wrap-wide">
          <div className="section__label">§ 002 — Receipts & reviews</div>
          <Reveal>
            <h2 className="display" style={{fontSize: 'clamp(60px, 9vw, 140px)', color: '#fff', marginBottom: 48}}>
              THEY SAID <span style={{color: 'var(--acid)'}}>NICE THINGS.</span>
            </h2>
          </Reveal>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20}}>
            {QUOTES.map((q, i) => {
              const acid = i === 1;
              return (
                <div key={i} className="card-hover" style={{background: acid ? 'var(--acid)' : 'var(--ink-2)', color: acid ? 'var(--ink)' : '#fff', padding: 32, border: acid ? 'none' : '1px solid var(--edge)', borderRadius: 4, display: 'flex', flexDirection: 'column'}}>
                  <div className="display" style={{fontSize: 80, lineHeight: 0.6, color: acid ? 'var(--ink)' : 'var(--acid)', opacity: 0.5, marginBottom: 4}}>"</div>
                  <p style={{fontSize: 15, lineHeight: 1.55, marginTop: -8, flex: 1}}>{q.body}</p>
                  <div style={{marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <div className="display" style={{fontSize: 22}}>{q.author}</div>
                      <div className="mono" style={{opacity: 0.65, marginTop: 4}}>{q.role}</div>
                    </div>
                    <div style={{letterSpacing: 2, fontSize: 14}}>★★★★★</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ====== Big CTA ======
  function BigCTA({ setPage }) {
    return (
      <section className="section" style={{background: 'var(--acid)', color: 'var(--ink)', padding: '120px 0', overflow: 'hidden'}}>
        <div className="wrap-wide">
          <div className="cta-split">
            <div>
              <div className="section__label">§ 003 — Need my power?</div>
              <Reveal>
                <h2 className="display" style={{fontSize: 'clamp(72px, 12vw, 200px)', letterSpacing: '-0.02em'}}>
                  STOP<br/>BEING<br/>IGNORED.
                </h2>
              </Reveal>
              <p style={{maxWidth: 480, marginTop: 24, fontSize: 18}}>
                Book a 20-minute chat. No pitch deck, no fake urgency — just us figuring out if you should hire us.
              </p>
              <div style={{display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap'}}>
                <a className="btn btn--ink" href={LINKS.calendly} {...EXT}>Book a meeting →</a>
                <button className="btn btn--outline-ink" onClick={() => setPage('contact')}>Or email instead</button>
              </div>
            </div>
            <div className="cta-split__aside" style={{textAlign: 'right'}}>
              <div style={{display: 'inline-flex', gap: 8}}>
                <Xrow n={4} lit={4} size={96} color="rgba(0,0,0,0.25)" />
              </div>
              <div className="mono" style={{marginTop: 28}}>
                Four reasons to call us.<br/>Four reasons they won't.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ====== PAGES ======
  function HomePage({ variant, setPage }) {
    return (
      <div className="page-enter">
        <Hero variant={variant} setPage={setPage} />
        <Marquee items={['ELEVATE YOUR BRAND','EXPRESS YOUR VISION','LEAVE A MARK','NOT BORING SINCE 2019','LOUD BY DESIGN']} />
        <ServicesGrid setPage={setPage} />
        <Marquee variant="marquee--dark" items={['BOOK A CHAT','CERTIFIED LOUD®','YOUR MARKETING SUCKS LESS NOW','SHOP THE VAULT']} />
        <StatsStrip />
        <Testimonials />
        <BigCTA setPage={setPage} />
      </div>
    );
  }

  function AboutPage({ setPage }) {
    const values = [
      { n:'01', t:'NO FLUFF', b:"If it doesn't move a number or move a person, we're not doing it." },
      { n:'02', t:'LOUD ≠ DUMB', b:'We earn attention with craft. Yelling without substance is TikTok filler.' },
      { n:'03', t:'OWN YOUR WORK', b:'You get the files, the logins, the learnings. No vendor lock.' },
      { n:'04', t:'PICK A FIGHT', b:"Taking a stance is free advertising. We'll help you find yours." },
      { n:'05', t:'BE A HUMAN', b:'Answering emails like a person is somehow a competitive advantage now.' },
    ];
    const steps = [
      { t:'Kickoff', d:'We dig into your brand, customers and competitors. Audit what exists. Flag what stinks.' },
      { t:'Blueprint', d:"We write a one-page strategy. Not a phonebook. If you can't read it in 5 min, we rewrote it." },
      { t:'Make', d:'Creative, ads, posts, pages — whatever the plan calls for. Weekly check-ins, not radio silence.' },
      { t:'Measure', d:'You get a dashboard, not a PDF. Real numbers, real humans explaining them.' },
    ];
    return (
      <div className="page-enter">
        <section style={{paddingTop: 160, paddingBottom: 50, background: 'var(--ink)'}}>
          <div className="wrap-wide">
            <span className="tag" style={{marginBottom: 24, display: 'inline-flex'}}>● ABOUT EMC</span>
            <Reveal>
              <h1 className="display" style={{fontSize: 'clamp(80px, 13vw, 220px)', color: '#fff', letterSpacing: '-0.02em', marginTop: 24}}>
                WE PUT THE<br/>
                <span style={{color: 'var(--acid)'}}>MARK</span> IN<br/>
                MARKETING.
              </h1>
            </Reveal>
          </div>
        </section>
        <Marquee items={['FOUNDED 2019','FAYETTEVILLE AR','SMALL TEAM · BIG MOUTH','40+ BRANDS SERVED','CERTIFIED LOUD']} />
        <section className="section section--bone">
          <div className="wrap-wide">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 72, alignItems: 'center'}}>
              <Reveal>
                <div style={{position: 'relative'}}>
                  <div style={{background: 'var(--acid)', aspectRatio: '4/5', border: '2px solid var(--ink)', position: 'relative', overflow: 'hidden'}}>
                    <Photo label="Founder — Elizabeth" aspect="4/5" variant="default" src={window.__ELIZ_PT} objectPosition="center top" style={{border: 'none'}} />
                  </div>
                  <span className="stamp" style={{position: 'absolute', bottom: -16, left: -16, background: 'var(--ink)', color: 'var(--acid)', padding: '12px 18px', fontSize: 14, transform: 'rotate(-8deg)'}}>FOUNDER / CEO</span>
                </div>
              </Reveal>
              <div>
                <div className="section__label">§ 001 — Meet Elizabeth</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(56px, 8vw, 120px)', color: 'var(--ink)'}}>
                    I'M THE E<br/>IN EMC.
                  </h2>
                </Reveal>
                <div style={{marginTop: 28, color: '#222', fontSize: 17, lineHeight: 1.65, maxWidth: 520}}>
                  <p style={{marginBottom: 18}}>I've managed social media for brands big, small, and medium-sized-but-think-they're-big. Transparency, integrity and collaboration aren't values I put on a wall — they're how I return emails.</p>
                  <p style={{marginBottom: 18}}>I aim to inspire and educate, not only my clients but also myself. The algorithm is a moving target; I like it that way.</p>
                  <p>Let's embark on this journey together, transforming online spaces into thriving ecosystems of engagement and impact. (Also: making ads you don't immediately skip.)</p>
                </div>
                <div style={{display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap'}}>
                  <button className="btn btn--ink" onClick={() => setPage('contact')}>Let's go →</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section" style={{background: 'var(--ink)'}}>
          <div className="wrap-wide">
            <div className="section__label">§ 002 — House rules</div>
            <Reveal>
              <h2 className="display" style={{fontSize: 'clamp(52px, 8vw, 120px)', color: '#fff', marginBottom: 48}}>
                THE <span style={{color: 'var(--acid)'}}>FIVE</span> RULES.
              </h2>
            </Reveal>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: '1px solid var(--acid)'}}>
              {values.map((v, i) => (
                <div key={v.n} style={{padding: '36px 22px', borderRight: i < 4 ? '1px solid var(--edge)' : 'none', minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <div>
                    <div className="mono" style={{color: 'var(--acid)', marginBottom: 20}}>{v.n}</div>
                    <div className="display" style={{fontSize: 26, color: '#fff', marginBottom: 14}}>{v.t}</div>
                  </div>
                  <p style={{fontSize: 14, lineHeight: 1.5, opacity: 0.75, color: '#fff'}}>{v.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section section--acid">
          <div className="wrap-wide">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60}}>
              <div>
                <div className="section__label">§ 003 — The process</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(56px, 8vw, 120px)'}}>
                    HOW WE<br/>ACTUALLY<br/>WORK.
                  </h2>
                </Reveal>
                <p style={{marginTop: 24, fontSize: 17, lineHeight: 1.55, maxWidth: 420}}>
                  No 80-page onboarding doc. Four steps, thirty days, then you get to decide if we keep going.
                </p>
              </div>
              <div style={{borderLeft: '2px solid var(--ink)', paddingLeft: 40}}>
                {steps.map((s, i) => (
                  <div key={i} style={{paddingBottom: 32, marginBottom: 32, borderBottom: i < 3 ? '1px dashed rgba(0,0,0,0.2)' : 'none'}}>
                    <div style={{display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8}}>
                      <div className="display" style={{fontSize: 60, color: 'rgba(0,0,0,0.25)'}}>0{i+1}</div>
                      <div className="display" style={{fontSize: 32}}>{s.t}</div>
                    </div>
                    <p style={{fontSize: 15, lineHeight: 1.55, maxWidth: 500}}>{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Marquee variant="marquee--dark" items={['WORK WITH EMC','BOOK A CHAT','GET LOUD','STAY LOUDER']} />
      </div>
    );
  }

  function ServicesPage({ setPage }) {
    const services = [
      { n:'01', t:'SOCIAL MEDIA', body:'Strategy, content, community. We run your channels like a newsroom — consistent, creative.', includes:['Content strategy','Monthly calendar','Daily engagement','Reels / TikToks','Analytics'] },
      { n:'02', t:'PAID MEDIA', body:'Google, Meta, YouTube, TikTok ads. Tight targeting, creative testing, honest reporting. No agency math.', includes:['Campaign architecture','Creative production','Pixel / GA4 setup','Weekly reports'] },
      { n:'03', t:'BRAND IDENTITY', body:'Logo, colors, type, voice, guidelines. Full identity systems built to be loud in a feed and sharp in a deck.', includes:['Discovery + moodboard','Logo system','Typography + color','Guidelines PDF','Launch assets'] },
      { n:'04', t:'WEBSITE DESIGN', body:'Landing pages or full sites. Designed to convert, coded to load fast, CMS-ready so you can actually update them.', includes:['UX wireframes','Visual design','Webflow / Shopify build','CMS setup','SEO foundation'] },
      { n:'05', t:'CONTENT PRODUCTION', body:'Photography, video, copy — in one production day per month. Six months of content in twelve hours.', includes:['Shot list planning','Full production day','Edit + retouching','Copy + captions','Asset delivery'] },
      { n:'06', t:'CONSULTATION', body:'Not every fix needs an agency. Audits, second opinions, strategy on tap. Available as a monthly retainer or a one-off session.', includes:['Monthly advisory retainer','One-off strategy session','Marketing + brand audit','Campaign + creative review','Channel + content strategy'] },
    ];
    return (
      <div className="page-enter">
        <section style={{paddingTop: 160, paddingBottom: 50, background: 'var(--ink)'}}>
          <div className="wrap-wide">
            <span className="tag" style={{marginBottom: 24, display: 'inline-flex'}}>● CAPABILITIES</span>
            <Reveal>
              <h1 className="display" style={{fontSize: 'clamp(80px, 13vw, 220px)', color: '#fff', marginTop: 24}}>
                SIX WAYS TO<br/>
                <span style={{color: 'var(--acid)'}}>GET LOUD.</span>
              </h1>
            </Reveal>
            <Reveal>
              <p style={{maxWidth: 620, marginTop: 28, fontSize: 18, opacity: 0.85, color: '#fff'}}>
                Pick one, bundle a few, or hand us the whole thing. Retainer, project, or fractional — we shape the scope around the actual problem, not the other way around.
              </p>
            </Reveal>
          </div>
        </section>
        <Marquee variant="marquee--bone" items={['STRATEGY','SOCIAL','PAID ADS','BRAND','WEB','CONTENT','CMO']} />
        <section className="section" style={{background: 'var(--ink)', padding: '60px 0'}}>
          <div className="wrap-wide">
            {services.map((s, i) => (
              <div key={s.n} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr 1.4fr 1fr', gap: 32,
                padding: '44px 0', borderTop: '1.5px solid var(--acid)',
                borderBottom: i === services.length - 1 ? '1.5px solid var(--acid)' : 'none',
                alignItems: 'flex-start', cursor: 'pointer', transition: 'background .25s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(184,255,0,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div className="display" style={{fontSize: 44, color: 'var(--acid)'}}>{s.n}</div>
                <div>
                  <div className="display" style={{fontSize: 44, lineHeight: 0.92, color: '#fff'}}>{s.t}</div>
                </div>
                <p style={{fontSize: 15, lineHeight: 1.55, opacity: 0.85, color: '#fff'}}>{s.body}</p>
                <div>
                  <div className="mono" style={{opacity: 0.55, marginBottom: 10, color: '#fff'}}>Includes</div>
                  <ul style={{listStyle: 'none', padding: 0, fontSize: 14, lineHeight: 1.8, color: '#fff'}}>
                    {s.includes.map(item => <li key={item} style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{color: 'var(--acid)'}}>→</span>{item}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="section section--bone">
          <div className="wrap-wide">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 80}}>
              <div>
                <div className="section__label">§ ADD-ON</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(52px, 7vw, 110px)', color: 'var(--ink)'}}>
                    COMPETITOR<br/>RESEARCH.
                  </h2>
                </Reveal>
                <p style={{marginTop: 18, color: '#222', fontSize: 16, lineHeight: 1.55, maxWidth: 460}}>
                  Digging deep into your competitors' strategies to reveal hidden opportunities, so your brand can stand out, rise above, and claim its rightful place.
                </p>
              </div>
              <Photo label="Competitor research" aspect="4/3" variant="bone" video="uploads/services-competitor-research.mp4" />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center'}}>
              <Photo label="Cutthroat analysis" aspect="4/3" variant="bone" video="uploads/services-cutthroat-analysis.mp4" />
              <div>
                <div className="section__label">§ ADD-ON</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(52px, 7vw, 110px)', color: 'var(--ink)'}}>
                    CUTTHROAT<br/>ANALYSIS.
                  </h2>
                </Reveal>
                <p style={{marginTop: 18, color: '#222', fontSize: 16, lineHeight: 1.55, maxWidth: 460}}>
                  Dive deep into your social media data, tracking KPIs, ROAS and ROI to uncover key insights. This sharpens your strategy and gives you the competitive edge to dominate your industry. Organically and paid.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section section--acid" style={{padding: '100px 0'}}>
          <div className="wrap-wide" style={{textAlign: 'center'}}>
            <Reveal>
              <h2 className="display" style={{fontSize: 'clamp(72px, 12vw, 200px)'}}>
                PICK YOUR<br/>WEAPON.
              </h2>
            </Reveal>
            <div style={{display: 'flex', gap: 14, marginTop: 32, justifyContent: 'center', flexWrap: 'wrap'}}>
              <a className="btn btn--ink" href={LINKS.calendly} {...EXT}>Book a scoping call →</a>
              <button className="btn btn--outline-ink">Download rate card</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  function ContactPage() {
    const [form, setForm] = useState({ name:'', company:'', email:'', budget:'', need:'', message:'' });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
    const submit = async (e) => {
      e.preventDefault();
      setSending(true); setError('');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: '309e7432-ebb3-4ba7-a520-60d67e823040',
            subject: 'New inquiry from emcmarketing.co',
            from_name: 'EMC Marketing website',
            name: form.name,
            company: form.company,
            email: form.email,
            need: form.need,
            budget: form.budget,
            message: form.message,
          }),
        });
        const data = await res.json();
        if (data.success) { setSent(true); }
        else { setError(data.message || 'Something went wrong. Please try again or email info@emcmarketing.co.'); }
      } catch (err) {
        setError('Network error. Please try again or email info@emcmarketing.co.');
      } finally {
        setSending(false);
      }
    };
    return (
      <div className="page-enter">
        <section style={{paddingTop: 160, paddingBottom: 60, background: 'var(--ink)'}}>
          <div className="wrap-wide">
            <span className="tag" style={{marginBottom: 24, display: 'inline-flex'}}>● KEEP IN TOUCH</span>
            <Reveal>
              <h1 className="display" style={{fontSize: 'clamp(90px, 14vw, 260px)', color: '#fff', marginTop: 24}}>
                NEED MY<br/>
                <span style={{color: 'var(--acid)'}}>POWER?</span>
              </h1>
            </Reveal>
            <Reveal>
              <p style={{marginTop: 24, fontSize: 20, maxWidth: 620, opacity: 0.85, color: '#fff'}}>
                Contact me and let's schedule a chat today. Replies inside 24 hours — probably less, unless you email on a weekend.
              </p>
            </Reveal>
          </div>
        </section>
        <Marquee items={['BOOK A MEETING','HOLLER','LET\'S CHAT','479-445-3632','INFO@EMCMARKETING.CO']} />
        <section className="section" style={{background: 'var(--ink)', padding: '70px 0'}}>
          <div className="wrap-wide">
            <div style={{display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 60, alignItems: 'flex-start'}}>
              <div style={{background: 'var(--ink-2)', padding: 36, border: '1.5px solid var(--edge)'}}>
                <div className="section__label">§ 01 — Send a note</div>
                <h2 className="display" style={{fontSize: 44, marginBottom: 28, color: '#fff'}}>
                  TELL US <span style={{color: 'var(--acid)'}}>EVERYTHING.</span>
                </h2>
                {sent ? (
                  <div style={{padding: 40, border: '1.5px dashed var(--acid)', textAlign: 'center'}}>
                    <div className="display" style={{fontSize: 72, color: 'var(--acid)'}}>✓</div>
                    <div className="display" style={{fontSize: 32, marginTop: 10, color: '#fff'}}>GOT IT.</div>
                    <p style={{marginTop: 12, opacity: 0.8, color: '#fff'}}>We'll reply inside 24 hours. Probably faster.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{display: 'grid', gap: 18}}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
                      <div className="field"><div className="field__label">Your name</div><input value={form.name} onChange={set('name')} /></div>
                      <div className="field"><div className="field__label">Company</div><input value={form.company} onChange={set('company')} /></div>
                    </div>
                    <div className="field"><div className="field__label">Email *</div><input type="email" required value={form.email} onChange={set('email')} /></div>
                    <div>
                      <div className="field__label">What do you need?</div>
                      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8}}>
                        {['Social','Paid Ads','Brand','Website','Content','CMO','Consultation','Not Sure Yet'].map(n => (
                          <button type="button" key={n} className={`chip ${form.need===n?'active':''}`} onClick={() => setForm(p=>({...p, need:n}))}>{n}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="field__label">Rough budget</div>
                      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8}}>
                        {['< $5k','$5–15k','$15–50k','$50k+','ongoing retainer'].map(n => (
                          <button type="button" key={n} className={`chip ${form.budget===n?'active':''}`} onClick={() => setForm(p=>({...p, budget:n}))}>{n}</button>
                        ))}
                      </div>
                    </div>
                    <div className="field">
                      <div className="field__label">The story so far</div>
                      <textarea rows="5" value={form.message} onChange={set('message')} placeholder="What's broken, what's working, what you'd like to happen in 90 days." style={{padding: '12px 0', borderBottom: '1.5px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 15, border: 0, borderBottom: '1.5px solid rgba(255,255,255,0.3)', resize: 'vertical', width: '100%', outline: 'none'}} />
                    </div>
                    <button className="btn btn--acid" style={{alignSelf: 'flex-start'}} disabled={sending}>{sending ? 'Sending…' : 'Send it →'}</button>
                    {error && (
                      <div style={{color: '#ff5a5a', fontSize: 14, fontFamily: 'var(--font-body)'}}>{error}</div>
                    )}
                  </form>
                )}
              </div>
              <div>
                <div className="section__label">§ 02 — Or the old ways</div>
                <div style={{display: 'grid', gap: 14, marginTop: 8}}>
                  {[
                    { l:'Email', v:'info@emcmarketing.co', h:'mailto:info@emcmarketing.co' },
                    { l:'Phone', v:'479-445-3632', h:'tel:4794453632' },
                    { l:'HQ', v:'Fayetteville, AR' },
                    { l:'Hours', v:'Mon–Fri · 9 to 6 CT' },
                  ].map(r => (
                    <a key={r.l} href={r.h} style={{display: 'grid', gridTemplateColumns: '90px 1fr', gap: 20, alignItems: 'baseline', padding: '14px 0', borderBottom: '1px dashed rgba(255,255,255,0.15)', color: '#fff'}}>
                      <div className="mono" style={{opacity: 0.55}}>{r.l}</div>
                      <div style={{fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.01em'}}>{r.v}</div>
                    </a>
                  ))}
                </div>
                <div style={{marginTop: 32, padding: 26, background: 'var(--acid)', color: 'var(--ink)'}}>
                  <div className="display" style={{fontSize: 28, marginBottom: 8}}>LIKE A CALL BETTER?</div>
                  <p style={{fontSize: 14, marginBottom: 18}}>Skip the email dance. Pick a 20-min slot and we'll get to it.</p>
                  <a className="btn btn--ink" href={LINKS.calendly} {...EXT}>Book a meeting →</a>
                </div>
                <div style={{marginTop: 28}}>
                  <div className="mono" style={{opacity: 0.55, marginBottom: 10, color: '#fff'}}>Follow along</div>
                  <div style={{display: 'flex', gap: 12}}>
                    {SOCIAL.map(s => (
                      <a key={s.code} href={s.url} {...EXT} aria-label={s.label} style={{width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer', color: '#fff'}}>{s.code}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section--acid" style={{color: 'var(--ink)', padding: '50px 0'}}>
          <div className="wrap-wide" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20}}>
            <div className="display" style={{fontSize: 'clamp(36px, 5vw, 72px)'}}>DON'T BE A STRANGER.</div>
            <Xrow n={4} lit={4} size={56} color="rgba(0,0,0,0.25)" />
          </div>
        </section>
      </div>
    );
  }

  // ====== Performance helpers ======
  function CountUp({ to, duration = 1800, format }) {
    const [val, setVal] = React.useState(0);
    const [triggered, setTriggered] = React.useState(false);
    const ref = React.useRef();
    React.useEffect(() => {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setTriggered(true); obs.disconnect(); }
      }, { threshold: 0.4 });
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, []);
    React.useEffect(() => {
      if (!triggered) return;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * to));
        if (p < 1) requestAnimationFrame(tick);
        else setVal(to);
      };
      requestAnimationFrame(tick);
    }, [triggered, to, duration]);
    const display = format ? format(val) : val.toLocaleString();
    return <span ref={ref}>{display}</span>;
  }

  function PerfBar({ label, display, pct, note }) {
    const [inView, setInView] = React.useState(false);
    const ref = React.useRef();
    React.useEffect(() => {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setInView(true); obs.disconnect(); }
      }, { threshold: 0.2 });
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, []);
    return (
      <div ref={ref} style={{marginBottom: 32}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10}}>
          <span className="mono" style={{opacity: 0.45, fontSize: 10, color: '#fff'}}>{label}</span>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 10}}>
            <span className="display" style={{fontSize: 32, color: '#fff', lineHeight: 1}}>{display}</span>
            {note && <span className="mono" style={{color: 'var(--acid)', fontSize: 10}}>{note}</span>}
          </div>
        </div>
        <div style={{height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2}}>
          <div style={{
            height: '100%', background: 'var(--acid)', borderRadius: 2,
            width: inView ? `${pct}%` : '0%',
            transition: 'width 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }} />
        </div>
      </div>
    );
  }

  // ====== Portfolio page ======
  function PortfolioPage({ setPage }) {
    const work = [
      { n:'01', brand:'HOOKAH + RESTAURANT & BAR', scope:'Social Media Strategy · Paid Advertisements', note:'Creative showcase — scroll-stopping reels and community-first growth.' },
      { n:'02', brand:'HOGBOX',                     scope:'Social Media · Guerrilla Marketing · Print',  note:'Featured in Arkansas Living Magazine (May 2023).', link:'https://arkansaslivingmagazine.com/wp-content/uploads/Ark-Living-MAY-2023-WEB-1.pdf', linkLabel:'Arkansas Living Magazine →' },
      { n:'03', brand:'MULTI-MILLION DOLLAR FURNITURE CO.', scope:'Social Media · Paid Advertisements', note:'Local market dominance — organic reach paired with tight paid funnels.' },
      { n:'04', brand:'LOCAL MEDICAL SPA',          scope:'Social Media · Paid Advertisements',          note:'Booking-driven creative and lead-gen funnels that fill the calendar.' },
      { n:'05', brand:'ROOFING & CONSTRUCTION CO.', scope:'Social Media · Paid Advertisements',          note:'Lead volume engineered for seasonality — geo-targeted, tracked to revenue.' },
    ];
    return (
      <div className="page-enter">
        <section style={{paddingTop: 160, paddingBottom: 50, background: 'var(--ink)'}}>
          <div className="wrap-wide">
            <span className="tag" style={{marginBottom: 24, display: 'inline-flex'}}>● PORTFOLIO · EST. 2022</span>
            <Reveal>
              <h1 className="display" style={{fontSize: 'clamp(80px, 13vw, 220px)', color: '#fff', marginTop: 24, letterSpacing: '-0.02em'}}>
                WE DON'T JUST<br/>
                BUILD BRANDS.<br/>
                <span style={{color: 'var(--acid)'}}>WE CHANGE</span><br/>
                THE GAME.
              </h1>
            </Reveal>
            <Reveal>
              <p style={{maxWidth: 620, marginTop: 28, fontSize: 18, opacity: 0.85, color: '#fff'}}>
                Disrupt the scroll, rewrite the rules. A short stack of work we're proud of — each one built to stop thumbs and move numbers.
              </p>
            </Reveal>
            <Reveal>
              <div style={{display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap'}}>
                <a className="btn btn--acid" href={LINKS.vault} {...EXT}>Explore the Vault →</a>
                <a className="btn btn--ghost" href={LINKS.calendly} {...EXT}>Book a chat</a>
              </div>
            </Reveal>
          </div>
        </section>
        <Marquee items={['LOUD BY DESIGN','CERTIFIED LOUD®','STOP THE SCROLL','SHAKE UP THE SPACE','EST. 2022']} />
        <section className="section" style={{background: 'var(--ink)', padding: '60px 0'}}>
          <div className="wrap-wide">
            <div className="section__label">§ 001 — Featured work</div>
            <Reveal>
              <h2 className="display" style={{fontSize: 'clamp(56px, 9vw, 140px)', color: '#fff', marginBottom: 40}}>
                THE <span style={{color: 'var(--acid)'}}>CASE</span> FILES.
              </h2>
            </Reveal>
            {work.map((w, i) => (
              <div key={w.n} style={{
                display: 'grid', gridTemplateColumns: '80px 1.2fr 1fr 1.4fr', gap: 32,
                padding: '44px 0', borderTop: '1.5px solid var(--acid)',
                borderBottom: i === work.length - 1 ? '1.5px solid var(--acid)' : 'none',
                alignItems: 'flex-start',
              }}>
                <div className="display" style={{fontSize: 44, color: 'var(--acid)'}}>{w.n}</div>
                <div className="display" style={{fontSize: 32, lineHeight: 0.95, color: '#fff'}}>{w.brand}</div>
                <div className="mono" style={{opacity: 0.7, color: '#fff', lineHeight: 1.5}}>{w.scope}</div>
                <div>
                  <p style={{fontSize: 15, lineHeight: 1.55, opacity: 0.85, color: '#fff'}}>{w.note}</p>
                  {w.link && <a href={w.link} {...EXT} className="mono" style={{display: 'inline-block', marginTop: 10, color: 'var(--acid)'}}>{w.linkLabel}</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="section section--bone">
          <div className="wrap-wide">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'flex-end', marginBottom: 56}}>
              <div>
                <div className="section__label">§ 002 — Photography</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(56px, 8vw, 120px)', color: 'var(--ink)'}}>
                    EVERY FRAME<br/>
                    HAS A <span style={{color: 'var(--acid)'}}>PURPOSE.</span>
                  </h2>
                </Reveal>
              </div>
              <div style={{color: '#222', fontSize: 17, lineHeight: 1.65, maxWidth: 560}}>
                <p style={{marginBottom: 14}}>At EMC, we capture more than content — we capture feeling.</p>
                <p>High-quality photography and story-driven video that bring your brand to life with clarity, emotion, and bold creative energy. Every shot tells a story.</p>
              </div>
            </div>
            <Reveal>
              <div style={{position: 'relative'}}>
                <div style={{aspectRatio: '16/9', border: '2px solid var(--ink)', position: 'relative', overflow: 'hidden', background: 'var(--ink)'}}>
                  <video
                    src="https://storage.googleapis.com/emc-marketing-media/video/photo-portfolio.mp4"
                    autoPlay muted loop playsInline
                    preload="metadata"
                    style={{width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, display: 'block'}}
                  />
                </div>
                <span className="stamp" style={{position: 'absolute', bottom: -16, right: -16, background: 'var(--ink)', color: 'var(--acid)', padding: '12px 18px', fontSize: 14, transform: 'rotate(4deg)', whiteSpace: 'nowrap'}}>SHOT BY EMC</span>
              </div>
            </Reveal>
          </div>
        </section>
        <section className="section" style={{background: 'var(--ink)'}}>
          <div className="wrap-wide">
            <div style={{display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 60, alignItems: 'center'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12}}>
                <Reel src="https://storage.googleapis.com/emc-marketing-media/reels/reel-01.mp4" />
                <Reel src="https://storage.googleapis.com/emc-marketing-media/reels/reel-02.mp4" style={{transform: 'translateY(28px)'}} />
                <Reel src="https://storage.googleapis.com/emc-marketing-media/reels/reel-03.mp4" />
              </div>
              <div>
                <div className="section__label">§ 003 — Video production</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(56px, 8vw, 120px)', color: '#fff'}}>
                    BUILT<br/>
                    TO BE<br/>
                    <span style={{color: 'var(--acid)'}}>SHARED.</span>
                  </h2>
                </Reveal>
                <p style={{marginTop: 24, color: '#fff', fontSize: 17, lineHeight: 1.65, maxWidth: 520, opacity: 0.85}}>
                  Short-form that earns the pause. Long-form that earns the click. Crafted for feeds first, brand second, never the other way around.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section" style={{background: 'var(--ink-2)', padding: '100px 0', borderTop: '1px solid var(--edge)', borderBottom: '1px solid var(--edge)'}}>
          <div className="wrap-wide">
            <div className="section__label">§ 004 — Real campaigns, real results</div>
            <Reveal>
              <h2 className="display" style={{fontSize: 'clamp(60px, 10vw, 160px)', color: '#fff', marginBottom: 64}}>
                NUMBERS<br/><span style={{color: 'var(--acid)'}}>THAT HIT.</span>
              </h2>
            </Reveal>

            {/* Headline stat callouts */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, marginBottom: 80, background: 'var(--edge)'}}>
              {[
                { label: 'IMPRESSIONS', to: 1480000, format: (n) => n >= 1000000 ? (n / 1000000).toFixed(2).replace(/\.?0+$/, '') + 'M+' : (n / 1000).toFixed(0) + 'K' },
                { label: 'CONVERSIONS',  to: 9370,    format: (n) => n.toLocaleString() + '+' },
                { label: 'PEAK CTR',     to: 19,      format: (n) => n + '%' },
                { label: 'TOTAL CLICKS', to: 7826,    format: (n) => n.toLocaleString() + '+' },
              ].map((s, i) => (
                <div key={i} style={{background: 'var(--ink)', padding: '36px 28px'}}>
                  <div className="mono" style={{opacity: 0.45, marginBottom: 14, fontSize: 10, color: '#fff'}}>{s.label}</div>
                  <div className="display" style={{fontSize: 'clamp(32px, 3.5vw, 60px)', color: i % 2 === 1 ? 'var(--acid)' : '#fff', lineHeight: 1}}>
                    <CountUp to={s.to} duration={1800} format={s.format} />
                  </div>
                </div>
              ))}
            </div>

            {/* Channel breakdowns */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60}}>
              <div>
                <div className="mono" style={{color: 'var(--acid)', marginBottom: 36, letterSpacing: '0.2em', borderBottom: '1px solid var(--edge)', paddingBottom: 16}}>PAID SEARCH</div>
                <PerfBar label="IMPRESSIONS"        display="152K"    pct={82} note="↑ 78%"   />
                <PerfBar label="CLICKS"             display="5,338"   pct={58} note="↑ 155%"  />
                <PerfBar label="CLICK-THROUGH RATE" display="19.34%"  pct={97}                />
                <PerfBar label="CONVERSIONS"        display="9,370+"  pct={95}                />
                <PerfBar label="COST PER CONVERSION" display="$1.22"  pct={98} note="↓ 100%" />
              </div>
              <div>
                <div className="mono" style={{color: 'var(--acid)', marginBottom: 36, letterSpacing: '0.2em', borderBottom: '1px solid var(--edge)', paddingBottom: 16}}>PAID SOCIAL</div>
                <PerfBar label="IMPRESSIONS"        display="1.48M"   pct={100} note="↑ 11,792%" />
                <PerfBar label="CLICKS"             display="7,826"   pct={75}  note="↑ 78,160%" />
                <PerfBar label="AVG COST PER CLICK" display="$0.58"   pct={92}  note="↓ 55%"     />
                <PerfBar label="CTR GROWTH"         display="+450%"   pct={88}                   />
                <PerfBar label="TOTAL REACH"        display="162K+"   pct={62}                   />
              </div>
            </div>

            <p className="mono" style={{marginTop: 60, opacity: 0.3, fontSize: 10, textAlign: 'center', color: '#fff', letterSpacing: '0.2em'}}>
              REAL CAMPAIGNS · ANONYMOUS CLIENTS · NUMBERS WE DIDN'T ROUND UP
            </p>
          </div>
        </section>

        <section className="section" style={{background: 'var(--ink)'}}>
          <div className="wrap-wide">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'center'}}>
              <Reveal>
                <div style={{position: 'relative'}}>
                  <div style={{background: 'var(--acid)', aspectRatio: '4/5', border: '2px solid #fff', position: 'relative', overflow: 'hidden'}}>
                    <Photo label="Founder — Elizabeth" aspect="4/5" variant="default" src={window.__ELIZ_PT} objectPosition="center top" style={{border: 'none'}} />
                  </div>
                  <span className="stamp" style={{position: 'absolute', bottom: -16, left: -16, background: 'var(--acid)', color: 'var(--ink)', padding: '12px 18px', fontSize: 14, transform: 'rotate(-8deg)'}}>EST. 2022</span>
                </div>
              </Reveal>
              <div>
                <div className="section__label">§ 005 — How it started</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(56px, 8vw, 120px)', color: '#fff'}}>
                    THE <span style={{color: 'var(--acid)'}}>BLUEPRINT</span><br/>
                    BEFORE THE<br/>
                    BLUEPRINT.
                  </h2>
                </Reveal>
                <div style={{marginTop: 24, color: '#fff', fontSize: 17, lineHeight: 1.65, maxWidth: 560, opacity: 0.88}}>
                  <p style={{marginBottom: 16}}>It started as Elizabeth's Media Creations — a creative space for planners, graphics, and passion projects. No investors. No agency-owner dreams. Just a vision, and a need to build something real.</p>
                  <p style={{marginBottom: 16}}>Every graphic mockup, every social side gig, every late-night edit was the blueprint. EMC didn't happen by accident. It was the plan before I knew it was one.</p>
                  <p>Now? A full-service marketing agency built on bold strategy, disruptive content, and results that speak louder than likes. We don't do boring. We don't do safe. We build brands that stop the scroll and shake up the space.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section section--acid" style={{padding: '100px 0'}}>
          <div className="wrap-wide" style={{textAlign: 'center'}}>
            <Reveal>
              <h2 className="display" style={{fontSize: 'clamp(72px, 12vw, 200px)'}}>
                BEGIN YOUR<br/>STORY HERE.
              </h2>
            </Reveal>
            <div style={{display: 'flex', gap: 14, marginTop: 32, justifyContent: 'center', flexWrap: 'wrap'}}>
              <a className="btn btn--ink" href={LINKS.calendly} {...EXT}>Book a chat →</a>
              <a className="btn btn--outline-ink" href={LINKS.vault} {...EXT}>Shop the Vault</a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ====== Websites page ======
  function WebsitesPage({ setPage }) {
    const steps = [
      { t:'RESEARCH', d:"We dig into your brand, your audience, and your competitors. If you already have a site, we pull what's worth keeping and flag what isn't." },
      { t:'DESIGN',   d:"We align on the vibe — loud or refined, minimal or maximal. You tell us who you're talking to, we design accordingly." },
      { t:'DEMO',     d:"We build a working demo site. Usually same day. You see exactly what you're getting before any money moves." },
      { t:'DECIDE',   d:"Yes, we launch. No, you walk. Either way, nothing changes hands until you've seen the work. No contracts, no cancel fees." },
    ];
    const tiers = [
      {
        name: 'JUST THE BASICS',
        tagline: 'Online, looking sharp, done.',
        popular: false,
        features: [
          'Website design + deployment (upfront)',
          'Hosting (ongoing)',
          'Up to 3 website updates per month',
        ],
      },
      {
        name: 'GET FOUND',
        tagline: 'Rank. Get found. Stay found.',
        popular: true,
        features: [
          'Website design + deployment (upfront)',
          'Hosting (ongoing)',
          'Up to 5 website updates per month',
          'SEO + AIO optimization (upfront + ongoing)',
        ],
      },
      {
        name: 'GET POPULAR',
        tagline: 'The whole loud stack.',
        popular: false,
        features: [
          'Website design + deployment (upfront)',
          'Hosting (ongoing)',
          'Up to 8 website updates per month',
          'SEO + AIO optimization (upfront + ongoing)',
          'Google Business setup + integration',
          'Google Analytics integration',
        ],
      },
    ];
    const glossary = [
      { t:'SEO',              b:"Search Engine Optimization. Making sure your site actually shows up when people Google you. Keywords, page speed, site structure — the technical bits that tell Google 'this page deserves to be seen.'" },
      { t:'AIO',              b:"AI Optimization. The new SEO. Making sure ChatGPT, Perplexity, Gemini, and the other AI chatbots can find and recommend your site when someone asks them. Your customers are asking AI now — you need to be in those answers." },
      { t:'GOOGLE BUSINESS',  b:"That card that shows up with your hours, reviews, and photos when someone Googles you. We set it up, verify it, and keep it in sync with your site so nothing goes stale." },
      { t:'GOOGLE ANALYTICS', b:"Tracking hooked up so you actually know what's working — where visitors come from, what they click, what makes them call. No more guessing, no more vibes-based marketing." },
    ];
    const faq = [
      { q:'When do I start paying?', a:"Upfront is due when you say yes to the demo. Monthly kicks in 30 days after your site goes live — so the first month of hosting and updates is on us. Call it a shakedown period." },
      { q:"What if I don't like the demo?", a:"You walk. No charge, no hard feelings, no 'but we did the work already' nonsense. The demo is the audition — we don't get paid until we earn it." },
      { q:'Who owns the finished site?', a:"You do. Files, domain, logins, analytics — all yours. No vendor lock, no weird licensing. If we ever part ways, you keep everything." },
      { q:'Can I upgrade tiers later?', a:"Any time. Upgrades take effect on the next monthly cycle. Downgrades too. Life changes, sites change." },
    ];

    return (
      <div className="page-enter">
        <section style={{paddingTop: 160, paddingBottom: 50, background: 'var(--ink)'}}>
          <div className="wrap-wide">
            <span className="tag" style={{marginBottom: 24, display: 'inline-flex'}}>● WEBSITES · NO MONEY UP FRONT</span>
            <Reveal>
              <h1 className="display" style={{fontSize: 'clamp(80px, 13vw, 220px)', color: '#fff', marginTop: 24, letterSpacing: '-0.02em'}}>
                SEE IT FIRST.<br/>
                <span style={{color: 'var(--acid)'}}>PAY ONLY IF</span><br/>
                YOU LIKE IT.
              </h1>
            </Reveal>
            <Reveal>
              <p style={{maxWidth: 620, marginTop: 28, fontSize: 18, opacity: 0.85, color: '#fff'}}>
                We research, design, and launch a working demo site — usually same day. You decide if it moves forward. Money only changes hands once you say go.
              </p>
            </Reveal>
            <Reveal>
              <div style={{display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap'}}>
                <a className="btn btn--acid" href={LINKS.calendly} {...EXT}>Book a discovery call →</a>
                <button className="btn btn--ghost" onClick={() => setPage('portfolio')}>See recent work</button>
              </div>
            </Reveal>
          </div>
        </section>
        <Marquee items={['SEE IT FIRST','NO MONEY UP FRONT','FIRST MONTH FREE','SAME-DAY DEMOS','YOU OWN EVERYTHING']} />

        <section className="section section--bone">
          <div className="wrap-wide">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60}}>
              <div>
                <div className="section__label">§ 001 — How it works</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(56px, 8vw, 120px)', color: 'var(--ink)'}}>
                    FOUR STEPS.<br/>ZERO <span style={{color: 'var(--acid)'}}>CATCH.</span>
                  </h2>
                </Reveal>
                <p style={{marginTop: 24, fontSize: 17, lineHeight: 1.55, maxWidth: 420, color: '#222'}}>
                  No contracts to sign before you see what you're getting. No upfront retainer. Just a clear path from "hey, I need a site" to "holy shit, that's my site."
                </p>
              </div>
              <div style={{borderLeft: '2px solid var(--ink)', paddingLeft: 40}}>
                {steps.map((s, i) => (
                  <div key={i} style={{paddingBottom: 32, marginBottom: 32, borderBottom: i < steps.length - 1 ? '1px dashed rgba(0,0,0,0.2)' : 'none'}}>
                    <div style={{display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8}}>
                      <div className="display" style={{fontSize: 60, color: 'rgba(0,0,0,0.25)'}}>0{i+1}</div>
                      <div className="display" style={{fontSize: 32, color: 'var(--ink)'}}>{s.t}</div>
                    </div>
                    <p style={{fontSize: 15, lineHeight: 1.55, maxWidth: 500, color: '#222'}}>{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{background: 'var(--ink)', padding: '100px 0'}}>
          <div className="wrap-wide">
            <div style={{textAlign: 'center', marginBottom: 56}}>
              <div className="section__label" style={{justifyContent: 'center', display: 'inline-flex'}}>§ 002 — Pick your plan</div>
              <Reveal>
                <h2 className="display" style={{fontSize: 'clamp(60px, 10vw, 160px)', color: '#fff', marginTop: 16}}>
                  THREE TIERS.<br/><span style={{color: 'var(--acid)'}}>ZERO GUESSWORK.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'stretch'}}>
              {tiers.map((t, i) => {
                const pop = t.popular;
                return (
                  <div key={t.name} style={{
                    background: pop ? 'var(--acid)' : 'var(--ink-2)',
                    color: pop ? 'var(--ink)' : '#fff',
                    border: pop ? '2px solid var(--acid)' : '1px solid var(--edge)',
                    padding: 36,
                    display: 'flex', flexDirection: 'column',
                    position: 'relative',
                    transform: pop ? 'translateY(-12px)' : 'translateY(0)',
                  }}>
                    {pop && (
                      <span className="stamp" style={{position: 'absolute', top: -18, right: 20, background: 'var(--ink)', color: 'var(--acid)', padding: '8px 14px', fontSize: 11, transform: 'rotate(4deg)', whiteSpace: 'nowrap'}}>
                        MOST POPULAR
                      </span>
                    )}
                    <div className="mono" style={{opacity: pop ? 0.75 : 0.55, marginBottom: 8}}>Tier 0{i+1}</div>
                    <h3 className="display" style={{fontSize: 36, lineHeight: 0.95, marginBottom: 10}}>{t.name}</h3>
                    <p style={{fontSize: 14, opacity: 0.85, marginBottom: 24, lineHeight: 1.4}}>{t.tagline}</p>
                    <ul style={{listStyle: 'none', padding: 0, fontSize: 14, lineHeight: 1.55, flex: 1, marginBottom: 24}}>
                      {t.features.map(f => (
                        <li key={f} style={{display: 'flex', gap: 10, alignItems: 'flex-start', paddingBottom: 10, borderBottom: `1px ${pop ? 'solid rgba(0,0,0,0.1)' : 'dashed rgba(255,255,255,0.1)'}`, marginBottom: 10}}>
                          <span style={{color: pop ? 'var(--ink)' : 'var(--acid)', fontWeight: 'bold', flexShrink: 0}}>→</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a className={pop ? 'btn btn--ink' : 'btn btn--acid'} href={LINKS.calendly} {...EXT} style={{justifyContent: 'center'}}>
                      {pop ? 'Start here →' : 'See a demo →'}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section section--bone">
          <div className="wrap-wide">
            <div className="section__label">§ 003 — What those words mean</div>
            <Reveal>
              <h2 className="display" style={{fontSize: 'clamp(48px, 7vw, 100px)', color: 'var(--ink)', marginBottom: 48}}>
                NO JARGON.<br/>
                NO <span style={{color: 'var(--acid)'}}>GATEKEEPING.</span>
              </h2>
            </Reveal>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20}}>
              {glossary.map(g => (
                <div key={g.t} style={{padding: 28, background: '#fff', border: '1.5px solid var(--ink)'}}>
                  <div className="display" style={{fontSize: 32, color: 'var(--ink)', marginBottom: 10}}>{g.t}</div>
                  <p style={{fontSize: 15, lineHeight: 1.55, color: '#333'}}>{g.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{background: 'var(--ink)'}}>
          <div className="wrap-wide">
            <div className="section__label">§ 004 — The fine print (there isn't much)</div>
            <Reveal>
              <h2 className="display" style={{fontSize: 'clamp(60px, 9vw, 140px)', color: '#fff', marginBottom: 48}}>
                ASKED <span style={{color: 'var(--acid)'}}>+</span> ANSWERED.
              </h2>
            </Reveal>
            <div style={{borderTop: '1.5px solid var(--acid)'}}>
              {faq.map((f, i) => (
                <div key={i} style={{padding: '32px 0', borderBottom: '1.5px solid var(--acid)', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 40, alignItems: 'flex-start'}}>
                  <div className="display" style={{fontSize: 26, lineHeight: 1.15, color: '#fff'}}>{f.q}</div>
                  <p style={{fontSize: 16, lineHeight: 1.55, color: '#fff', opacity: 0.85}}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--bone" style={{padding: '110px 0'}}>
          <div className="wrap-wide" style={{textAlign: 'center'}}>
            <div className="section__label" style={{justifyContent: 'center', display: 'inline-flex'}}>§ 005 — Project intake</div>
            <Reveal>
              <h2 className="display" style={{fontSize: 'clamp(60px, 9vw, 140px)', color: 'var(--ink)', marginTop: 16}}>
                TELL US WHAT<br/>
                YOU'RE <span style={{color: 'var(--acid)'}}>BUILDING.</span>
              </h2>
            </Reveal>
            <p style={{maxWidth: 580, margin: '24px auto 0', fontSize: 17, lineHeight: 1.55, color: '#222'}}>
              Two minutes, a few questions, straight into our CRM. We'll come back with a custom demo, usually inside 24 hours.
            </p>
            <div style={{display: 'flex', gap: 14, marginTop: 36, justifyContent: 'center', flexWrap: 'wrap'}}>
              <a className="btn btn--acid" href={LINKS.inquiry} {...EXT}>Start your inquiry →</a>
            </div>
          </div>
        </section>

        <section className="section section--acid" style={{padding: '120px 0'}}>
          <div className="wrap-wide" style={{textAlign: 'center'}}>
            <Reveal>
              <h2 className="display" style={{fontSize: 'clamp(72px, 12vw, 200px)'}}>
                START WITH<br/>A <span style={{fontStyle: 'italic', display: 'inline-block', transform: 'skewX(-6deg)'}}>DEMO.</span><br/>NO CHARGE.
              </h2>
            </Reveal>
            <p style={{maxWidth: 560, margin: '28px auto 0', fontSize: 17, lineHeight: 1.55}}>
              Bring us your current site (or just a vibe). Walk away with a working demo, usually same day. Then decide.
            </p>
            <div style={{display: 'flex', gap: 14, marginTop: 40, justifyContent: 'center', flexWrap: 'wrap'}}>
              <a className="btn btn--ink" href={LINKS.calendly} {...EXT}>Book a discovery call →</a>
              <button className="btn btn--outline-ink" onClick={() => setPage('portfolio')}>See our work</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ====== Careers page ======
  function CareersPage({ setPage }) {
    const edge = [
      { n:'01', t:'GROWTH-FOCUSED',      b:'Innovative, disruptive, always hunting for the next lever.' },
      { n:'02', t:'CLARITY FIRST',        b:'Honesty and data at the core. No jargon, no smoke.' },
      { n:'03', t:'CONTENT + PAID',       b:'High-quality creative paired with paid strategy that earns.' },
      { n:'04', t:'TRAIN UP',             b:'Ongoing development — we invest in the craft.' },
      { n:'05', t:'COLLECTIVE MINDSET',   b:'Strategy-driven marketing collective. Teams, not silos.' },
      { n:'06', t:'ALWAYS EVOLVING',      b:'Ahead of the industry — the algorithm is a moving target.' },
    ];
    const roles = [
      {
        n:'01',
        t:'SALES STRATEGIST',
        tag:'Open · Part-to-Full',
        body:'Builds relationships, opens doors, and turns aligned conversations into long-term clients.',
        bullets:['Prospecting + outbound','Discovery + scoping','Pipeline hygiene','Close with care'],
      },
    ];
    const pillars = [
      { t:"CLARITY,\nHONESTY,\nDAMN-GIVING.", b:'No vague reports. No hiding behind jargon. No overpromising deliverables just to close a client.' },
      { t:'HIGH-VIBE.\nHUMAN.\nNO MASKS.',    b:"You don't shrink, shape-shift, or play corporate robot here. Real humans, real energy — because authenticity is what creates trust, connection, and a thriving atmosphere. Be you. Loud, soft, weird, bold — just be real." },
      { t:'WE WANT\nTO SEE YOU\nFLY.',        b:'Mental, physical, soul health — all of it matters. We want you at your best. In fact, we encourage it. When you thrive, everything you touch elevates.' },
    ];
    return (
      <div className="page-enter">
        <section style={{paddingTop: 160, paddingBottom: 50, background: 'var(--ink)'}}>
          <div className="wrap-wide">
            <span className="tag" style={{marginBottom: 24, display: 'inline-flex'}}>● WE'RE HIRING</span>
            <Reveal>
              <h1 className="display" style={{fontSize: 'clamp(90px, 15vw, 260px)', color: '#fff', marginTop: 24, letterSpacing: '-0.02em'}}>
                JOIN THE<br/>
                <span style={{color: 'var(--acid)'}}>EMCREW.</span>
              </h1>
            </Reveal>
            <Reveal>
              <p style={{maxWidth: 620, marginTop: 28, fontSize: 18, opacity: 0.85, color: '#fff'}}>
                A strategy-driven marketing collective built on clarity, craft, and humans who give a damn. If that reads like your people — keep scrolling.
              </p>
            </Reveal>
          </div>
        </section>
        <Marquee items={['NOW HIRING','SALES STRATEGIST','BE REAL · BE LOUD','CLARITY OVER JARGON','GROW WITH US']} />
        <section className="section section--bone">
          <div className="wrap-wide">
            <div className="section__label">§ 001 — Our identity, standards, edge</div>
            <Reveal>
              <h2 className="display" style={{fontSize: 'clamp(56px, 9vw, 140px)', color: 'var(--ink)', marginBottom: 48}}>
                HOW WE <span style={{color: 'var(--acid)'}}>SHOW UP.</span>
              </h2>
            </Reveal>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1.5px solid var(--ink)'}}>
              {edge.map((e, i) => (
                <div key={e.n} style={{
                  padding: 32,
                  borderRight: (i+1) % 3 !== 0 ? '1.5px solid var(--ink)' : 'none',
                  borderBottom: i < 3 ? '1.5px solid var(--ink)' : 'none',
                  background: 'var(--bone)', color: 'var(--ink)',
                  minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  <div>
                    <div className="mono" style={{opacity: 0.55}}>{e.n}</div>
                    <h3 className="display" style={{fontSize: 28, marginTop: 12}}>{e.t}</h3>
                  </div>
                  <p style={{marginTop: 16, fontSize: 14, lineHeight: 1.55, opacity: 0.85}}>{e.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section" style={{background: 'var(--ink)', padding: '80px 0'}}>
          <div className="wrap-wide">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 24}}>
              <div>
                <div className="section__label">§ 002 — Open positions</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(60px, 9vw, 140px)', color: '#fff'}}>
                    ROLES ON<br/>THE <span style={{color: 'var(--acid)'}}>TABLE.</span>
                  </h2>
                </Reveal>
              </div>
              <div className="mono" style={{opacity: 0.6, color: '#fff', maxWidth: 280}}>
                One application form feeds every role. Tell us who you are — we'll figure out where you fit.
              </div>
            </div>
            {roles.map((r, i) => (
              <div key={r.n} style={{
                display: 'grid', gridTemplateColumns: '80px 1.2fr 1.4fr 1fr', gap: 32,
                padding: '44px 0', borderTop: '1.5px solid var(--acid)',
                borderBottom: i === roles.length - 1 ? '1.5px solid var(--acid)' : 'none',
                alignItems: 'flex-start',
              }}>
                <div className="display" style={{fontSize: 44, color: 'var(--acid)'}}>{r.n}</div>
                <div>
                  <div className="display" style={{fontSize: 44, lineHeight: 0.92, color: '#fff'}}>{r.t}</div>
                  <div className="mono" style={{marginTop: 10, opacity: 0.6, color: '#fff'}}>{r.tag}</div>
                </div>
                <p style={{fontSize: 15, lineHeight: 1.55, opacity: 0.85, color: '#fff'}}>{r.body}</p>
                <div>
                  <div className="mono" style={{opacity: 0.55, marginBottom: 10, color: '#fff'}}>You'll do</div>
                  <ul style={{listStyle: 'none', padding: 0, fontSize: 14, lineHeight: 1.8, color: '#fff', marginBottom: 20}}>
                    {r.bullets.map(b => <li key={b} style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{color: 'var(--acid)'}}>→</span>{b}</li>)}
                  </ul>
                  <a className="btn btn--acid" href={LINKS.apply} {...EXT}>Apply now →</a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="section section--acid">
          <div className="wrap-wide">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24}}>
              <div>
                <div className="section__label">§ 003 — What makes us different</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(56px, 9vw, 140px)'}}>
                    COOL —<br/>WHY <span style={{fontStyle: 'italic', display: 'inline-block', transform: 'skewX(-6deg)'}}>EMC?</span>
                  </h2>
                </Reveal>
              </div>
              <Xrow n={3} lit={3} size={72} color="rgba(0,0,0,0.2)" />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, borderTop: '2px solid var(--ink)', paddingTop: 32}}>
              {pillars.map((p, i) => (
                <div key={i} style={{padding: '12px 0'}}>
                  <div className="mono" style={{marginBottom: 16}}>0{i+1}</div>
                  <h3 className="display" style={{fontSize: 36, lineHeight: 0.95, whiteSpace: 'pre-line', marginBottom: 18}}>{p.t}</h3>
                  <p style={{fontSize: 15, lineHeight: 1.6}}>{p.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Marquee variant="marquee--dark" items={['BE REAL','BE LOUD','GROW WITH US','APPLY NOW','EMCREW']} />
        <section className="section" style={{background: 'var(--ink)', padding: '100px 0'}}>
          <div className="wrap-wide">
            <div className="cta-split">
              <div>
                <div className="section__label">§ 004 — Suggestions? Questions?</div>
                <Reveal>
                  <h2 className="display" style={{fontSize: 'clamp(60px, 10vw, 160px)', color: '#fff'}}>
                    DON'T BE<br/>A <span style={{color: 'var(--acid)'}}>STRANGER.</span>
                  </h2>
                </Reveal>
                <p style={{maxWidth: 520, marginTop: 20, fontSize: 17, lineHeight: 1.55, opacity: 0.85, color: '#fff'}}>
                  Not the right role? Still want in? Say hi anyway — we keep a running bench of humans we'd hire yesterday.
                </p>
                <div style={{display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap'}}>
                  <a className="btn btn--acid" href={LINKS.apply} {...EXT}>Apply now →</a>
                  <a className="btn btn--ghost" href="mailto:info@emcmarketing.co">Email us</a>
                </div>
              </div>
              <div className="cta-split__aside" style={{textAlign: 'right'}}>
                <Xrow n={4} lit={4} size={88} color="rgba(255,255,255,0.2)" />
                <div className="mono" style={{marginTop: 24, opacity: 0.6, color: '#fff'}}>
                  Four reasons to send it.<br/>Four reasons they won't.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ====== App ======
  function App() {
    const getHashPage = () => {
      const h = (location.hash || '').replace('#', '');
      return ['home','about','services','contact','portfolio','careers','websites'].includes(h) ? h : 'home';
    };
    const [page, setPage] = useState(getHashPage);
    const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
      if (location.hash.replace('#','') !== page) history.replaceState(null, '', '#' + page);
      window.scrollTo(0, 0);
    }, [page]);

    useEffect(() => {
      const onHash = () => setPage(getHashPage());
      window.addEventListener('hashchange', onHash);
      return () => window.removeEventListener('hashchange', onHash);
    }, []);

    useEffect(() => {
      const onMsg = (e) => {
        if (e.data?.type === '__activate_edit_mode') setEditMode(true);
        if (e.data?.type === '__deactivate_edit_mode') setEditMode(false);
      };
      window.addEventListener('message', onMsg);
      window.parent?.postMessage({ type: '__edit_mode_available' }, '*');
      return () => window.removeEventListener('message', onMsg);
    }, []);

    useEffect(() => {
      const r = document.documentElement;
      if (tweaks.greenTone === 'acid') r.style.setProperty('--acid', '#B8FF00');
      else if (tweaks.greenTone === 'classic') r.style.setProperty('--acid', '#33D95C');
      else if (tweaks.greenTone === 'deep') r.style.setProperty('--acid', '#3AE374');
    }, [tweaks.greenTone]);

    const setTweak = (k, v) => {
      setTweaks(prev => {
        const next = { ...prev, [k]: v };
        window.parent?.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
        return next;
      });
    };

    const Page = { home: HomePage, about: AboutPage, services: ServicesPage, contact: ContactPage, portfolio: PortfolioPage, careers: CareersPage, websites: WebsitesPage }[page] || HomePage;

    return (
      <>
        <ScrollBar />
        <Nav page={page} setPage={setPage} />
        <main data-screen-label={page}>
          <Page variant={tweaks.heroVariant} setPage={setPage} />
        </main>
        <Footer setPage={setPage} />
        {editMode && (
          <div className="tweaks">
            <div className="tweaks__head">TWEAKS</div>
            <div className="tweaks__row">
              <label>Hero style (Home)</label>
              <div className="tweaks__opts">
                {['classic','zine','split'].map(v => (
                  <button key={v} className={tweaks.heroVariant === v ? 'active' : ''} onClick={() => setTweak('heroVariant', v)}>{v}</button>
                ))}
              </div>
            </div>
            <div className="tweaks__row">
              <label>Green tone</label>
              <div className="tweaks__opts">
                {[['acid','acid'],['classic','emc'],['deep','deep']].map(([k,l]) => (
                  <button key={k} className={tweaks.greenTone === k ? 'active' : ''} onClick={() => setTweak('greenTone', k)}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
