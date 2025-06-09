import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, PenTool as Tool, Users, RotateCcw } from 'lucide-react';
import { skills } from '../data';

// Fonction pour obtenir la couleur de chaque compétence
const getSkillColor = (skillName: string): string => {
  const colorMap: Record<string, string> = {
    'HTML': 'bg-orange-500',
    'CSS': 'bg-blue-500',
    'JavaScript': 'bg-yellow-500',
    'React': 'bg-cyan-500',
    'Java': 'bg-red-500',
    'Python': 'bg-green-500',
    'PHP': 'bg-indigo-500',
    'C/C++': 'bg-gray-500',
    'Git': 'bg-orange-600',
    'Gestion de Projet': 'bg-purple-500',
    'Design UI/UX': 'bg-pink-500',
    'Communication': 'bg-blue-400',
    'Travail d\'équipe': 'bg-green-400',
    'Autonomie': 'bg-yellow-400',
    'Résolution de problèmes': 'bg-red-400'
  };
  
  return colorMap[skillName] || 'bg-primary-500';
};

// Fonction pour obtenir le logo de chaque compétence
const getSkillLogo = (skillName: string) => {
  switch (skillName) {
    case 'HTML':
      return (
        <div className="flex-shrink-0 w-10 h-10 text-orange-500 dark:text-orange-400">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.08 0L4.735 3.196h13.504L17.898 6.5H4.382L4.033 9.696h13.5l-.616 6.324L11 17.496l-5.834-1.476L4.859 13.1h3.198l.152 1.913L11 15.874l2.815-.862.345-3.51H4.664L3.901 0h14.217z"/>
          </svg>
        </div>
      );
    case 'CSS':
      return (
        <div className="flex-shrink-0 w-10 h-10 text-blue-500 dark:text-blue-400">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.116 0H20.9l-1.444 16.163L11.005 18 2.553 16.163 1.11 0h4.005Z"/>
            <path fill-opacity=".8" d="M17.262 3.506H11v2.399h3.084l-.199 2.463h-2.885v2.399h2.72l-.28 2.626L11 14.21v2.545l4.248-1.316.864-9.932h-4.112V3.506Z"/>
          </svg>
        </div>
      );
    case 'JavaScript':
      return (
        <div className="flex-shrink-0 w-10 h-10 text-yellow-500 dark:text-yellow-400">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
          </svg>
        </div>
      );
    case 'React':
      return (
        <div className="flex-shrink-0 w-10 h-10 text-cyan-500 dark:text-cyan-400">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
            <path d="M12 22.5c-1.1 0-2-.9-2-2 0-1.1.9-2 2-2 1.1 0 2 .9 2 2 0 1.1-.9 2-2 2Zm10-8.6c-.2 0-.3 0-.5-.1-.4-.1-.7-.2-1.1-.4-1.1-.5-2.2-1.3-3.5-2.3-1.3-1.1-2.5-2.3-3.7-3.7-.6-.7-1.1-1.4-1.6-2.1.4-.7 1-1.4 1.6-2.1 1.1-1.3 2.4-2.6 3.7-3.7 1.3-1 2.4-1.8 3.5-2.3.4-.2.7-.3 1.1-.4.1 0 .3-.1.5-.1.9 0 1.7.3 2.3.9.6.6 1 1.4 1 2.3v11c0 .9-.3 1.7-1 2.3-.6.6-1.4.9-2.3.9ZM3.8 13.9c-.3-.3-.5-.6-.6-1-.2-.4-.2-.8-.2-1.2s.1-.8.2-1.2c.2-.4.4-.7.6-1 .5-.5 1.1-.9 1.9-1.3.8-.4 1.7-.7 2.7-1.1-.3.4-.7.8-1 1.2-.7.9-1.3 1.8-1.8 2.6-.5.9-.9 1.8-1.2 2.7-.8-.3-1.7-.7-2.5-1.1-.9-.3-1.5-.8-2.1-1.3.5-.2 1-.4 1.5-.5.7-.1 1.4-.2 2.1-.2-.1.1-.3.2-.4.3-.6.7-1 1.3-1.2 2.1ZM20.2 9.9c.3.3.5.6.6 1 .2.4.2.8.2 1.2s-.1.8-.2 1.2c-.2.4-.4.7-.6 1-.5.5-1.1.9-1.9 1.3-.8.4-1.7.7-2.7 1.1.3-.4.7-.8 1-1.2.7-.9 1.3-1.8 1.8-2.6.5-.9.9-1.8 1.2-2.7.8.3 1.7.7 2.5 1.1.9.3 1.5.8 2.1 1.3-.5.2-1 .4-1.5.5-.7.1-1.4.2-2.1.2.1-.1.3-.2.4-.3.6-.7 1-1.3 1.2-2.1ZM2 14c0-.9.3-1.7 1-2.3.6-.6 1.4-1 2.3-1 .2 0 .3 0 .5.1.4.1.7.2 1.1.4 1.1.5 2.2 1.3 3.5 2.3 1.3 1.1 2.5 2.3 3.7 3.7.6.7 1.1 1.4 1.6 2.1-.4.7-1 1.4-1.6 2.1-1.1 1.3-2.4 2.6-3.7 3.7-1.3 1-2.4 1.8-3.5 2.3-.4.2-.7.3-1.1.4-.1 0-.3.1-.5.1-.9 0-1.7-.3-2.3-.9-.6-.6-1-1.4-1-2.3v-11Z"/>
          </svg>
        </div>
      );
    case 'Java':
      return (
        <div className="flex-shrink-0 w-10 h-10 text-red-500 dark:text-red-400">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.93-953.535-3.779-6.44 8.055-.784.155-5.7z" />
            <path d="M9.292 13.21s-2.325.557-824.759-42.286.8C4.588 15.994 6.768 17.232 9.292 13.21" />
            <path d="M16.717 17.333c3.832-1.991 2.057-3.907 2.057-3.907.882 1.998-2.731 2.338-2.732 4.161-1.015 1.211 2.175 2.782 2.732 4.161 0 0-123-1.005-5.769-.254M16.249 20.452c3.98 2.009 2.619 1.676.523 3.149.136.061-.1.023-.1.023.28 1.964 8.42-3.112 2.305-2.832 0 0-.205-.181-.438-.34" />
          </svg>
        </div>
      );
    case 'Python':
      return (
        <div className="flex-shrink-0 w-10 h-10 text-green-500 dark:text-green-400">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13v8.68l-.5.05-.18.08-.33.14-.58.2-.89.27-1.18.33-1.49.35-1.69.34-1.79.28-1.75.17-1.58.05-1.29-.08-1.06-.18-.84-.28-.64-.36-.46-.43-.34-.49-.25-.54-.16-.58-.12-.64-.09-.62-.07-.66-.04-.61-.02-.58v-.56l.05-.5.12-.47.2-.44.27-.39.35-.35.41-.3.48-.24.54-.2.6-.13.65-.1.7-.05.76-.02.79.01.82.04.91.05.86.08.89.1.83.1.79.16.7.16.66.16.52.15.56.15.38.12.36.11.27.08.2.05.18.04.09.02 11.22v-.38c0-.24-.02-.44-.05-.6a1.95 1.95 0 00-.2-.76 1.67 1.67 0 00-.43-.62 2 2 0 00-.72-.5c-.3-.13-.65-.2-1.07-.2h-6.12l-.29-.02-.27-.03-.25-.05-.24-.07-.21-.09-.21-.11-.18-.13-.19-.15-.15-.18-.15-.2-.12-.23-.1-.26-.08-.29-.06-.32-.04-.36-.02-.39v-3.15c0-.42.05-.75.13-1.04.09-.29.22-.52.4-.71.17-.19.38-.34.62-.45.25-.11.52-.17.81-.17.33 0 .62.07.85.19.24.13.42.29.55.49.14.19.23.4.29.64.06.24.08.48.08.73v.74h4.13v-.79c0-.86-.1-1.6-.3-2.22a3.97 3.97 0 00-.93-1.55c-.41-.41-.93-.74-1.55-.99C14.98.13 14.24 0 13.37 0h-1.23l-.82.02-.52.05zm-4.47 19.69c.2-.03.39-.08.56-.17.16-.09.3-.2.4-.34.12-.15.2-.33.26-.53.06-.21.09-.45.09-.71v-1.85c0-.26-.03-.5-.09-.7a1.37 1.37 0 00-.26-.54c-.11-.15-.24-.26-.4-.35-.17-.09-.36-.14-.57-.14h-8.44l-.28.02-.26.04-.24.05-.23.08-.21.09-.2.11-.18.13-.16.15-.15.16-.13.19-.12.22-.1.24-.08.27-.05.3-.04.33-.01.36v3.05c0 .38.05.71.12 1 .08.28.21.53.38.73.17.2.38.36.64.49.25.13.55.19.89.19h8.05z" />
          </svg>
        </div>
      );
    case 'PHP':
      return (
        <div className="flex-shrink-0 w-10 h-10 text-indigo-500 dark:text-indigo-400">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.3c5.9 0 10.6 2.4 10.6 5.4s-4.7 5.4-10.6 5.4S1.4 14.7 1.4 11.7 6.1 6.3 12 6.3z" />
            <path d="M5.9 10.3c.3 0 .5.1.6.2.1.1.2.3.1.6 0 .2-.1.4-.3.7-.2.3-.3.4-.5.6-.2.1-.4.2-.6.2H4.5l.4-2.2h1zM5 14.2c.5 0 .9-.1 1.3-.3.4-.2.8-.5 1.1-.9.3-.4.5-.8.6-1.2.1-.5.1-.9 0-1.3s-.3-.6-.6-.8c-.3-.2-.7-.3-1.2-.3h-2l-.9 4.8h1.7zm6.7-3.9c.3 0 .5.1.6.2.1.1.2.3.1.6 0 .2-.1.4-.3.7-.2.3-.3.4-.5.6-.2.1-.4.2-.6.2h-.7l.4-2.2h1zm-.9 3.9c.5 0 .9-.1 1.3-.3.4-.2.8-.5 1.1-.9.3-.4.5-.8.6-1.2.1-.5.1-.9 0-1.3s-.3-.6-.6-.8c-.3-.2-.7-.3-1.2-.3h-2l-.9 4.8h1.7zm6.7-3.9c.3 0 .5.1.6.2.1.1.2.3.1.6 0 .2-.1.4-.3.7-.2.3-.3.4-.5.6-.2.1-.4.2-.6.2h-.7l.4-2.2h1zm-.9 3.9c.5 0 .9-.1 1.3-.3.4-.2.8-.5 1.1-.9.3-.4.5-.8.6-1.2.1-.5.1-.9 0-1.3s-.3-.6-.6-.8c-.3-.2-.7-.3-1.2-.3h-2l-.9 4.8h1.7z" />
          </svg>
        </div>
      );
    case 'C/C++':
      return (
        <div className="flex-shrink-0 w-10 h-10 text-gray-500 dark:text-gray-400">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.97l.41 2.44c-.26.14-.68.27-1.24.39-.57.13-1.24.2-2.01.2-2.21-.04-3.87-.7-4.98-1.96C1.56 15.77 1 14.16 1 12.21c.05-2.31.72-4.08 2-5.32C4.32 5.64 5.96 5 7.94 5c.75 0 1.4.07 1.94.19s.94.25 1.2.4l-.58 2.49-1.06-.34c-.4-.1-.86-.15-1.39-.15-1.16-.01-2.12.36-2.87 1.1-.76.74-1.14 1.85-1.18 3.34.01 1.36.37 2.42 1.08 3.2.71.77 1.7 1.17 2.99 1.18l1.33-.12c.43-.08.79-.19 1.1-.32z" />
            <path d="M13.5 9.5h3v1h-3v3h-1v-3h-3v-1h3v-3h1v3z" />
            <path d="M21.5 9.5h3v1h-3v3h-1v-3h-3v-1h3v-3h1v3z" />
          </svg>
        </div>
      );
    case 'Git':
      return (
        <div className="flex-shrink-0 w-10 h-10 text-orange-600 dark:text-orange-500">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.326 2.342l2.658 2.66a1.838 1.838 0 0 1 1.9 1.9c0 .391-.139.75-.38 1.027a1.834 1.834 0 1 1-2.311-2.31L13.9 9.25v6.934a1.83 1.83 0 0 1 .485.345 1.835 1.835 0 0 1-2.6 2.6 1.833 1.833 0 0 1 0-2.6c.182-.18.405-.313.642-.408V9.112a1.833 1.833 0 0 1-.999-2.404L8.83 4.113l-8.38 8.38a1.55 1.55 0 0 0 0 2.188l10.48 10.48a1.55 1.55 0 0 0 2.188 0l10.427-10.428a1.55 1.55 0 0 0 0-2.187" />
          </svg>
        </div>
      );
    default:
      // Pour les compétences sans icône spécifique, utiliser une icône générique
      return (
        <div className="flex-shrink-0 w-10 h-10 text-primary-500 dark:text-primary-400">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-11h2v6h-2V9zm0 8h2v2h-2v-2z" />
          </svg>
        </div>
      );
  }
};

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // État pour suivre quelle carte est retournée (pour les appareils tactiles)
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Assurer que toutes les compétences sont affichées dans la catégorie 'all'
  const filteredSkills = activeCategory === 'all' 
    ? [...skills] // Créer une copie pour éviter des problèmes de référence
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <motion.section 
      id="skills" 
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 overflow-hidden overflow-x-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="container mx-auto px-4"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Section Header with modern styling */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="text-sm font-semibold tracking-wider text-primary-500 dark:text-primary-400 uppercase mb-2 block">Ma maîtrise technique</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400">Mes Compétences</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 rounded-full transform scale-x-100 origin-left"></div>
            </h2>
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
            Découvrez les technologies et compétences que je maîtrise.
          </motion.p>
        </motion.div>

        {/* Filtres de catégories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Toutes
          </motion.button>
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveCategory('frontend')}
            className={`px-4 py-2 rounded-full flex items-center transition-all duration-300 ${
              activeCategory === 'frontend'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <Code size={16} className="mr-2" />
            Frontend
          </motion.button>
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveCategory('backend')}
            className={`px-4 py-2 rounded-full flex items-center transition-all duration-300 ${
              activeCategory === 'backend'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <Server size={16} className="mr-2" />
            Backend
          </motion.button>
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveCategory('tools')}
            className={`px-4 py-2 rounded-full flex items-center transition-all duration-300 ${
              activeCategory === 'tools'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <Tool size={16} className="mr-2" />
            Outils
          </motion.button>
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveCategory('softSkills')}
            className={`px-4 py-2 rounded-full flex items-center transition-all duration-300 ${
              activeCategory === 'softSkills'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <Users size={16} className="mr-2" />
            Soft Skills
          </motion.button>
        </motion.div>

        {/* Grille de compétences avec animation de chute */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={`${activeCategory}-${skill.name}-${index}`}
              initial={{ y: -1000, opacity: 0, rotate: 10 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 1000, opacity: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                type: "spring",
                damping: 12,
                stiffness: 150,
                mass: 0.8
              }}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden h-52"
            >
              <motion.div
                className="relative w-full h-full"
                initial={false}
                animate={{ rotateY: flippedCardIndex === index ? 180 : 0 }}
                whileHover={{ rotateY: 180 }}
                onClick={() => setFlippedCardIndex(flippedCardIndex === index ? null : index)}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  cursor: "pointer"
                }}
              >
                {/* Face avant */}
                <div
                  className="p-6 absolute w-full h-full"
                  style={{ 
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{skill.name}</h3>
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="cursor-pointer"
                    >
                      {getSkillLogo(skill.name)}
                    </motion.div>
                  </div>

                  {/* Indicateur de retournement - desktop uniquement */}
                  <motion.div
                    className="hidden md:flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-1"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <RotateCcw size={14} className="mr-1" />
                    <span>Survolez pour plus de détails</span>
                  </motion.div>

                  {/* Bouton mobile */}
                  <button
                    className="md:hidden mt-2 px-3 py-1 text-xs bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFlippedCardIndex(flippedCardIndex === index ? null : index);
                    }}
                    aria-label={`Voir détails sur ${skill.name}`}
                  >
                    {flippedCardIndex === index ? "Retour" : "Voir détails"}
                  </button>

                  <div className="w-full bg-gray-200 dark:bg-gray-600 h-3 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${getSkillColor(skill.name)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Débutant</span>
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{skill.level}%</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Expert</span>
                  </div>
                </div>

                {/* Face arrière */}
                <div
                  className="p-6 absolute w-full h-full flex flex-col justify-center bg-gradient-to-br from-primary-500 to-secondary-500 text-white"
                  style={{ 
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <div className="text-center mb-2">
                    <h3 className="text-xl font-bold mb-3">{skill.name}</h3>
                    {getSkillLogo(skill.name) && (
                      <div className="mx-auto w-12 h-12 mb-3 opacity-90">
                        {getSkillLogo(skill.name)}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-white/90 overflow-auto max-h-28">
                    {skill.details || "Aucun détail disponible pour cette compétence."}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SkillsSection;