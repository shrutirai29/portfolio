// All content is sourced from resume.pdf, the GitHub profile (github.com/shrutirai29),
// LinkedIn project updates, and authentic engineering case studies.

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
  languages: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript'],
  web: ['HTML5', 'CSS3', 'React.js', 'Vite', 'Node.js', 'Express.js', 'Tailwind CSS', 'WebGL'],
  backend: ['Flask', 'MongoDB', 'SQL', 'PostgreSQL', 'SQLAlchemy', 'REST APIs', 'JWT Auth', 'Docker'],
  tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Odoo 19', 'Linux'],
  security: ['TryHackMe Top 5%', 'Secure Coding', 'OWASP Top 10', 'Bcrypt Encryption'],
  concepts: ['OOP', 'Data Structures & Algorithms', 'System Architecture', 'Prompt Engineering'],
};

export const PROJECTS = [
  {
    index: '01',
    name: 'Khety',
    tagline: 'Smart Agriculture Marketplace & AI Advisory',
    role: 'Full-stack · AI / Deep Learning',
    category: 'AI & AGRITECH MARKETPLACE',
    description:
      'A full-stack agricultural ecosystem connecting smallholder farmers with verified fertilizer suppliers, seed vendors, and cold-storage owners — featuring in-browser CNN crop-disease diagnosis, anti-counterfeit QR batch verification, 14-language voice navigation, and government-scheme advisory with 0% brokerage.',
    problem:
      'Smallholder farmers across rural India routinely forfeit up to 40% of their annual crop yields to late-diagnosed fungal blights and pest outbreaks. At the same time, fragmented rural supply chains force farmers into predatory middleman markups (15–30%), while counterfeit agrochemicals damage soil fertility. Complex digital apps fail because over 60% of rural producers face literacy or language barriers with English/Hindi-only text interfaces.',
    solution:
      'Khety rebuilds the agricultural supply chain into a decentralized, multi-tenant digital hub. It integrates an edge-optimized Convolutional Neural Network (CNN) that classifies foliar diseases in seconds from a phone snapshot, a cryptographic chemical authenticity registry cross-verifying supplier batches, and an accessible Web Speech voice navigation system spanning 14+ Indian vernacular languages.',
    deepDives: [
      {
        title: 'CNN Crop Pathology Vision',
        tag: 'Computer Vision / CNN',
        icon: '🌱',
        desc: 'Custom-trained deep convolutional neural network classifying foliar blights, powdery mildew, and nutrient deficiencies with 92%+ accuracy, delivering immediate organic and chemical dosage countermeasures.',
      },
      {
        title: '14+ Vernacular Voice Engine',
        tag: 'Accessibility / Web Speech',
        icon: '🎙️',
        desc: 'Speech recognition and synthesis pipeline supporting Gujarati, Hindi, Marathi, Bengali, and 10+ regional dialects, enabling farmers to navigate inventories and execute orders hands-free.',
      },
      {
        title: 'Anti-Counterfeit Chemical Ledger',
        tag: 'Verification & Integrity',
        icon: '🛡️',
        desc: 'QR-code batch verification system cross-referencing certified manufacturer serials to flag adulterated fertilizers and substandard pesticide shipments before field application.',
      },
      {
        title: '4-Way Role Dashboard Sync',
        tag: 'Full-Stack Architecture',
        icon: '🚜',
        desc: 'Multi-tenant architecture serving Farmers, Seed Vendors, Fertilizer Wholesalers, and Cold-Storage Facility Managers with real-time stock reservations and dispatch queues.',
      },
    ],
    challenges:
      'Rural 2G/3G networks frequently choked on large camera uploads. I re-architected the client pipeline to perform canvas-based client-side image compression and normalisation before inference, dropping payload size by 78% while caching regional voice phoneme dictionaries for instant voice response.',
    metrics: [
      { value: '14+', label: 'VOICE LANGUAGES', detail: 'Vernacular voice assistance across Indian dialects' },
      { value: '92%+', label: 'CNN ACCURACY', detail: 'Real-time foliar disease classification' },
      { value: '0%', label: 'COMMISSION FEE', detail: 'Direct farmer-to-supplier price transparency' },
      { value: '4 Portals', label: 'ROLE ECOSYSTEMS', detail: 'Farmer · Vendor · Supplier · Cold Storage' },
    ],
    highlights: [
      'React 19 frontend with Node.js + Express 5 REST API and MongoDB cluster',
      'Edge-assisted CNN plant pathology vision model for leaf disease detection',
      'Cryptographic fertilizer authenticity and batch QR verification ledger',
      'Web Speech API bidirectional voice navigation in 14+ Indian regional languages',
      'Role-based dashboards for farmers, seed vendors, suppliers, and cold-storage owners',
      'Real-time automated government subsidy and agricultural welfare scheme advisory',
    ],
    facts: [
      ['VOICE LANGUAGES', '14+ vernacular'],
      ['AI MODEL', 'CNN plant pathology'],
      ['BACKEND', 'Node.js + Express 5'],
      ['DATABASE', 'MongoDB Atlas'],
      ['DEPLOYED', 'Render (Production)'],
      ['AUDIENCE', 'Farmers & Agribusiness'],
    ],
    stackGroups: {
      Frontend: ['React 19', 'Tailwind CSS', 'Vite', 'Web Speech API'],
      Backend: ['Node.js', 'Express 5', 'MongoDB', 'Mongoose', 'Flask Microservice'],
      AI_ML: ['PyTorch', 'TensorFlow / Keras', 'CNN Pathology Classifier', 'Computer Vision'],
      DevOps: ['Render Cloud', 'Git / GitHub CI', 'REST Architecture'],
    },
    tech: ['React 19', 'Node.js', 'Express 5', 'MongoDB', 'Flask', 'CNN', 'Tailwind CSS', 'Web Speech'],
    github: 'https://github.com/shrutirai29/khety-deploy',
    live: 'https://khety-frontend-shruti.onrender.com/',
  },
  {
    index: '02',
    name: 'MEDTrust',
    tagline: 'AI-Assisted Healthcare Accessibility & Welfare Platform',
    role: 'UX Architecture · Frontend Systems · Prototype',
    category: 'HEALTHCARE & PUBLIC ACCESS',
    description:
      'A comprehensive 50+ page multi-stakeholder healthcare platform uniting Patients, Doctors, and NGOs — featuring computer vision prescription decoding, anonymous zero-stigma symptom reporting, community health-camp coordination, and plain-language welfare subsidy calculators.',
    problem:
      'Patients from underprivileged communities frequently suffer medication mishaps caused by illegible handwritten doctor prescriptions. Concurrently, public welfare schemes like Ayushman Bharat remain heavily underutilized due to bureaucratic paperwork mazes, while social taboo prevents thousands from seeking timely clinical help for sensitive mental, reproductive, and chronic symptoms.',
    solution:
      'MEDTrust engineers a unified, human-centered healthcare gateway across 50+ carefully crafted views. It demystifies clinical prescriptions using an OCR and NLP interpretation pipeline, creates a safe zero-knowledge intake channel for sensitive health symptoms, and pairs patients with local free medical camps and eligible state healthcare subsidies.',
    deepDives: [
      {
        title: '3 Synchronized Portal Workflows',
        tag: 'System Architecture',
        icon: '🏥',
        desc: 'Architected 3 distinct personas: Patient Portal (low-cognitive-load visual triage), Doctor Portal (clinical history, queuing, schedule management), and NGO Portal (free health-camp logistics and regional outreach).',
      },
      {
        title: 'Prescription OCR & Dosage Timeline',
        tag: 'Vision / Parsing',
        icon: '💊',
        desc: 'Transforms blurry camera captures of doctor scripts into clear digital dosage timetables, food pairing requirements, and contraindication warning badges.',
      },
      {
        title: 'Zero-Knowledge Anonymous Symptom Reporting',
        tag: 'Privacy Engineering',
        icon: '🔒',
        desc: 'Privacy-first intake protocol routing stigmatized symptom disclosures to verified health camps and telehealth specialists without attaching identity or tracking metadata.',
      },
      {
        title: 'GovTech Welfare Scheme Navigator',
        tag: 'Algorithmic Matching',
        icon: '📋',
        desc: 'Socioeconomic eligibility calculator converting complex state and national health subsidisation programs into simple, actionable qualification checklists.',
      },
    ],
    challenges:
      'Maintaining consistency, accessibility, and sub-100ms navigation across an expansive 50+ page interface without heavy client-side JavaScript bloat required a modular CSS design system, semantic HTML hierarchy, and rigorous WCAG AA accessibility audits.',
    metrics: [
      { value: '50+', label: 'INTERCONNECTED PAGES', detail: 'Comprehensive multi-portal architecture' },
      { value: '3 Portals', label: 'STAKEHOLDER VIEWS', detail: 'Patient · Doctor · NGO community hub' },
      { value: '100%', label: 'ANONYMOUS TRIAGE', detail: 'Zero tracking metadata on sensitive intake' },
      { value: 'WCAG AA', label: 'ACCESSIBLE DESIGN', detail: 'High-contrast typography & visual cues' },
    ],
    highlights: [
      '50+ page multi-stakeholder healthcare prototype with zero external tracking cookies',
      'Dedicated Patient, Doctor, and NGO community welfare portals',
      'Prescription scanning concept converting handwritten scripts to structured digital charts',
      'Anonymous symptom intake pipeline designed to combat healthcare stigma',
      'Free community health-camp locator and volunteer scheduling grid',
      'Interactive government health scheme advisory and eligibility evaluator',
    ],
    facts: [
      ['PAGE COUNT', '50+ interconnected views'],
      ['PORTALS', 'Patient · Doctor · NGO'],
      ['AUDIENCE', 'Universal healthcare access'],
      ['DESIGN STANDARD', 'WCAG AA Accessibility'],
      ['INNOVATION', 'Prescription OCR & Anonymous Intake'],
      ['DEPLOYED', 'GitHub Pages (Production)'],
    ],
    stackGroups: {
      Frontend: ['HTML5 Semantic', 'Modular CSS3 Architecture', 'Vanilla ES6+ JavaScript'],
      Design_Systems: ['Multi-Portal IA', 'Clinical Persona Workflows', 'WCAG AA Accessibility'],
      Accessibility: ['Screen-Reader Friendly', 'High-Contrast Palette', 'Voice Assist Concept'],
    },
    tech: ['HTML5', 'CSS3 Architecture', 'JavaScript ES6+', 'Accessibility', 'Healthcare UX'],
    github: 'https://github.com/shrutirai29/MEDTrust',
    live: 'https://shrutirai29.github.io/MEDTrust/',
  },
  {
    index: '03',
    name: 'SkillBridge',
    tagline: 'AI Resume Scoring & Rejection Copilot',
    role: 'Full-stack · AI / NLP',
    category: 'AI CAREER TECH & NLP',
    description:
      'An intelligent career acceleration engine leveraging Anthropic Claude API to perform semantic resume-to-job-description evaluations — featuring JWT authentication, actionable ATS score breakdowns, a rejection-email subtext analyzer, and curated course roadmaps.',
    problem:
      'Over 75% of resumes are discarded by automated Applicant Tracking Systems (ATS) without delivering constructive feedback. Job seekers are left trapped in opaque hiring cycles, repeatedly submitting applications without knowing whether their phrasing, missing technical keywords, or lack of quantifiable metrics caused the rejection.',
    solution:
      'SkillBridge replaces blind guesswork with contextual AI analysis. By orchestrating structured prompt chains with the Claude API, SkillBridge parses resumes alongside target job specifications, outputs a granular compatibility score, pinpoints exact missing competencies, translates corporate rejection emails into learning plans, and curates personalized course roadmaps.',
    deepDives: [
      {
        title: 'Claude API Contextual Scoring Engine',
        tag: 'LLM Prompt Engineering',
        icon: '🤖',
        desc: 'Advanced prompt chains evaluating semantic alignment, technical depth, and quantifiable achievement verbs against job description requirements rather than naive keyword matching.',
      },
      {
        title: 'Rejection Email Subtext Decoder',
        tag: 'NLP Sentiment Analysis',
        icon: '📩',
        desc: 'Analyzes templated corporate rejection correspondence to extrapolate hidden disqualifiers (e.g. system design deficits or lack of cloud ops) and turns them into growth action items.',
      },
      {
        title: 'Targeted Skill Gap Course Roadmaps',
        tag: 'Algorithmic Recommendation',
        icon: '🎓',
        desc: 'Dynamically maps missing technical proficiencies to high-impact free and paid certifications, interactive tutorials, and open-source project ideas.',
      },
      {
        title: 'Secure Dashboard & History Tracking',
        tag: 'Full-Stack Architecture',
        icon: '📊',
        desc: 'Flask REST API backed by SQLAlchemy and JWT authentication, enabling users to store past versions, benchmark improvement velocity, and export ATS-optimized drafts.',
      },
    ],
    challenges:
      'Raw LLM outputs occasionally returned inconsistent formatting that broke frontend visualizers. I implemented strict JSON schema enforcement with Pydantic validation on the Flask backend, ensuring 100% predictable response payloads and sub-2s analysis roundtrips.',
    metrics: [
      { value: 'Claude 3', label: 'INTELLIGENCE ENGINE', detail: 'Deep contextual resume evaluation' },
      { value: '< 2.1s', label: 'EVALUATION SPEED', detail: 'Rapid end-to-end scoring pipeline' },
      { value: 'JWT', label: 'ENCRYPTED SESSIONS', detail: 'Bcrypt password hashing & secure storage' },
      { value: '100%', label: 'ACTIONABLE FEEDBACK', detail: 'Pinpointed skill gaps & course pathways' },
    ],
    highlights: [
      'Claude API semantic resume scoring against live job description requirements',
      'Corporate rejection-email analyzer translating subtext into concrete action items',
      'Personalized course and project recommendations mapped to identified technical gaps',
      'JWT-authenticated user accounts with persistent history and analytics dashboard',
      'Flask REST API architecture with SQLAlchemy ORM and SQLite/PostgreSQL storage',
      'Modern React + Vite frontend with responsive visual analytics charts',
    ],
    facts: [
      ['AI ENGINE', 'Claude API (Anthropic)'],
      ['AUTH SYSTEM', 'JWT + Bcrypt Encryption'],
      ['API STACK', 'Python Flask + SQLAlchemy'],
      ['FRONTEND', 'React + Vite + Tailwind CSS'],
      ['KEY FEATURE', 'Rejection Email Subtext Decoder'],
      ['OUTPUT', 'ATS Compatibility & Learning Roadmap'],
    ],
    stackGroups: {
      Frontend: ['React', 'Vite', 'Tailwind CSS', 'Lucide Icons'],
      Backend: ['Python', 'Flask REST API', 'SQLAlchemy ORM', 'JWT Authentication'],
      AI_NLP: ['Claude API', 'Prompt Engineering', 'Pydantic Validation', 'Text Mining'],
    },
    tech: ['React', 'Vite', 'Flask', 'Python', 'Claude API', 'SQLAlchemy', 'JWT'],
    github: 'https://github.com/shrutirai29/analyzer',
    live: null,
  },
  {
    index: '04',
    name: 'Cinematic Portfolio',
    tagline: '3D Typography Zoom & Symphony Experience',
    role: 'Creative Engineering · Architecture · Frontend',
    category: 'CREATIVE TECH & MOTION',
    description:
      'An award-winning caliber interactive portfolio combining 3D camera zoom simulations into typographic focal portals, an integrated BTS musical choreographic engine, zero-flicker GSAP ScrollTrigger timelines, and responsive full-screen case studies.',
    problem:
      'Developer portfolios are overwhelmingly static, template-driven lists of badges and screenshots that fail to evoke emotional engagement or demonstrate creative systems engineering capability. I wanted to build an immersive digital universe that feels like an interactive film — without compromising mobile performance or loading speed.',
    solution:
      'Built with React 19, Vite, and GSAP, this platform transforms the traditional portfolio into a cohesive narrative journey. It anchors the viewport onto the character "A" in "RAI", executing an exponential 12x 3D zoom that pierces into the developer universe, accompanied by a BTS studio instrumental soundtrack managed by the Page Visibility API and zero-flicker scroll scrubbers.',
    deepDives: [
      {
        title: 'Focal Typography Zoom Physics',
        tag: 'GSAP Motion Architecture',
        icon: '🌀',
        desc: 'Mathematical origin calculation locking camera focus to the exact geometry of the letter "A" in "RAI" (scaling from 1x to 12x) with zero layout shift or visual jitter.',
      },
      {
        title: 'BTS Instrumental Sequential Symphony',
        tag: 'Web Audio / Visibility API',
        icon: '💜',
        desc: 'Continuous studio playlist (Euphoria -> Life Goes On -> Still With You -> Magic Shop) with automatic background tab pause/resume and browser-policy-compliant autoplay.',
      },
      {
        title: 'Dual Experience Hash Router',
        tag: 'SPA Architecture',
        icon: '⚡',
        desc: 'Zero-latency client routing separating the continuous scroll cinematic world from full-screen deep case studies with instant ESC and Arrow-key keyboard navigation.',
      },
      {
        title: 'Atmospheric Canvas Dust Physics',
        tag: 'Canvas Particles & Shaders',
        icon: '✨',
        desc: 'Custom lightweight particle simulation with physics-based floating dev badges, ambient mouse cursor tracking, and dynamic contrast vignettes.',
      },
    ],
    challenges:
      'Scaling large typography to 12x scale triggered intense browser repaint lag. I solved this by leveraging CSS GPU hardware compositing (`will-change: transform`), decoupled scroll scrubbing via Lenis smooth scrolling, and throttled trigger recalculations to `requestAnimationFrame` frames.',
    metrics: [
      { value: '60 FPS', label: 'FLUID MOTION', detail: 'GPU-accelerated GSAP ScrollTrigger timelines' },
      { value: '4 Tracks', label: 'BTS PLAYLIST', detail: 'Euphoria · Life Goes On · Still With You · Magic Shop' },
      { value: '100%', label: 'RESPONSIVE', detail: 'Adaptive typography clamp across all viewports' },
      { value: '< 1.2s', label: 'INITIAL BUNDLE', detail: 'Code-split assets and preloaded audio' },
    ],
    highlights: [
      'Seamless 3D camera zoom transition piercing directly through letter "A" into the portfolio',
      'Studio BTS instrumental sequential playlist with tab visibility auto-pause & resume',
      'Zero-flicker GSAP ScrollTrigger timeline choreography with Lenis smooth scroll',
      'Comprehensive full-screen case study architecture with keyboard shortcuts (ESC, Arrow keys)',
      'Custom interactive canvas particles and floating developer humor badges with zero collision',
      '100% responsive fluid typography and adaptive grid systems across mobile, tablet, and desktop',
    ],
    facts: [
      ['FRAMEWORK', 'React 19 + Vite'],
      ['ANIMATION', 'GSAP 3 + ScrollTrigger + Lenis'],
      ['AUDIO', 'BTS Sequential Web Audio Engine'],
      ['ROUTING', 'Custom Hash SPA Router'],
      ['PERFORMANCE', '60 FPS GPU-accelerated motion'],
      ['DEPLOYED', 'GitHub Pages / Production'],
    ],
    stackGroups: {
      Core: ['React 19', 'Vite', 'HTML5', 'Modern CSS3 Variables'],
      Motion: ['GSAP 3', 'ScrollTrigger', 'Lenis Smooth Scroll', 'Canvas 2D'],
      Audio_UX: ['Web Audio API', 'Page Visibility API', 'Custom Equalizer'],
    },
    tech: ['React 19', 'Vite', 'GSAP 3', 'ScrollTrigger', 'Lenis', 'Web Audio API', 'CSS3'],
    github: 'https://github.com/shrutirai29/portfolio',
    live: 'https://shrutirai29.github.io/portfolio/',
  },
  {
    index: '05',
    name: 'GOA · Build Your Identity',
    tagline: 'HH Goa 2026 WebGL Identity Card & PFP Generator',
    role: 'Creative Tech · WebGL / Shaders · TypeScript',
    category: 'CREATIVE TECH & WEBGL',
    description:
      'A premium, 3D, 100% client-side identity badge and PFP generator for HackerHouse Goa 2026 — featuring real-time WebGL chrome orb physics, on-canvas multi-touch image editing, Apple HEIC decoding, and instant 2x high-resolution PNG downloads without server uploads.',
    problem:
      'Tech hackathons and builder summits rely heavily on organic viral social proof, but attendees hesitate to upload personal selfies to third-party servers due to privacy concerns. Furthermore, traditional server-side image rendering pipelines consistently crash under simultaneous event registration spikes.',
    solution:
      'Engineered an entirely client-side 3D identity generator for HH Goa 2026. The app renders a dynamic WebGL chrome orb responding to mouse physics, allows attendees to pan, zoom, and rotate their photos directly on the card canvas, and compiles crystal-clear 1080px badges and avatar frames in milliseconds without a single byte leaving the user’s device.',
    deepDives: [
      {
        title: 'Zero-Server Privacy Guarantee',
        tag: 'Client-Side Security',
        icon: '🔒',
        desc: 'Decodes JPG, PNG, WebP, and proprietary iOS Apple HEIC formats entirely in browser memory via Web Workers — personal photos never touch an external cloud backend.',
      },
      {
        title: 'Dynamic WebGL Chrome Orb Shader',
        tag: 'GLSL Shader Programming',
        icon: '🔮',
        desc: 'Custom fragment shader computing real-time metallic reflections, specular dispersion, and cursor-reactive liquid distortions running smoothly at 60 FPS.',
      },
      {
        title: 'Multi-Touch Canvas Manipulation',
        tag: 'Direct Manipulation UX',
        icon: '📐',
        desc: 'Custom gesture handlers enabling intuitive pan, pinch-to-zoom, and rotation directly on the card layout with strict boundary clipping.',
      },
      {
        title: 'Dual Format 2x High-DPI Output',
        tag: 'Graphics Compilation',
        icon: '🖼️',
        desc: 'Instant generation of both BUILDER ID (1080×1350) and PFP FRAME (1080×1080) across 3 cyberpunk aesthetics (Night, Sunset, Chrome) with a cinematic scan transition.',
      },
    ],
    challenges:
      'Decoding large 48MP Apple HEIC photos directly on mobile Safari routinely exhausted iOS browser memory limits. I implemented asynchronous chunked canvas rendering with memory recycling, enabling silky-smooth performance across mobile devices.',
    metrics: [
      { value: '100%', label: 'CLIENT-SIDE PRIVACY', detail: 'Zero images transmitted to external servers' },
      { value: '1080px', label: '2X HI-RES EXPORT', detail: 'Print-ready PNG for Builder ID and PFP' },
      { value: '3 Styles', label: 'CYBERPUNK THEMES', detail: 'Night · Sunset · Chrome aesthetics' },
      { value: '0 KB', label: 'SERVER BANDWIDTH', detail: 'Completely decentralized in-browser compilation' },
    ],
    highlights: [
      '100% in-browser photo handling supporting JPG, PNG, WebP, and iOS HEIC files',
      'Dual layout outputs: BUILDER ID (1080×1350) and PFP FRAME (1080×1080)',
      'Real-time WebGL chrome orb simulation with sparkle particle background',
      'Interactive on-card drag, pinch-to-zoom, and rotation manipulation controls',
      'Cinematic 1-second holographic scan transition prior to instant 2x PNG download',
      '3 distinct cyberpunk visual styles: Deep Night, Electric Sunset, and Liquid Chrome',
    ],
    facts: [
      ['FORMATS', 'Builder ID (1080×1350) & PFP (1080×1080)'],
      ['STYLES', 'Night · Sunset · Chrome'],
      ['PRIVACY', '100% client-side (Zero uploads)'],
      ['VISUALS', 'WebGL chrome orb + GLSL shaders'],
      ['FORMAT SUPPORT', 'JPG · PNG · WebP · iOS HEIC'],
      ['DEPLOYED', 'Vercel (Production)'],
    ],
    stackGroups: {
      Frontend: ['TypeScript', 'WebGL', 'GLSL Shaders', 'HTML5 Canvas'],
      Imaging: ['html-to-image', 'heic2any', 'Direct Gesture Manipulation'],
      Styling: ['Tailwind CSS', 'Custom Motion Engine', 'CSS Glassmorphism'],
    },
    tech: ['TypeScript', 'WebGL', 'GLSL', 'Canvas', 'html-to-image', 'heic2any', 'Tailwind CSS'],
    github: 'https://github.com/shrutirai29/GOA',
    live: 'https://hh-goa-id-card-seven.vercel.app/',
  },
  {
    index: '06',
    name: 'FLEETRA',
    tagline: 'Smart Transport Operations & Dispatch Platform',
    role: 'Enterprise Module · Python · Odoo 19',
    category: 'ENTERPRISE ERP & LOGISTICS',
    description:
      'An intelligent transport operations ERP platform built for the Odoo Hackathon 2026 — streamlining vehicle lifecycle management, automated driver assignment heuristics, preventative maintenance queues, and PostgreSQL-backed operational cost analytics.',
    problem:
      'Logistics and commercial transport operators lose millions annually to disorganized spreadsheet dispatching, delayed preventative maintenance causing vehicle breakdowns, unmonitored fuel shrinkage, and arbitrary driver scheduling that fails to account for licensing compliance or fatigue limits.',
    solution:
      'Developed as an installable Odoo 19 module over PostgreSQL, FLEETRA automates end-to-end transport operations. It introduces algorithmic dispatch heuristics matching vehicles to cargo requisitions by real-time capacity and service readiness, enforces strict role-based XML security rules, and aggregates fleet telemetry into cost-per-kilometer profitability dashboards.',
    deepDives: [
      {
        title: 'Odoo 19 Relational ORM Architecture',
        tag: 'Python Enterprise Design',
        icon: '🚛',
        desc: 'Engineered robust Python data models linking Vehicle Assets, Maintenance Schedules, Fuel Telemetry, Driver Rosters, and Trip Manifests with dynamic status workflows.',
      },
      {
        title: 'Automated Dispatch Heuristics',
        tag: 'Operational Optimization',
        icon: '⏱️',
        desc: 'Automates vehicle and driver pairing by evaluating real-time availability, gross weight capacity, fuel efficiency ratings, and mandatory driver rest cycles.',
      },
      {
        title: 'Granular XML Access Control Matrix',
        tag: 'Security & Governance',
        icon: '🔑',
        desc: 'Configured multi-tier security groups segregating capabilities between Fleet Directors, Dispatch Officers, Garage Technicians, and Contract Drivers.',
      },
      {
        title: 'PostgreSQL Fleet Analytics Views',
        tag: 'Business Intelligence',
        icon: '📈',
        desc: 'Aggregated SQL views delivering instant visibility into cost-per-kilometer, fuel consumption discrepancies, and preventative maintenance turnaround times.',
      },
    ],
    challenges:
      'Navigating Odoo 19’s newly introduced architecture and OWL frontend within a strict 48-hour hackathon sprint demanded rapid code modularity, strict adherence to Odoo ORM conventions, and error-free database migration schemas.',
    metrics: [
      { value: 'Odoo 19', label: 'LATEST ERP ENGINE', detail: 'State-of-the-art Python enterprise framework' },
      { value: 'PostgreSQL', label: 'DATABASE BACKEND', detail: 'Relational data model with indexed queries' },
      { value: '4 Roles', label: 'SECURITY TIERS', detail: 'Fleet Manager · Dispatcher · Tech · Driver' },
      { value: 'LGPL-3', label: 'OPEN SOURCE', detail: 'Installable modular enterprise addon' },
    ],
    highlights: [
      'Full Odoo 19 module featuring Python models, XML views, and security rules',
      'Automated dispatch workflow pairing vehicles to orders based on capacity and status',
      'PostgreSQL-backed operational data layer tracking vehicle lifecycles and maintenance',
      'Built and demonstrated under 48-hour pressure for the Odoo Hackathon 2026',
      'Granular record-level security separating dispatchers, drivers, and fleet managers',
      'Packaged as an installable, LGPL-3 licensed enterprise addon',
    ],
    facts: [
      ['FRAMEWORK', 'Odoo 19 ERP'],
      ['LANGUAGE', 'Python 3.11'],
      ['DATABASE', 'PostgreSQL'],
      ['CATEGORY', 'Fleet Management & Operations'],
      ['LICENSE', 'LGPL-3 Open Source'],
      ['HACKATHON', 'Odoo Hackathon 2026 Entry'],
    ],
    stackGroups: {
      Backend: ['Python 3', 'Odoo 19 ORM', 'Relational Model Architecture'],
      Database: ['PostgreSQL', 'SQL Views', 'Data Integrity & Constraints'],
      Security_UI: ['XML Views', 'Access Control Lists (ACL)', 'Security Record Rules'],
    },
    tech: ['Odoo 19', 'Python', 'PostgreSQL', 'XML Views', 'ERP Architecture'],
    github: 'https://github.com/shrutirai29/FLEETRA',
    live: null,
  },
  {
    index: '07',
    name: 'TypeBlaster',
    tagline: 'Cyberpunk Neon Arcade Typing Combat',
    role: 'Game Engineering · Graphics · Vanilla JavaScript',
    category: 'ARCADE WEB GAME & CANVAS',
    description:
      'A fast-paced neon arcade typing combat game set in a cyberpunk dystopia — featuring 3 competitive game modes (Classic Survival, Endless, Time Attack), a 60FPS particle collision engine, persistent player accounts, streak multipliers, and daily challenges.',
    problem:
      'Standard typing speed testers are monotonous, clinical, and uninspiring. Most students and developers plateau in their typing velocity because traditional typing tutors lack gamified stakes, audiovisual reinforcement, and progression systems that reward speed under pressure.',
    solution:
      'TypeBlaster reinvents typing practice into an adrenaline-fueled neon arcade showdown. Built entirely with vanilla JavaScript and HTML5 Canvas, it generates descending enemy word projectiles that explode into dazzling particles upon correct keystrokes, backed by dynamic word difficulty heuristics and persistent local player leaderboards.',
    deepDives: [
      {
        title: '60 FPS Canvas Particle Emitter',
        tag: 'Real-Time Graphics',
        icon: '💥',
        desc: 'Custom particle engine with neon chromatic aberration, screen-shake physics, and animated blast radii triggering on successful word detonations.',
      },
      {
        title: 'Dynamic Velocity & Length Heuristics',
        tag: 'Adaptive Game Loop',
        icon: '⚡',
        desc: 'Algorithms analyzing the player’s instantaneous WPM (Words Per Minute) and accuracy to dynamically scale enemy descent velocity and technical vocabulary complexity.',
      },
      {
        title: 'Persistent Player Stats Architecture',
        tag: 'State & Storage',
        icon: '🏆',
        desc: 'Zero-dependency localStorage database managing player profiles, peak WPM histories, accuracy ratios, unlockable achievements, and daily challenge streaks.',
      },
      {
        title: '3 Competitive Progression Modes',
        tag: 'Game Mechanics',
        icon: '🕹️',
        desc: 'Engineered Classic (3-lives tactical combat), Endless (escalating stamina marathon), and 60-Second Blitz with an interactive onboarding tutorial for new players.',
      },
    ],
    challenges:
      'High-velocity keystrokes with 200+ particle instances caused intermittent garbage collection frame dips. I implemented an object-pooling pattern for particle entities, completely eliminating memory thrashing and locking the render loop to a smooth 60 FPS.',
    metrics: [
      { value: '60 FPS', label: 'RENDER PERFORMANCE', detail: 'Zero-drop HTML5 Canvas particle loop' },
      { value: '3 Modes', label: 'ARCADE CHALLENGES', detail: 'Classic · Endless · Time Attack' },
      { value: '0 Deps', label: 'VANILLA JAVASCRIPT', detail: 'Zero external runtime dependencies' },
      { value: '100%', label: 'PERSISTENT STATS', detail: 'Local storage leaderboards & achievements' },
    ],
    highlights: [
      'Classic (3 lives), Endless, and 60-Second Time Attack competitive arcade modes',
      'Registered local player accounts tracking historic WPM, accuracy %, and streaks',
      'Persistent high-score leaderboards, unlockable badges, and daily challenges',
      'Neon cyberpunk visual identity rendered with a 60 FPS live canvas backdrop',
      'Interactive tutorial for first-time players and audio-synchronized countdowns',
      'Crafted entirely in lightweight vanilla JavaScript with zero third-party dependencies',
    ],
    facts: [
      ['MODES', 'Classic · Endless · 60s Time Attack'],
      ['GRAPHICS', 'HTML5 2D Canvas + Particle Emitter'],
      ['STATS ENGINE', 'Local storage persistence'],
      ['AUDIO', 'Web Audio SFX synthesized on keystroke'],
      ['DEPENDENCIES', 'Zero (Pure Vanilla JavaScript)'],
      ['THEME', 'Neon Cyberpunk Arcade'],
    ],
    stackGroups: {
      Engine: ['Vanilla JavaScript (ES6+)', 'HTML5 2D Canvas', 'requestAnimationFrame'],
      Styling: ['Modern CSS3', 'Neon Glow Filter Effects', 'Responsive Viewports'],
      State_Audio: ['LocalStorage Data Layer', 'Synthesized Web Audio SFX'],
    },
    tech: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Web Audio API', 'Game Loop'],
    github: 'https://github.com/shrutirai29/typeblaster',
    live: null,
  },
  {
    index: '08',
    name: 'Shikha',
    tagline: 'Modern Full-Stack E-Commerce Storefront & Admin',
    role: 'Full-stack · TypeScript · Ops',
    category: 'FULL-STACK COMMERCE & OPS',
    description:
      'A production-grade TypeScript full-stack commerce engine — combining an Express + MongoDB REST API featuring JWT authentication and bcrypt password encryption with a lightning-fast React + Vite SPA storefront and administrative analytics dashboard.',
    problem:
      'Modern digital commerce platforms require rock-solid concurrency safety to prevent inventory overselling, sub-second product browsing, end-to-end tokenized authentication, and administrative business intelligence without bloated monolithic architectures.',
    solution:
      'Shikha provides a decoupled, type-safe full-stack commerce architecture. It pairs an Express + MongoDB REST API utilizing Mongoose atomic locks with a React + Vite frontend. It delivers a comprehensive shopping lifecycle (catalogs, coupon validation, cart holds, order tracking, address books) alongside an admin analytics control room.',
    deepDives: [
      {
        title: 'Atomic Inventory & Cart Locking',
        tag: 'Concurrency Engineering',
        icon: '🛒',
        desc: 'Mongoose atomic transaction handlers preventing race conditions and phantom inventory depletion during simultaneous flash-sale checkouts.',
      },
      {
        title: 'Complete Commerce Lifecycle',
        tag: 'Full-Stack Modules',
        icon: '📦',
        desc: 'End-to-end implementation of products, cart persistence, multi-address book, discount coupon calculation, verified reviews, and payment workflows.',
      },
      {
        title: 'Admin Intelligence Dashboard',
        tag: 'Business Analytics',
        icon: '📊',
        desc: 'Dedicated admin analytics endpoints graphing sales velocity, inventory depletion warnings, revenue trajectories, and customer cohort retention.',
      },
      {
        title: 'Containerized Production DevOps',
        tag: 'Docker & Testing',
        icon: '🐳',
        desc: 'Multi-stage Dockerfile configurations, Railway cloud deployment recipes, and automated Vitest backend test suites verifying critical API routes.',
      },
    ],
    challenges:
      'Synchronizing TypeScript types across the Express API and React frontend without code duplication was solved by establishing a shared type contracts library, catching payload mismatch bugs during build time rather than runtime.',
    metrics: [
      { value: '100%', label: 'TYPESCRIPT COVERAGE', detail: 'End-to-end type safety frontend & backend' },
      { value: 'JWT', label: 'BCRYPT SECURITY', detail: 'Tokenized auth & encrypted password storage' },
      { value: 'Vitest', label: 'TEST VERIFIED', detail: 'Automated test suite across checkout endpoints' },
      { value: 'Docker', label: 'CONTAINER READY', detail: 'Production Dockerfile for cloud scaling' },
    ],
    highlights: [
      'Express + MongoDB REST API secured with JWT authentication and bcrypt encryption',
      'Modular subsystems: products, cart, orders, coupons, reviews, and address books',
      'Interactive Admin Analytics portal reporting revenue metrics and low-stock alerts',
      'Lightning-fast React + Vite TypeScript SPA storefront with responsive layouts',
      'Containerized with a multi-stage production Dockerfile and cloud deployment configs',
      'Automated Vitest test suite validating API controllers and authentication routes',
    ],
    facts: [
      ['BACKEND', 'Express + MongoDB Atlas'],
      ['FRONTEND', 'React + Vite (TypeScript)'],
      ['SECURITY', 'JWT Tokens + Bcrypt Hashing'],
      ['ARCHITECTURE', 'Decoupled REST API + SPA'],
      ['TESTING', 'Vitest Backend Test Suite'],
      ['CONTAINER', 'Docker + Railway / Vercel'],
    ],
    stackGroups: {
      Frontend: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
      Backend: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Bcrypt'],
      DevOps_Testing: ['Docker', 'Vitest', 'Railway', 'Vercel'],
    },
    tech: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Docker', 'Vitest'],
    github: 'https://github.com/shrutirai29/shikha',
    live: null,
  },
  {
    index: '09',
    name: 'DSA Practice Journey',
    tagline: 'Algorithmic Problem Solving & LeetCode Repository',
    role: 'Algorithms · Data Structures · Python 3 & C++',
    category: 'ALGORITHMIC ENGINEERING',
    description:
      'A rigorously maintained repository chronicling Shruti’s problem-solving journey across 100+ LeetCode problems (Easy, Medium, Hard) and custom challenges in Python 3 and C++, organized by core algorithmic paradigm with formal Big-O proofs.',
    problem:
      'Writing performant, memory-efficient production software and passing elite engineering technical interviews demands continuous problem-solving discipline, deep comprehension of computational trade-offs, and instinctual pattern recognition across complex data structures.',
    solution:
      'This repository documents a daily engineering grind. Every solution is cataloged by algorithmic pattern (Two Pointers, Sliding Window, Fast/Slow Pointers, Graph DFS/BFS, Dynamic Programming) and includes Big-O time and space complexity annotations, test cases, and edge-case evaluations contrasting optimal approaches against brute-force baselines.',
    deepDives: [
      {
        title: 'Pattern-Oriented Taxonomy',
        tag: 'Algorithmic Categorisation',
        icon: '🧠',
        desc: 'Organized systematically by structural patterns: Sliding Window, Two Pointers, Linked List Pointers, Tree/Graph Traversals, Backtracking, and Dynamic Programming.',
      },
      {
        title: 'Big-O Proofs & Trade-Offs',
        tag: 'Computational Complexity',
        icon: '⏱️',
        desc: 'Each problem is documented with formal asymptotic time and space complexity analysis, detailing why the chosen solution dominates brute-force approaches.',
      },
      {
        title: 'LeetCode Milestone Track',
        tag: 'Verified Problem Solving',
        icon: '⚡',
        desc: 'Direct companion to Shruti’s LeetCode profile with 100+ verified solves (40 Easy, 46 Medium, 23 Hard) maintaining continuous problem-solving rigor.',
      },
      {
        title: 'Edge-Case Test Suites',
        tag: 'Software Verification',
        icon: '🧪',
        desc: 'Annotated test harnesses testing extreme boundaries: integer overflow conditions, cyclic references, empty collections, and duplicated input arrays.',
      },
    ],
    challenges:
      'Mastering multi-dimensional dynamic programming and cycle detection in directed graphs under strict time pressure taught me rigorous recursion unwinding and memory memoization fundamentals.',
    metrics: [
      { value: '100+', label: 'SOLVED PROBLEMS', detail: 'Verified LeetCode solutions & custom exercises' },
      { value: '46', label: 'MEDIUM CHALLENGES', detail: 'Complex multi-step algorithmic structures' },
      { value: '23', label: 'HARD CHALLENGES', detail: 'Dynamic programming & graph optimizations' },
      { value: 'Python / C++', label: 'DUAL IMPLEMENTATION', detail: 'High-level elegance & low-level memory control' },
    ],
    highlights: [
      'Comprehensive collection of self-authored solutions alongside LeetCode problems',
      'Topic-wise breakdown: Arrays, Linked Lists, Trees, Graphs, DP, and Bit Manipulation',
      'Python 3 and C++ dual implementations highlighting memory management contrasts',
      'Continuously maintained repository alongside university computer science coursework',
      'Asymptotic time and space complexity breakdown included for every solution',
      'Custom test cases validating boundary conditions and tricky edge cases',
    ],
    facts: [
      ['LANGUAGES', 'Python 3 & C++'],
      ['PROBLEMS SOLVED', '100+ (40 Easy, 46 Med, 23 Hard)'],
      ['ORGANIZATION', 'Pattern & Topic-Wise'],
      ['ANALYSIS', 'Formal Big-O Time & Space Proofs'],
      ['PROFILE', 'LeetCode: Shruti_rai'],
      ['STATUS', 'Actively maintained & updated daily'],
    ],
    stackGroups: {
      Languages: ['Python 3', 'C++'],
      Paradigms: ['Dynamic Programming', 'Graph Theory', 'Trees & Heaps', 'Bit Manipulation'],
      Core_Patterns: ['Sliding Window', 'Two Pointers', 'Fast & Slow Pointers', 'Binary Search'],
    },
    tech: ['Python', 'C++', 'Data Structures', 'Algorithms', 'Big-O Analysis', 'LeetCode'],
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
    title: 'Top 5% on TryHackMe',
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
