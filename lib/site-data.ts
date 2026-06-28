import type { IconType } from 'react-icons';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yellow-plant-05a58a310.7.azurestaticapps.net';

export const business = {
  name: 'EMC Marketing',
  founder: 'Elizabeth',
  email: 'info@emcmarketing.co',
  phone: '479-445-3632',
  phoneHref: 'tel:+14794453632',
  location: 'Fayetteville, Arkansas',
  areaServed: ['Fayetteville', 'Northwest Arkansas', 'Arkansas', 'United States'],
  tagline: 'Marketing with a pulse.',
  bookingUrl: 'https://emcmarketingllc.hbportal.co/schedule/69ea5f23ac1f98003f0c335a',
  reviewUrl:
    'https://www.google.com/search?sca_esv=4995decb4bdc4888&rlz=1C1ONGR_enUS1214US1214&sxsrf=APpeQnteY9Dmn7Ex0Xseag0wSEQbdtJ6Xg:1782598971313&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_xgZ3WciZxW6jumclJY-1heMrVEp9Z5VFwmVsiXmtnUtIFxUdB6EHB_i1UkYWrvjYfRXtXxdABMFh_x2exrR3culyegP&q=EMC+Marketing+Reviews&sa=X&ved=2ahUKEwie3tjTuqiVAxXdnGoFHYNNFcgQ0bkNegQIPBAF&biw=1902&bih=935&dpr=1',
  vaultUrl: 'https://payhip.com/EMCmarketing',
  crewUrl: 'https://sites.google.com/elizabethsmediacreations.com/emcrew/home'
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Results', href: '/results-reviews/' },
  { label: 'Videos', href: '/videos/' },
  { label: 'Contact', href: '/contact/' }
];

export const socials: Array<{ label: string; href: string; icon: IconType }> = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100095202204919', icon: FaFacebookF },
  { label: 'Instagram', href: 'https://www.instagram.com/elizabethsmediacreations/', icon: FaInstagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/elizabethrenae/', icon: FaLinkedinIn },
  { label: 'YouTube', href: 'https://www.youtube.com/@EMCSocialClub', icon: FaYoutube }
];

export const services = [
  {
    slug: 'social-media-strategy',
    title: 'Social Media Strategy',
    hook: 'Stop posting just to prove you are alive.',
    body: 'Content planning, voice, channel direction, post concepts, and campaign ideas built around what your audience actually notices.',
    includes: ['Content calendars', 'Platform strategy', 'Voice and messaging', 'Engagement ideas']
  },
  {
    slug: 'paid-advertising',
    title: 'Paid Advertising',
    hook: 'Make the money work harder before you spend more of it.',
    body: 'Campaign structure, creative testing, targeting, landing page alignment, and reporting for ads that have a job.',
    includes: ['Meta ads', 'Creative testing', 'Campaign reporting', 'Offer alignment']
  },
  {
    slug: 'brand-identity',
    title: 'Brand Identity',
    hook: 'Look like you meant it.',
    body: 'Visual direction, campaign language, graphics, and brand systems for businesses that need to feel recognizable fast.',
    includes: ['Logo direction', 'Brand voice', 'Campaign visuals', 'Launch assets']
  },
  {
    slug: 'websites-seo-aeo',
    title: 'Websites, SEO & AEO',
    hook: 'Give search engines and humans a better answer.',
    body: 'Landing pages and websites with clean structure, local SEO, answer-friendly content, tracking, and conversion paths.',
    includes: ['Next.js websites', 'Local SEO', 'FAQ/AEO content', 'Analytics-ready CTAs']
  },
  {
    slug: 'content-production',
    title: 'Content Production',
    hook: 'Shoot the thing people can feel.',
    body: 'Photo, video, reels, content prompts, and editing direction for brands that need more than filler.',
    includes: ['Photo direction', 'Short-form video', 'Reel planning', 'Content repurposing']
  },
  {
    slug: 'consultation-audits',
    title: 'Consultation & Audits',
    hook: 'Sometimes you need a sharp second brain.',
    body: 'Marketing audits, strategy sessions, channel reviews, and practical next steps when the path feels noisy.',
    includes: ['Marketing audit', 'Website review', 'Channel diagnosis', 'Action plan']
  }
];

export const painPoints = [
  'Your content looks fine but nobody remembers it.',
  'Your ads are spending money before the offer is clear.',
  'Your website explains everything except why anyone should care.',
  'Your Google presence is technically there but quietly underused.'
];

export const processSteps = [
  { title: 'Diagnose', body: 'We find what is confusing, forgettable, or leaking attention.' },
  { title: 'Sharpen', body: 'We clean up the offer, message, visuals, and campaign path.' },
  { title: 'Launch', body: 'We put the work in market with tracking and clear calls to action.' },
  { title: 'Learn', body: 'We read the signals, adjust the creative, and keep the useful stuff moving.' }
];

export const faqs = [
  {
    q: 'What does EMC Marketing do?',
    a: 'EMC Marketing is a Fayetteville, Arkansas marketing agency offering social media strategy, paid ads, brand identity, website design, SEO, AEO, content production, Google Business support, audits, and consultation.'
  },
  {
    q: 'Does EMC Marketing work with businesses outside Fayetteville?',
    a: 'Yes. EMC is based in Fayetteville and serves Northwest Arkansas as well as brands across the United States.'
  },
  {
    q: 'Can EMC help with both creative and strategy?',
    a: 'Yes. EMC pairs practical strategy with creative direction so content, ads, websites, and calls to action point toward the same goal.'
  },
  {
    q: 'How do I start with EMC Marketing?',
    a: `Email ${business.email}, call ${business.phone}, or book a consultation through the EMC Marketing website.`
  }
];

export const reviews = [
  {
    author: 'TODO: Replace with verified Google reviewer name',
    rating: 5,
    body: 'Replace with verified Google review text.',
    verified: false,
    source: 'Google Reviews placeholder'
  },
  {
    author: 'TODO: Replace with verified Google reviewer name',
    rating: 5,
    body: 'Replace with verified Google review text.',
    verified: false,
    source: 'Google Reviews placeholder'
  },
  {
    author: 'TODO: Replace with verified Google reviewer name',
    rating: 5,
    body: 'Replace with verified Google review text.',
    verified: false,
    source: 'Google Reviews placeholder'
  }
];

export const videos = [
  {
    title: 'Photo portfolio reel',
    category: 'Behind the Scenes',
    url: 'https://storage.googleapis.com/emc-marketing-media/video/photo-portfolio.mp4',
    description: 'Real EMC media asset from the current site.'
  },
  {
    title: 'EMC reel 01',
    category: 'Tips',
    url: 'https://storage.googleapis.com/emc-marketing-media/reels/reel-01.mp4',
    description: 'Real EMC reel asset from the current site.'
  },
  {
    title: 'EMC reel 02',
    category: 'Marketing Education',
    url: 'https://storage.googleapis.com/emc-marketing-media/reels/reel-02.mp4',
    description: 'Real EMC reel asset from the current site.'
  },
  {
    title: 'EMC reel 03',
    category: 'Client Wins',
    url: 'https://storage.googleapis.com/emc-marketing-media/reels/reel-03.mp4',
    description: 'Real EMC reel asset from the current site.'
  }
];

export const videoCategories = ['All', 'Tips', 'Client Wins', 'Behind the Scenes', 'Marketing Education'];

export const ctaEvents = {
  bookConsultation: 'cta_book_consultation',
  phoneClick: 'cta_click_to_call',
  emailClick: 'cta_click_to_email',
  reviewClick: 'cta_leave_google_review',
  leadMagnet: 'cta_download_marketing_scorecard',
  chatOpen: 'chat_open',
  chatSubmit: 'chat_lead_submit',
  contactSubmit: 'contact_form_submit'
};
