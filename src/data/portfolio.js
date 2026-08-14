export const hero = {
  name: 'Sagar Bhale',
  title: 'Full Stack Developer (MERN Stack)',
  tagline: 'Crafting responsive, scalable, and high-performance web applications & AI-integrated solutions.',
  resumeUrl: '/resume.pdf',
  badges: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'AI Tools'],
};

export const about = {
  name: 'Sagar Bhale',
  summary:
    'Full Stack Developer with 2+ years of hands-on experience building responsive, scalable, and high-performance web applications using React.js, Next.js, TypeScript, Node.js, Express.js, and MongoDB. Proficient in state management with Redux Toolkit, Redux Saga, and React Query, as well as modern UI development using Material UI and CSS/SCSS. Experienced in delivering complete full-stack solutions and AI-driven platforms in Agile environments.',
  highlights: [
    '2+ years of hands-on experience in full-stack MERN & Next.js development',
    'Architected AI-driven platforms with real-time proctoring & video interfaces',
    'Built enterprise insurance platforms with end-to-end payment journeys',
    'Deep expertise in state management (Redux Toolkit, Redux Saga, React Query)',
    'Proficient with cloud & DevOps tools: AWS (S3, EC2), Docker, GitHub Actions',
  ],
  interests: ['MERN Stack', 'Next.js & TypeScript', 'AI Tools (GPT-4, Cursor, Claude)', 'System Design', 'UI/UX Design', 'Cloud & DevOps'],
  education: {
    degree: 'B.Tech in Computer Science and Engineering',
    university: 'Sushila Devi Bansal College of Technology, Indore',
    year: '2020 – 2024',
    cgpa: '7.84',
  },
};

export const stats = [
  { label: 'Years Experience', value: 2, suffix: '+' },
  { label: 'Enterprise Projects', value: 5, suffix: '+' },
  { label: 'Tech Stack Skills', value: 20, suffix: '+' },
  { label: 'Degree CGPA', value: 7, suffix: '.84' },
];

export const skills = [
  {
    category: 'MERN Stack & Web',
    icon: '⚡',
    color: '#00d4aa',
    items: [
      { name: 'React.js', level: 'Expert', progress: 95 },
      { name: 'Next.js', level: 'Advanced', progress: 90 },
      { name: 'TypeScript', level: 'Advanced', progress: 88 },
      { name: 'Node.js & Express.js', level: 'Expert', progress: 92 },
      { name: 'MongoDB & Mongoose', level: 'Expert', progress: 90 },
      { name: 'RESTful APIs & JWT', level: 'Expert', progress: 95 },
    ],
  },
  {
    category: 'State & Databases',
    icon: '🗄️',
    color: '#a78bfa',
    items: [
      { name: 'Redux Toolkit', level: 'Expert', progress: 92 },
      { name: 'Redux Saga', level: 'Advanced', progress: 85 },
      { name: 'React Query', level: 'Expert', progress: 90 },
      { name: 'MySQL & Redis', level: 'Intermediate', progress: 78 },
      { name: 'Socket.IO', level: 'Advanced', progress: 85 },
      { name: 'Query Optimization', level: 'Advanced', progress: 82 },
    ],
  },
  {
    category: 'Cloud, DevOps & Tools',
    icon: '🛠️',
    color: '#f472b6',
    items: [
      { name: 'AWS (S3, EC2)', level: 'Intermediate', progress: 75 },
      { name: 'Docker', level: 'Intermediate', progress: 72 },
      { name: 'CI/CD & GitHub Actions', level: 'Advanced', progress: 80 },
      { name: 'Git & VS Code', level: 'Expert', progress: 95 },
      { name: 'Postman & Jest', level: 'Advanced', progress: 85 },
      { name: 'Material UI & Tailwind', level: 'Expert', progress: 92 },
    ],
  },
  {
    category: 'AI & Soft Skills',
    icon: '🤖',
    color: '#fb923c',
    items: [
      { name: 'ChatGPT (GPT-4/GPT-5)', level: 'Expert', progress: 95 },
      { name: 'Claude AI & Cursor AI', level: 'Expert', progress: 92 },
      { name: 'AI Microservices Integration', level: 'Advanced', progress: 85 },
      { name: 'Problem-Solving', level: 'Expert', progress: 92 },
      { name: 'System Design Thinking', level: 'Advanced', progress: 85 },
      { name: 'Agile (Scrum)', level: 'Expert', progress: 90 },
    ],
  },
];

export const projects = [
  {
    id: '1',
    title: 'AI-Driven Recruitment Platform',
    description:
      'Full-stack AI recruitment platform built using MERN stack and Python microservices. Features real-time video interview interface with proctoring and Socket.io for live feedback, JWT authentication, and recruiter analytics dashboard using Redux Toolkit and React Query.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['React.js', 'Node.js', 'Python AI', 'Socket.io', 'Redux Toolkit', 'React Query'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    category: 'Python/AI',
    featured: true,
  },
  {
    id: '2',
    title: 'HLAS Insurance Digital Platforms (Singapore)',
    description:
      'Full-stack insurance application for policy management and online purchases using React.js, Node.js, Express.js, and MongoDB. Includes end-to-end 5-step travel insurance purchase journey with payment gateway integration, claims, quotations, and JWT + OTP auth.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Saga', 'Payment Gateway'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    category: 'MERN',
    featured: true,
  },
  {
    id: '3',
    title: 'CloudQuarks Partner Admin Portal',
    description:
      'High-performance Next.js + TypeScript admin portal with Tailwind CSS and dynamic data tables. Interactive dashboards, forms, and analytics charts built with React Query and ECharts, optimized with code splitting and reusable Material UI components.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query', 'ECharts', 'Material UI'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    category: 'MERN',
    featured: true,
  },
  {
    id: '4',
    title: 'Coming Soon',
    description: 'A new full-stack MERN or AI-driven application is currently under development. Stay tuned!',
    image: null,
    tags: ['Python', 'AI/ML', 'MERN'],
    githubUrl: null,
    liveUrl: null,
    category: 'Python/AI',
    placeholder: true,
  },
  {
    id: '5',
    title: 'Coming Soon',
    description: 'An exciting new MERN stack project is in the works. Check back soon!',
    image: null,
    tags: ['React.js', 'Node.js', 'MongoDB'],
    githubUrl: null,
    liveUrl: null,
    category: 'MERN',
    placeholder: true,
  },
];

export const experience = [
  {
    role: 'Full Stack Developer (MERN)',
    company: 'Zenqua Technologies Private Limited',
    location: 'Indore, (M.P.)',
    duration: 'Nov 2024 – Present',
    type: 'Full-time',
    achievements: [
      'Developed scalable full-stack web applications using Node.js, Express.js, React.js, and MongoDB',
      'Designed and implemented RESTful APIs with Express.js for efficient data handling and business logic',
      'Built and optimized MongoDB schemas, queries, and indexing using Mongoose for high performance',
      'Integrated frontend with backend services using React.js, Redux, and React Query',
      'Implemented secure authentication and authorization using JWT and OTP verification',
      'Optimized backend performance through query optimization, caching strategies, and error handling',
      'Collaborated in Agile/Scrum environment for sprint planning, code reviews, and timely delivery',
    ],
  },
  {
    role: 'MERN Stack Developer',
    company: 'GrowTech',
    location: 'Indore, (M.P.)',
    duration: 'April 2024 – June 2024',
    type: 'Full-time',
    achievements: [
      'Gained hands-on experience in full MERN stack (MongoDB, Express.js, React.js, Node.js)',
      'Developed RESTful APIs using Node.js and Express.js with proper middleware and validation',
      'Worked extensively on MongoDB for schema design, CRUD operations, and query optimization',
      'Built responsive React.js frontend and integrated with backend APIs',
      'Implemented JWT-based authentication and basic security best practices',
      'Completed multiple full-stack projects using Git for version control in Agile workflows',
    ],
  },
];

export const contact = {
  email: 'sagarbhaletech787@gmail.com',
  phone: '+91 8821073787',
  location: 'Indore, MP, India',
  social: [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'LinkedIn' },
    { name: 'GitHub', url: 'https://github.com', icon: 'GitHub' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
  ],
};

export const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
