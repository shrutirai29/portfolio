// All content is sourced from resume.pdf, the GitHub profile (github.com/shrutirai29)
// and public profiles. Nothing is invented.

export const IMG = (name) => `${import.meta.env.BASE_URL}img/${name}`;

export const CONTACT = {
  github: 'https://github.com/shrutirai29',
  linkedin: 'https://www.linkedin.com/in/shruti-rai-3b5055304',
  instagram: 'https://www.instagram.com/shruti.r8524/',
  email: '24bcscs047@student.rru.ac.in',
  leetcode: 'https://leetcode.com/u/Shruti_rai/',
  tryhackme: 'https://tryhackme.com/p/shruti.r8524',
};

export const TECH = {
  languages: ['C', 'C++', 'Java', 'Python', 'JavaScript'],
  web: ['HTML', 'CSS', 'React.js', 'Vite', 'Node.js', 'Express.js', 'Tailwind CSS'],
  backend: ['Flask', 'MongoDB', 'SQL', 'SQLAlchemy', 'REST APIs', 'JWT Auth'],
  tools: ['Git', 'GitHub', 'VS Code', 'Postman'],
  security: ['Linux', 'Networking', 'Secure Coding'],
  concepts: ['OOP', 'Data Structures & Algorithms', 'API Integration'],
};

export const PROJECTS = [
  {
    index: '01',
    name: 'Khety',
    tagline: 'Smart Agriculture Marketplace',
    role: 'Full-stack · AI',
    description:
      'A full-stack marketplace connecting farmers with fertilizer suppliers, seed vendors and cold-storage owners — role-based dashboards, AI crop-disease detection with a CNN, a fertilizer authenticity checker, voice navigation in 14+ languages and government-scheme advisory.',
    highlights: [
      'React 19 frontend with Node.js + Express 5 API and MongoDB',
      'AI crop-disease detection using a CNN',
      'Fertilizer authenticity checker',
      'Voice navigation in 14+ languages',
      'Role-based dashboards: farmer, supplier, vendor, cold-storage owner',
      'Government-scheme advisory for farmers',
    ],
    facts: [
      ['VOICE LANGUAGES', '14+'],
      ['AI MODULE', 'CNN disease detection'],
      ['BACKEND', 'Node.js + Express 5'],
      ['DATABASE', 'MongoDB'],
      ['DEPLOYED', 'Render'],
      ['AUDIENCE', 'Farmers & suppliers'],
    ],
    stackGroups: {
      Frontend: ['React', 'Tailwind CSS'],
      Backend: ['Node.js', 'Express', 'MongoDB', 'Flask'],
      AI: ['CNN', 'crop-disease detection'],
    },
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Flask', 'CNN'],
    github: 'https://github.com/shrutirai29/khety-deploy',
    live: 'https://khety-frontend-shruti.onrender.com/',
  },
  {
    index: '02',
    name: 'MEDTrust',
    tagline: 'AI-Assisted Healthcare Platform',
    role: 'UX · Prototype · Frontend',
    description:
      'A 50+ page multi-stakeholder healthcare prototype with Patient, Doctor and NGO portals — prescription decoding, anonymous symptom reporting, health-camp discovery, simplified government schemes and an AI-assisted voice support concept.',
    highlights: [
      '50+ page multi-stakeholder prototype',
      'Patient, Doctor and NGO portals',
      'Prescription decoding and anonymous symptom reporting',
      'Health-camp discovery',
      'Simplified government scheme information',
      'AI-assisted voice support concept',
    ],
    facts: [
      ['SCOPE', '50+ pages'],
      ['PORTALS', 'Patient · Doctor · NGO'],
      ['AUDIENCE', 'Healthcare access'],
      ['THEME', 'Accessibility-first'],
      ['CONCEPT', 'AI voice support'],
      ['DEPLOYED', 'GitHub Pages'],
    ],
    stackGroups: {
      Frontend: ['HTML', 'CSS', 'JavaScript'],
      Design: ['Multi-portal IA', 'Symptom flows'],
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/shrutirai29/MEDTrust',
    live: 'https://shrutirai29.github.io/MEDTrust/',
  },
  {
    index: '03',
    name: 'SkillBridge',
    tagline: 'AI Resume Analyzer',
    role: 'Full-stack · AI',
    description:
      'Claude-powered resume scoring against job descriptions — JWT auth, personalized course recommendations, a rejection-email analyzer and a personal dashboard, built on a Flask REST API with a React + Vite frontend.',
    highlights: [
      'Claude-powered resume scoring against job descriptions',
      'JWT-authenticated accounts and a personal dashboard',
      'Personalized course recommendations',
      'Rejection-email analyzer',
      'Flask REST API with SQLAlchemy',
      'React + Vite frontend',
    ],
    facts: [
      ['AI ENGINE', 'Claude API'],
      ['AUTH', 'JWT'],
      ['API', 'Flask REST + SQLAlchemy'],
      ['FRONTEND', 'React + Vite'],
      ['FEATURE', 'Rejection-email analyzer'],
      ['OUTPUT', 'Resume score vs JD'],
    ],
    stackGroups: {
      Frontend: ['React', 'Vite'],
      Backend: ['Flask', 'SQLAlchemy', 'JWT'],
      AI: ['Claude API', 'resume scoring'],
    },
    tech: ['React', 'Vite', 'Flask', 'SQLAlchemy', 'Claude API', 'JWT'],
    github: 'https://github.com/shrutirai29/analyzer',
    live: null,
  },
  {
    index: '04',
    name: 'Personal Portfolio',
    tagline: 'The classic — reborn as this journey',
    role: 'Design · Frontend',
    description:
      'A responsive HTML/CSS/JavaScript portfolio with a Formspree contact form, deployed on GitHub Pages. It is the predecessor of the cinematic experience you are scrolling through right now.',
    highlights: [
      'Responsive HTML/CSS/JavaScript single-page site',
      'Formspree-powered contact form',
      'Deployed on GitHub Pages',
      'The predecessor of this very cinematic journey',
    ],
    facts: [
      ['BUILT WITH', 'HTML · CSS · JS'],
      ['FORM', 'Formspree'],
      ['DEPLOYED', 'GitHub Pages'],
      ['EVOLVED INTO', 'This journey'],
    ],
    stackGroups: {
      Frontend: ['HTML', 'CSS', 'JavaScript'],
      Deploy: ['GitHub Pages'],
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    github: 'https://github.com/shrutirai29/portfolio',
    live: null,
  },
  {
    index: '05',
    name: 'GOA · Build Your Identity',
    tagline: 'HH Goa 2026 identity-card generator',
    role: 'Creative tech · WebGL',
    description:
      'A premium, 3D, fully client-side identity card / PFP generator for HH Goa 2026 — upload a photo, customize your builder identity, and download a crisp 1080px PNG to share with #FrameInGoa. Deep-night palette, electric-violet identity, a real-time WebGL background and a cinematic GENERATE MY ID transition.',
    highlights: [
      'Photos handled entirely in-browser — JPG / PNG / WebP / HEIC, nothing ever uploaded',
      'BUILDER ID (1080×1350) and PFP FRAME (1080×1080) in NIGHT · SUNSET · CHROME styles',
      'Drag, zoom and rotate the photo directly on the card',
      'Real-time WebGL chrome orb + sparkle particle background',
      'Character-level text reveals, magnetic buttons and a custom cursor',
      '~1s cinematic scan transition, then a 2× high-res PNG download',
    ],
    facts: [
      ['FORMATS', 'ID card · PFP frame'],
      ['STYLES', 'Night · Sunset · Chrome'],
      ['PRIVACY', '100% client-side'],
      ['VISUALS', 'WebGL chrome orb'],
      ['OUTPUT', '1080px PNG'],
      ['DEPLOYED', 'Vercel'],
    ],
    stackGroups: {
      Frontend: ['TypeScript', 'WebGL', 'Canvas'],
      Creative: ['html-to-image', 'heic2any', '3 card styles'],
    },
    tech: ['TypeScript', 'WebGL', 'html-to-image', 'heic2any'],
    github: 'https://github.com/shrutirai29/GOA',
    live: 'https://hh-goa-id-card-seven.vercel.app/',
  },
  {
    index: '06',
    name: 'FLEETRA',
    tagline: 'Smart Fleet. Smarter Moves.',
    role: 'Odoo module · Python',
    description:
      'An intelligent transport operations platform built to simplify fleet management, automate dispatch workflows and turn operational data into actionable insights — a full Odoo 19 module (Python models, views, security) over PostgreSQL, built for the Odoo Hackathon 2026.',
    highlights: [
      'Odoo 19 module — Python models, views and security rules',
      'Dispatch workflow automation for fleet operations',
      'PostgreSQL-backed operational data layer',
      'Built for the Odoo Hackathon 2026',
      'LGPL-3 licensed, structured as an installable addon',
    ],
    facts: [
      ['FRAMEWORK', 'Odoo 19'],
      ['LANGUAGE', 'Python 3'],
      ['DATABASE', 'PostgreSQL'],
      ['CATEGORY', 'Operations / Fleet'],
      ['LICENSE', 'LGPL-3'],
      ['EVENT', 'Odoo Hackathon 2026'],
    ],
    stackGroups: {
      Backend: ['Odoo 19', 'Python'],
      Data: ['PostgreSQL', 'Models · Views · Security'],
    },
    tech: ['Odoo 19', 'Python', 'PostgreSQL'],
    github: 'https://github.com/shrutirai29/FLEETRA',
    live: null,
  },
  {
    index: '07',
    name: 'TypeBlaster',
    tagline: 'Neon typing combat',
    role: 'Game · Frontend',
    description:
      'A cyberpunk-themed typing speed game with a neon arcade identity — three game modes (Classic, Endless, Time Attack), player accounts, a persistent leaderboard, achievements, streaks and a daily challenge, all rendered with a live canvas backdrop and a localStorage save layer.',
    highlights: [
      'Classic (3 lives), Endless and 60-second Time Attack modes',
      'Registered player accounts with per-player stats',
      'Persistent leaderboard, achievements, streaks and daily challenge',
      'Neon cyberpunk theme with a live canvas particle backdrop',
      'Tutorial for first-time players and an auto-start countdown',
      'Iterated through error-report and improvements pass',
    ],
    facts: [
      ['MODES', 'Classic · Endless · Time Attack'],
      ['PLAYERS', 'Accounts + stats'],
      ['META', 'Leaderboard · Achievements · Streaks'],
      ['VISUALS', 'Canvas + neon theme'],
      ['STORAGE', 'localStorage'],
      ['BUILT WITH', 'Vanilla JS'],
    ],
    stackGroups: {
      Game: ['JavaScript', 'Canvas'],
      UI: ['HTML', 'CSS', 'localStorage'],
    },
    tech: ['JavaScript', 'Canvas', 'HTML', 'CSS'],
    github: 'https://github.com/shrutirai29/typeblaster',
    live: null,
  },
  {
    index: '08',
    name: 'Shikha',
    tagline: 'Full-stack storefront',
    role: 'Full-stack · TypeScript',
    description:
      'A TypeScript full-stack commerce platform — an Express + MongoDB REST API covering products, cart, orders, payments, reviews, wishlists, coupons and an admin dashboard with analytics, fronted by a React + Vite SPA. Docker-ready backend and static-host configs for the frontend.',
    highlights: [
      'Express + MongoDB REST API with JWT auth (bcrypt)',
      'Products, cart, order, payment, coupon, review, wishlist and address modules',
      'Admin dashboard with analytics endpoints',
      'React + Vite TypeScript SPA frontend',
      'Dockerfile + Railway config for the backend, Vercel / Netlify for the frontend',
      'Vitest test suite on the backend',
    ],
    facts: [
      ['BACKEND', 'Express + MongoDB'],
      ['FRONTEND', 'React + Vite'],
      ['AUTH', 'JWT + bcrypt'],
      ['MODULES', 'Storefront + Admin'],
      ['TESTS', 'Vitest'],
      ['DEPLOY', 'Docker · Railway · Vercel'],
    ],
    stackGroups: {
      Frontend: ['React', 'Vite', 'TypeScript'],
      Backend: ['Express', 'MongoDB', 'JWT', 'bcrypt'],
      Ops: ['Docker', 'Railway', 'Vercel'],
    },
    tech: ['TypeScript', 'React', 'Express', 'MongoDB', 'JWT', 'Docker'],
    github: 'https://github.com/shrutirai29/shikha',
    live: null,
  },
  {
    index: '09',
    name: 'DSA Practice Journey',
    tagline: 'The grinding log, topic by topic',
    role: 'Practice · Python',
    description:
      'The repository where I practice and document my data-structures-and-algorithms journey — my own practice questions alongside LeetCode solutions, organized topic-wise and continuously updated as I solve more problems.',
    highlights: [
      'Own practice questions alongside LeetCode solutions',
      'Organized topic-wise (arrays, functions, patterns and more)',
      'Python 3 throughout',
      'Continuously updated alongside the LeetCode profile',
    ],
    facts: [
      ['LANGUAGE', 'Python 3'],
      ['CONTENT', 'Practice + LeetCode solutions'],
      ['FORMAT', 'Topic-wise'],
      ['STATUS', 'Continuously updated'],
      ['LINKS', 'LeetCode profile'],
    ],
    stackGroups: {
      Practice: ['Python 3', 'Data Structures', 'Algorithms'],
    },
    tech: ['Python', 'Data Structures', 'Algorithms'],
    github: 'https://github.com/shrutirai29/Data-Structure-And-Algorithm',
    live: null,
  },
];

export const FACTS_INTRO = "The résumé's footnotes — the person behind the code.";

export const FACTS = [
  {
    icon: '🎭',
    title: 'Drama club VP',
    text: "Vice President & Treasurer of Qalavant — Rashtriya Raksha University's drama & films club. Comfortable on a stage that isn't a browser tab.",
  },
  {
    icon: '🛡️',
    title: 'Top 3% on TryHackMe',
    text: '82 rooms completed, a 46-day streak and 4 badges — learning how systems break so I can build them better.',
  },
  {
    icon: '🧮',
    title: '100+ LeetCode problems',
    text: '109 solved — 40 Easy, 46 Medium, 23 Hard — DSA grind in Python and C++, between shipped projects.',
  },
  {
    icon: '🏗️',
    title: 'Builder energy',
    text: 'Healthcare, agriculture, fleet Odoo modules, typing games — nine public projects across React, Flask, Python and AI stacks, not one tutorial clone.',
  },
  {
    icon: '💼',
    title: 'Infosys Springboard',
    text: 'Virtual full-stack engineering internship, 2025 — certificates earned, industry patterns internalized.',
  },
  {
    icon: '🔐',
    title: 'Security × development',
    text: 'I care how systems are built AND how they can be secured — JWT auth, hashed passwords and safe defaults in every project.',
  },
];

export const ABOUT = {
  openToWork: 'OPEN TO WORK',
  intro:
    'Computer Science student at Rashtriya Raksha University, Gandhinagar — building real-world applications with AI and modern web technologies.',
  body: 'I enjoy backend engineering, cybersecurity and scalable systems. From AI-powered healthcare prototypes to agriculture marketplaces with CNN-based disease detection, I love turning ambitious ideas into working products — and learning the offensive side of security along the way.',
  quick: [
    ['Location', 'Gandhinagar, Gujarat, India'],
    ['Degree', 'B.Tech CSE · 2024 – 2028'],
    ['University', 'Rashtriya Raksha University'],
    ['Focus', 'Backend · AI · Security'],
  ],
};

export const IMAGES_TO_PRELOAD = [
  'mainImage.webp',
  'anime1.webp',
  'anime2.webp',
  'background.webp',
].map(IMG);
