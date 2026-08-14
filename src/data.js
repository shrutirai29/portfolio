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
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Flask', 'CNN'],
    github: 'https://github.com/shrutirai29/khety-deploy',
    live: null,
  },
  {
    index: '02',
    name: 'MEDTrust',
    tagline: 'AI-Assisted Healthcare Platform',
    description:
      'A 50+ page multi-stakeholder healthcare prototype with Patient, Doctor and NGO portals — prescription decoding, anonymous symptom reporting, health-camp discovery, simplified government schemes and an AI-assisted voice support concept.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/shrutirai29/MEDTrust',
    live: null,
  },
  {
    index: '03',
    name: 'SkillBridge',
    tagline: 'AI Resume Analyzer',
    description:
      'Claude-powered resume scoring against job descriptions — JWT auth, personalized course recommendations, a rejection-email analyzer and a personal dashboard, built on a Flask REST API with a React + Vite frontend.',
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
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    github: 'https://github.com/shrutirai29/portfolio',
    live: null,
  },
];

export const FACTS = [
  {
    icon: '🛡️',
    title: 'Top 5% on TryHackMe',
    text: '82 rooms completed, a 46-day streak and 4 badges earned in ethical hacking.',
  },
  {
    icon: '🧮',
    title: '71 LeetCode problems',
    text: '20 Easy, 34 Medium, 17 Hard — DSA & competitive programming in Python and C++.',
  },
  {
    icon: '🎭',
    title: 'Drama club Vice President',
    text: 'VP & Treasurer of Qalavant, the drama club at Rashtriya Raksha University.',
  },
  {
    icon: '🎓',
    title: 'CGPA 8.17',
    text: 'Maintaining an 8.17 CGPA while building AI and full-stack projects.',
  },
  {
    icon: '💼',
    title: 'Infosys Springboard intern',
    text: 'Completed the virtual Software Engineering / Full-Stack learning track in 2025.',
  },
  {
    icon: '🔐',
    title: 'Security-first builder',
    text: 'Every project ships secure — JWT auth, hashed passwords, rate limiting.',
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
