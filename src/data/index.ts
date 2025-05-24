import { Skill, Project, Experience, Education, Certification, SocialLink } from '../types';

export const skills: Skill[] = [
  // Frontend
  { 
    name: 'HTML', 
    level: 90, 
    category: 'frontend',
    details: 'Maîtrise des structures sémantiques, formulaires, balises multimédias et des standards HTML5. Expérience avec les attributs de données et les techniques d\'accessibilité.'
  },
  { 
    name: 'CSS', 
    level: 85, 
    category: 'frontend',
    details: 'Expérience en responsive design, Flexbox, Grid, animations et transitions CSS. Familier avec Sass, CSS Modules et les méthodologies BEM.'
  },
  { 
    name: 'JavaScript', 
    level: 85, 
    category: 'frontend',
    details: 'Maîtrise des fonctionnalités ES6+, manipulation du DOM, APIs web, programmation asynchrone (Promises, async/await) et gestion des événements.'
  },
  { 
    name: 'React', 
    level: 80, 
    category: 'frontend',
    details: 'Développement de composants fonctionnels, hooks, context API, optimisation de performance et intégration avec des APIs. Expérience avec Next.js et Redux.'
  },
  
  // Backend
  { 
    name: 'Java', 
    level: 75, 
    category: 'backend',
    details: 'Développement d\'applications avec Spring Boot, JPA/Hibernate et gestion de bases de données. Conception de services RESTful et microservices.'
  },
  { 
    name: 'Python', 
    level: 80, 
    category: 'backend',
    details: 'Création d\'applications backend avec Django et Flask. Expérience en manipulation de données avec pandas et matplotlib pour l\'analyse de données.'
  },
  { 
    name: 'PHP', 
    level: 70, 
    category: 'backend',
    details: 'Développement de sites web dynamiques avec PHP moderne, Laravel et WordPress. Intégration de bases de données MySQL et systèmes d\'authentification.'
  },
  { 
    name: 'C/C++', 
    level: 65, 
    category: 'backend',
    details: 'Programmation système, algorithmique et développement d\'applications de bas niveau. Expérience avec les structures de données avancées et la gestion de mémoire.'
  },
  
  // Tools
  { 
    name: 'Git', 
    level: 75, 
    category: 'tools',
    details: 'Gestion de versions, collaboration en équipe, résolution de conflits et stratégies de branching (Git Flow). Expérience avec GitHub, GitLab et Bitbucket.'
  },
  { 
    name: 'Gestion de Projet', 
    level: 80, 
    category: 'tools',
    details: 'Organisation de sprints, planification agile, suivi des tâches et coordination d\'équipe. Utilisation d\'outils comme Jira, Trello et notion.'
  },
  { 
    name: 'Design UI/UX', 
    level: 75, 
    category: 'tools',
    details: 'Création de maquettes, prototypes interactifs et conception centrée sur l\'utilisateur. Utilisation de Figma, Adobe XD et principes de design responsif.'
  },
  
  // Soft Skills
  { 
    name: 'Communication', 
    level: 85, 
    category: 'softSkills',
    details: 'Communication claire et efficace avec les clients et l\'équipe. Capacité à vulgariser des concepts techniques et à présenter des solutions.'
  },
  { 
    name: 'Travail d\'équipe', 
    level: 90, 
    category: 'softSkills',
    details: 'Collaboration proactive, partage de connaissances et contribution constructive. Adaptation facile à différentes dynamiques d\'équipe et méthodologies de travail.'
  },
  { 
    name: 'Autonomie', 
    level: 95, 
    category: 'softSkills',
    details: 'Capacité à travailler de manière indépendante, à prendre des initiatives et à résoudre des problèmes sans supervision constante.'
  },
  { 
    name: 'Résolution de problèmes', 
    level: 85, 
    category: 'softSkills',
    details: 'Approche analytique et créative pour résoudre des défis techniques. Décomposition efficace des problèmes complexes en tâches gérables.'
  },
];

export const projects: Project[] = [
  {
    id: 'escp-website',
    title: 'Application Web de gestion de l\'Institut CURI',
    description: 'Ce système permet la gestion complète des étudiants et de leurs documents, organisés par promotions académiques. Il offre des fonctionnalités de gestion utilisateurs, d\'audit et de suivi des dossiers étudiants.',
    image: 'images/curi.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    link: 'https://sy-diouf.github.io/Gestion-etudiant/',
    githubLink: 'https://github.com/sy-diouf/Gestion-etudiant',
    category: 'web',
  },
  {
    id: '2cm-website',
    title: 'Météo Sénégal',
    description: 'Une application météorologique PWA pour le Sénégal, offrant des informations détaillées sur les conditions météorologiques actuelles et les prévisions pour les régions du Sénégal.',
    image: 'images/meteo.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
    link: 'https://sy-diouf.github.io/meteo-senegal/',
    githubLink: 'https://github.com/sy-diouf/meteo-senegal',
    category: 'web',
  },
  {
    id: 'cum-app',
    title: 'Application Mobile SenFormalités',
    description: 'SenFormalités est une application mobile conçue pour simplifier les démarches administratives au Sénégal.',
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80',
    technologies: ['TypeScript', 'React Native', 'Autres'],
    link: '',
    githubLink: '',
    category: 'mobile',
  },
  {
    id: 'ecommerce',
    title: 'Site Web Portfolio',
    description: 'Ce projet est un portfolio personnel moderne et responsive présentant mes compétences, projets, expériences et formations.',
    image: 'images/portfolio.jpg',
    technologies: ['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'Autres'],
    link: 'https://sy-diouf.github.io/mon_portfolio/',
    githubLink: 'https://github.com/sy-diouf/mon_portfolio',
    category: 'web',
  },
  {
    id: 'portfolio',
    title: ' Quiz Sénégal',
    description: 'Quiz Sénégal est une application interactive et ludique visant à faire découvrir le Sénégal, sa culture, son histoire, sa géographie et ses traditions à travers des quiz thématiques.',
    image: 'images/quiz.jpg',
    technologies: ['TypeScript', 'Autres'],
    link: 'https://sy-diouf.github.io/quiz-senegal/',
    githubLink: 'https://github.com/sy-diouf/quiz-senegal',
    category: 'web',
  },
  {
    id: 'delivery-app',
    title: 'Application Mobile de Caisse Enregistreuse',
    description: 'Application mobile de caisse enregistreuse (POS) pour la restauration rapide, développée avec React Native et Expo.',
    image: 'images/caisse.jpg',
    technologies: ['React Native', 'Firebase', 'Expo', 'Autres'],
    link: '',
    githubLink: '',
    category: 'mobile',
  },
];

export const experiences: Experience[] = [
  {
    id: 'digiwal',
    title: 'Technicien Stagiaire',
    company: 'YOMBAL MARKET',
    location: 'Sénégal',
    startDate: 'Septembre 2024',
    endDate: 'Présent',
    description: [
      'Support client',
      'Gestion et mise à jour du site web',
      'Réalisation de supports',
      'Intégration web'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Photoshop']
  },
  {
    id: 'nic',
    title: 'Stagiaire',
    company: 'NIC SENEGAL',
    location: 'Sénégal',
    startDate: 'Juillet 2024',
    endDate: 'Août 2024',
    description: [
      'Participation à la promotion du domaine .SN pour le NIC Sénégal',
      'Implication dans les projets de gestion des noms de domaine nationaux'
    ],
    technologies: ['DNS', 'Web Hosting', 'Domain Management']
  },
  {
    id: '2cm',
    title: 'Stagiaire',
    company: '2CM SARL',
    location: 'Sénégal',
    startDate: 'Juillet 2023',
    endDate: 'Octobre 2023',
    description: [
      'Développement web',
      'Maintenance et mise à jour du site de l\'entreprise',
      'Contribution aux projets web'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
  }
];

export const education: Education[] = [
  {
    id: 'ucad-diplome',
    degree: 'DUT Informatique (Développement Web et Mobile)',
    school: 'Université Cheikh Anta Diop de Dakar',
    location: 'Dakar, Sénégal',
    startDate: '2021',
    endDate: '2023',
    description: 'Formation complète en développement web et mobile, incluant la programmation front-end et back-end, la gestion de bases de données et les méthodologies de conception d’applications.'
  }
];

export const certifications: Certification[] = [
  {
    id: 'cert-marketing',
    title: 'Marketing Digital',
    issuer: 'FORCE N',
    date: '2023',
    link: '/certifications/marketing-digital.pdf'
  },
  {
    id: 'cert-security',
    title: 'Cyber Sécurité',
    issuer: 'FORCE N',
    date: '2023',
    link: '/certifications/cyber-securite.pdf'
  },
  {
    id: 'cert-frontend',
    title: 'Développement Front-End',
    issuer: 'FORCE N',
    date: '2024',
    link: '/certifications/developpement-frontend.pdf'
  },
  {
    id: 'cert-mobile',
    title: 'Développement Mobile',
    issuer: 'FORCE N',
    date: '2024',
    link: '/certifications/developpement-mobile.pdf'
  },
  {
    id: 'cert-ai',
    title: 'Intelligence Artificielle',
    issuer: 'FORCE N',
    date: '2042',
    link: '/certifications/intelligence-artificielle.pdf'
  },
  {
    id: 'cert-data',
    title: 'Traitements des données Avancées',
    issuer: 'FORCE N',
    date: '2024',
    link: '/certifications/traitement-donnees-avancees.pdf'
  },
  {
    id: 'cert-ethics',
    title: 'Haking Éthique',
    issuer: 'FORCE N',
    date: '2023',
    link: '/certifications/ethique-digitale.pdf'
  }
];

export const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    url: 'mailto:sydioufsd710pro@gmail.com',
    icon: 'mail'
  },
  {
    name: 'LinkedIn',
    url: 'https://sn.linkedin.com/in/sy-diouf-42b197291?trk=people-guest_people_search-card',
    icon: 'linkedin'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/sy-diouf',
    icon: 'github'
  }
];

export const about = {
  name: 'Serigne Moustapha Diouf',
  title: 'Développeur Web & Mobile',
  location: 'Dakar',
  phone: '+221 78 165 24 92',
  email: 'sydioufsd710pro@gmail.com',
  bio: `J'aime travailler dans des environnements dynamiques et en contact avec le public. Capable d'effectuer des tâches périodiques, je suis avide de nouvelles technologies. Passionné par le développement web et mobile, je m'efforce constamment d'améliorer mes compétences et de rester à jour avec les dernières tendances du secteur.`,
  highlights: [
    'Développeur Full Stack',
    'Concepteur d\'applications mobiles',
    'Gestionnaire de projets web',
    'Passionné de nouvelles technologies'
  ],
  achievements: [
    'Sortie Major en premier année de mon institut',
    'Sélectionnée parmi les 5 meilleurs étudiants de l\'année 2021/2022 au de mon institut'
  ]
};

export const languages = [
  { name: 'Wolof', level: 'Langue maternelle' },
  { name: 'Français', level: 'Courant' },
  { name: 'Anglais', level: 'Intermédiaire' }
];