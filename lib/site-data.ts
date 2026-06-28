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
  scorecardUrl: 'https://emcmarketing.aweb.page/exclusive-updates-insights',
  reviewUrl:
    'https://www.google.com/search?sca_esv=4995decb4bdc4888&rlz=1C1ONGR_enUS1214US1214&sxsrf=APpeQnteY9Dmn7Ex0Xseag0wSEQbdtJ6Xg:1782598971313&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_xgZ3WciZxW6jumclJY-1heMrVEp9Z5VFwmVsiXmtnUtIFxUdB6EHB_i1UkYWrvjYfRXtXxdABMFh_x2exrR3culyegP&q=EMC+Marketing+Reviews&sa=X&ved=2ahUKEwie3tjTuqiVAxXdnGoFHYNNFcgQ0bkNegQIPBAF&biw=1902&bih=935&dpr=1',
  vaultUrl: 'https://payhip.com/EMCmarketing',
  youtubeUrl: 'https://www.youtube.com/@EMCSocialClub'
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
    author: 'Avalon Jay',
    rating: 5,
    body: "Elizabeth is a social media marketing wizard! She's very professional, knowledgeable and she gets results. She's one of the best videographers I have ever worked with. And she is very personable and easy to work with. I highly recommend her for anybody wanting their business to reach great heights of success.",
    verified: true,
    source: 'Google review provided by business owner',
    relativeTime: '8 months ago'
  },
  {
    author: 'Kaleb Walker',
    rating: 5,
    body: "Lizzie at EMC Marketing is absolutely incredible at what she does. She brings a deep level of knowledge, creativity, and strategy to social media, and it really shows in both her planning and execution. She doesn't just understand how...",
    verified: true,
    source: 'Google review excerpt provided by business owner',
    relativeTime: '2 months ago',
    excerpt: true
  },
  {
    author: 'Dayna Hume',
    rating: 5,
    body: "EMC and Elizabeth are absolutely amazing! They've completely transformed my social media with creativity and marketing expertise. No matter how wild my ideas got, they always found a way to turn them into professional, polished videos that...",
    verified: true,
    source: 'Google review excerpt provided by business owner',
    relativeTime: '5 months ago',
    excerpt: true
  },
  {
    author: 'Tyler-Justin Alan Wolfe',
    rating: 5,
    body: "If you're looking for a brand marketing expert who actually gets it, look no further. Elizabeth doesn't just do marketing - she crafts identity. She took a...",
    verified: true,
    source: 'Google review excerpt provided by business owner',
    relativeTime: '10 months ago',
    excerpt: true
  },
  {
    author: 'Alicia Hawkins',
    rating: 5,
    body: "I can't recommend EMC highly enough! She created a stunning logo and a full suite of real estate marketing materials that completely elevated my brand. Her eye for design, attention to detail, and deep understanding of the real estate...",
    verified: true,
    source: 'Google review excerpt provided by business owner',
    relativeTime: 'a year ago',
    excerpt: true
  },
  {
    author: 'Brandi Beers',
    rating: 5,
    body: "20/10 recommend! From start to finish Elizabeth taylored a plan for me. Adding in details that I hadn't even thought about!",
    verified: true,
    source: 'Google review provided by business owner',
    relativeTime: '10 months ago'
  },
  {
    author: 'nic cusey',
    rating: 5,
    body: 'Efficient, clean, concise, no BS. Very clear and communicative. Genuine and out for the best results possible.',
    verified: true,
    source: 'Google review provided by business owner',
    relativeTime: '2 months ago'
  }
];

export const videos = [
  {
    title: 'Most Brands Skip These 5 Things (Then Blame Marketing)',
    category: 'Videos',
    videoId: 'n5DwXWdWFQo',
    watchUrl: 'https://www.youtube.com/watch?v=n5DwXWdWFQo',
    embedUrl: 'https://www.youtube.com/embed/n5DwXWdWFQo',
    thumbnail: 'https://i.ytimg.com/vi/n5DwXWdWFQo/hqdefault.jpg',
    description: 'Video from the EMC Social Club YouTube channel.'
  },
  {
    title: 'What is the difference between Organic Social and Paid Social Content?',
    category: 'Videos',
    videoId: 'u09T-dhURrI',
    watchUrl: 'https://www.youtube.com/watch?v=u09T-dhURrI',
    embedUrl: 'https://www.youtube.com/embed/u09T-dhURrI',
    thumbnail: 'https://i.ytimg.com/vi/u09T-dhURrI/hqdefault.jpg',
    description: 'Video from the EMC Social Club YouTube channel.'
  },
  {
    title: 'Top 4 FREE Social Media Schedulers',
    category: 'Videos',
    videoId: 'r9Pxbuh870c',
    watchUrl: 'https://www.youtube.com/watch?v=r9Pxbuh870c',
    embedUrl: 'https://www.youtube.com/embed/r9Pxbuh870c',
    thumbnail: 'https://i.ytimg.com/vi/r9Pxbuh870c/hqdefault.jpg',
    description: 'Video from the EMC Social Club YouTube channel.'
  },
  {
    title: 'Throwing Money At Ads Won’t Fix This',
    category: 'Shorts',
    videoId: 'Xl0uYNb6PAU',
    watchUrl: 'https://www.youtube.com/shorts/Xl0uYNb6PAU',
    embedUrl: 'https://www.youtube.com/embed/Xl0uYNb6PAU',
    thumbnail: 'https://i.ytimg.com/vi/Xl0uYNb6PAU/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'Your PR Team Is Already Behind',
    category: 'Shorts',
    videoId: '6NZdZavUS6s',
    watchUrl: 'https://www.youtube.com/shorts/6NZdZavUS6s',
    embedUrl: 'https://www.youtube.com/embed/6NZdZavUS6s',
    thumbnail: 'https://i.ytimg.com/vi/6NZdZavUS6s/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'The Internet Lied About Content Creation',
    category: 'Shorts',
    videoId: '6TdoltdxVCA',
    watchUrl: 'https://www.youtube.com/shorts/6TdoltdxVCA',
    embedUrl: 'https://www.youtube.com/embed/6TdoltdxVCA',
    thumbnail: 'https://i.ytimg.com/vi/6TdoltdxVCA/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'The WORST Thing Brands Do During Crisis',
    category: 'Shorts',
    videoId: 'SMHyIjti0HI',
    watchUrl: 'https://www.youtube.com/shorts/SMHyIjti0HI',
    embedUrl: 'https://www.youtube.com/embed/SMHyIjti0HI',
    thumbnail: 'https://i.ytimg.com/vi/SMHyIjti0HI/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'Attention Means Nothing Without THIS',
    category: 'Shorts',
    videoId: 'vleqZity_WY',
    watchUrl: 'https://www.youtube.com/shorts/vleqZity_WY',
    embedUrl: 'https://www.youtube.com/embed/vleqZity_WY',
    thumbnail: 'https://i.ytimg.com/vi/vleqZity_WY/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'Your Competitors Are Making The Same Ad',
    category: 'Shorts',
    videoId: 'mimMJCJA6SI',
    watchUrl: 'https://www.youtube.com/shorts/mimMJCJA6SI',
    embedUrl: 'https://www.youtube.com/embed/mimMJCJA6SI',
    thumbnail: 'https://i.ytimg.com/vi/mimMJCJA6SI/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'Most Marketing Agencies Don’t Do THIS',
    category: 'Shorts',
    videoId: 'xOvkjo946-Y',
    watchUrl: 'https://www.youtube.com/shorts/xOvkjo946-Y',
    embedUrl: 'https://www.youtube.com/embed/xOvkjo946-Y',
    thumbnail: 'https://i.ytimg.com/vi/xOvkjo946-Y/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'Your Branding Is Costing You Customers',
    category: 'Shorts',
    videoId: 'r5j7N8Kva4g',
    watchUrl: 'https://www.youtube.com/shorts/r5j7N8Kva4g',
    embedUrl: 'https://www.youtube.com/embed/r5j7N8Kva4g',
    thumbnail: 'https://i.ytimg.com/vi/r5j7N8Kva4g/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'If You Don’t Control Your Businesses Narrative, The Internet Will',
    category: 'Shorts',
    videoId: 'jej2Zh0zPYg',
    watchUrl: 'https://www.youtube.com/shorts/jej2Zh0zPYg',
    embedUrl: 'https://www.youtube.com/embed/jej2Zh0zPYg',
    thumbnail: 'https://i.ytimg.com/vi/jej2Zh0zPYg/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'Why Your Content Isn’t Working... It’s Not What You Think',
    category: 'Shorts',
    videoId: 'W39XPWPy5kg',
    watchUrl: 'https://www.youtube.com/shorts/W39XPWPy5kg',
    embedUrl: 'https://www.youtube.com/embed/W39XPWPy5kg',
    thumbnail: 'https://i.ytimg.com/vi/W39XPWPy5kg/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'POV: Your Marketing Team Is Slightly Unhinged',
    category: 'Shorts',
    videoId: 'iBRLjPvPolI',
    watchUrl: 'https://www.youtube.com/shorts/iBRLjPvPolI',
    embedUrl: 'https://www.youtube.com/embed/iBRLjPvPolI',
    thumbnail: 'https://i.ytimg.com/vi/iBRLjPvPolI/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  },
  {
    title: 'Why Your Ads Aren’t Converting',
    category: 'Shorts',
    videoId: 'WKrAVXywj1w',
    watchUrl: 'https://www.youtube.com/shorts/WKrAVXywj1w',
    embedUrl: 'https://www.youtube.com/embed/WKrAVXywj1w',
    thumbnail: 'https://i.ytimg.com/vi/WKrAVXywj1w/frame0.jpg',
    description: 'Short from the EMC Social Club YouTube channel.'
  }
];

export const videoCategories = ['Videos', 'Shorts'];

export const videoFaqs = [
  {
    q: 'Where can I watch EMC Social Club videos?',
    a: 'EMC Social Club videos and Shorts are available on YouTube at the @EMCSocialClub channel and on the EMC Marketing videos page.'
  },
  {
    q: 'What topics does EMC Social Club cover?',
    a: 'EMC Social Club covers social media strategy, paid social content, brand identity, content creation, marketing mistakes, and practical ways businesses can earn attention online.'
  },
  {
    q: 'Does EMC Marketing publish YouTube Shorts?',
    a: 'Yes. EMC Marketing publishes quick-hit YouTube Shorts through EMC Social Club alongside longer videos about marketing, branding, and content strategy.'
  },
  {
    q: 'Who creates the EMC Social Club content?',
    a: 'EMC Social Club features marketing perspective from Elizabeth and EMC Marketing, a Fayetteville, Arkansas marketing agency.'
  }
];

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
