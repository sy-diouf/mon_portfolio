export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'softSkills';
  icon?: string;
  details?: string; // Détails qui seront affichés au dos de la carte
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;       // Lien vers la démo du projet
  githubLink?: string; // Lien vers le référentiel GitHub
  category: 'web' | 'mobile' | 'design' | 'other';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}