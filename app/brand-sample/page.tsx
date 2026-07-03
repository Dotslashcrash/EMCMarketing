import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMC Brand Sample',
  robots: {
    index: false,
    follow: false
  }
};

function EmcLogo({ tone = 'black', arrowTone = 'accent' }: { tone?: 'black' | 'white'; arrowTone?: 'accent' | 'word' }) {
  const wordFill = tone === 'white' ? '#ffffff' : '#000000';
  const arrowFill = arrowTone === 'word' ? wordFill : '#00a0c3';
  return (
    <div className="brand-sample-logo" aria-label="EMC Marketing logo" role="img">
      <svg className="brand-sample-logo-mark" viewBox="0 0 328.58 214.08" aria-hidden="true">
        <polygon fill={wordFill} points="150.42 212.65 150.05 110.56 133.41 212.64 107.39 212.65 89.73 110.18 89.47 212.66 63.29 212.58 63.29 67.25 107.7 67.18 119.9 154.82 132.1 67.19 176.81 67.21 176.81 212.64 150.42 212.65" />
        <path fill={wordFill} d="M221.67,185.81c2.22-2.09,2.73-4.93,2.73-7.73l.04-28.19h29.55s-.1,30.84-.1,30.84c-.45,5.55-1.21,10.74-3.51,15.76-6.6,15.8-26.24,19.64-41.96,16.66-15.47-2.93-26.09-17.3-26.1-31.93l-.05-77.78c0-7.2,1.89-13.98,4.63-20.31,3.27-7.55,9.39-13.03,17.23-15.39,13.79-4.14,31.14-2.14,41.39,8.52,4.92,5.45,7.15,12.09,7.94,19.47l.13,29.39-29.09.09-.22-26.61c-.38-3.75-2.93-6.37-6.69-5.93-3.16-.24-5.63,1.98-5.96,5.1l-.65,6.04v71.8s.63,6.04.63,6.04c.24,2.3,1.84,4.25,3.51,5.03,2.09.97,4.82.77,6.56-.88Z" />
        <polygon fill={wordFill} points="56.99 151.08 29.54 151.14 29.58 184.29 60.16 184.35 60.16 212.65 0 212.63 0 67.28 58.27 67.18 58.27 95.21 29.58 95.28 29.54 123.44 56.94 123.45 56.99 151.08" />
        <path fill={arrowFill} d="M304.45,57.62l2.69-35.53-11.8-.31-21.6-.56c-3.18-.08-6.39-.48-8.49-3.13-2.96-3.72-2.99-8.89-1.05-13.21,1.38-3,4.09-5.02,7.68-4.88l56.69,2.31-3.06,55.28c-.22,3.92-2.13,6.95-5.93,8.03-3.56,1.13-7.45.87-10.83-.75-2.87-1.38-4.56-3.98-4.32-7.25Z" />
        <path fill={arrowFill} d="M270.64,86.35l2.69-34.73-20.01-.5-15.35-.46c-2.73-.08-5.44-1.26-6.94-3.53-2.81-4.26-2.54-9.6.03-13.99,1.38-1.89,3.66-3.73,6.42-3.62l57.36,2.31-3.18,55.08c-.17,2.89-.93,5.32-3.25,7-3.94,2.41-8.64,2.57-12.87.81-3.44-1.43-5.19-4.48-4.89-8.37Z" />
      </svg>
      <span className="brand-sample-logo-type" style={{ color: wordFill }}>marketing</span>
    </div>
  );
}

function BrandX() {
  return (
    <svg className="brand-sample-x" viewBox="0 0 300 300" aria-hidden="true">
      <path d="M55 34 C91 111 156 198 246 270" />
      <path d="M238 30 C183 91 118 174 48 270" />
      <path d="M74 48 L93 96 M131 135 L157 177 M197 212 L228 257" />
      <path d="M216 53 L180 93 M135 145 L104 181 M74 220 L51 257" />
    </svg>
  );
}

function TriangleStack() {
  return (
    <svg className="brand-sample-triangles" viewBox="0 0 360 260" aria-hidden="true">
      <polygon points="84 35 210 35 210 161" />
      <polygon points="137 81 263 81 263 207" />
      <polygon points="191 126 317 126 317 252" />
    </svg>
  );
}

export default function Page() {
  return (
    <section className="brand-sample-page">
      <div className="brand-sample-hero">
        <div className="brand-sample-hero-circle">
          <EmcLogo arrowTone="word" />
        </div>
      </div>

      <div className="brand-sample-logo-row">
        <div className="brand-sample-logo-tile brand-sample-logo-tile-light">
          <EmcLogo />
        </div>
        <div className="brand-sample-logo-tile brand-sample-logo-tile-dark">
          <EmcLogo tone="white" />
        </div>
      </div>

      <div className="brand-sample-system">
        <div className="brand-sample-fonts">
          <div>
            <p className="brand-sample-anton-aa">Aa</p>
            <p className="brand-sample-font-name brand-sample-font-name-anton">ANTON</p>
          </div>
          <div>
            <p className="brand-sample-montserrat-aa">Aa</p>
            <p className="brand-sample-font-name brand-sample-font-name-montserrat">Montserrat</p>
          </div>
        </div>

        <div className="brand-sample-colors">
          <div>
            <span className="brand-sample-dot brand-sample-dot-black" />
            <p>#000000</p>
          </div>
          <div>
            <span className="brand-sample-dot brand-sample-dot-accent" />
            <p>#00a0c3</p>
          </div>
          <div>
            <span className="brand-sample-dot brand-sample-dot-white" />
            <p>#ffffff</p>
          </div>
        </div>

        <h1 className="brand-sample-tagline">YOUR MARKETING SUCKS LESS NOW</h1>

        <div className="brand-sample-symbols">
          <BrandX />
          <TriangleStack />
        </div>
      </div>
    </section>
  );
}
