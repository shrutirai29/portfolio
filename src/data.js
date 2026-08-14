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
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Flask', 'CNN'],
    github: 'https://github.com/shrutirai29/khety-deploy',
    live: 'https://khety-frontend-shruti.onrender.com/',
  },
  {
    index: '02',
    name: 'MEDTrust',
    tagline: 'AI-Assisted Healthcare Platform',
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
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/shrutirai29/MEDTrust',
    live: 'https://shrutirai29.github.io/MEDTrust/',
  },
  {
    index: '03',
    name: 'SkillBridge',
    tagline: 'AI Resume Analyzer',
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
    tech: ['React', 'Vite', 'Flask', 'SQLAlchemy', 'Claude API', 'JWT'],
    github: 'https://github.com/shrutirai29/analyzer',
    live: null,
  },
  {
    index: '04',
    name: 'Personal Portfolio',
    tagline: 'The classic — reborn as this journey',
    description:
      'A responsive HTML/CSS/JavaScript portfolio with a Formspree contact form, deployed on GitHub Pages. It is the predecessor of the cinematic experience you are scrolling through right now.',
    highlights: [
      'Responsive HTML/CSS/JavaScript single-page site',
      'Formspree-powered contact form',
      'Deployed on GitHub Pages',
      'The predecessor of this very cinematic journey',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    github: 'https://github.com/shrutirai29/portfolio',
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
    title: 'Top 5% on TryHackMe',
    text: '82 rooms completed, a 46-day streak and 4 badges — learning how systems break so I can build them better.',
  },
  {
    icon: '🧮',
    title: '71 LeetCode problems',
    text: '20 Easy, 34 Medium, 17 Hard — DSA grind in Python and C++, between shipped projects.',
  },
  {
    icon: '🏗️',
    title: 'Builder energy',
    text: 'Healthcare, agriculture, AI analyzers — four shipped projects across React, Flask and AI stacks, not one tutorial clone.',
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
