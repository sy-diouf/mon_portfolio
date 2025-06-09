import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Smartphone, Filter, Github, Eye } from 'lucide-react';
import { projects } from '../data';
import { useInView } from 'react-intersection-observer';

const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  useEffect(() => {
    const filtered = activeCategory === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeCategory);
    setFilteredProjects(filtered);
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.9, y: 50, opacity: 0, rotate: -2 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    }
  };

  // Animation pour les cartes filtrées
  const itemExitVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.15 }
    }
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="text-sm font-semibold tracking-wider text-primary-500 dark:text-primary-400 uppercase mb-2 block">Mon portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400">Mes Projets</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 rounded-full transform scale-x-100 origin-left"></div>
            </h2>
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
            Découvrez quelques-uns des projets sur lesquels j'ai travaillé.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
            <Filter size={16} className="mr-1 inline" />
            Tous
          </motion.button>
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveCategory('web')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === 'web'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <Code size={16} className="mr-1 inline" />
            Web
          </motion.button>
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveCategory('mobile')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === 'mobile'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <Smartphone size={16} className="mr-1 inline" />
            Mobile
          </motion.button>
          {/* La catégorie Design a été supprimée */}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemExitVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                layoutId={project.id.toString()}
                className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                <img
                  src={project.image || `https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;
                  }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="flex gap-5 scale-0 group-hover:scale-100 transition-transform duration-300">
                    {/* Utilisons des liens fictifs pour tester l'affichage */}
                    <a 
                      href={project.link || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                      aria-label="Voir la démo du projet"
                      onClick={(e) => !project.link && e.preventDefault()}
                    >
                      <Eye size={22} />
                    </a>
                    <a 
                      href={project.githubLink || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-900 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                      aria-label="Voir le code source sur GitHub"
                      onClick={(e) => !project.githubLink && e.preventDefault()}
                    >
                      <Github size={22} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs font-medium px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    project.category === 'web' 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                      : project.category === 'mobile'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  }`}>
                    {project.category === 'web' 
                      ? 'Web' 
                      : project.category === 'mobile'
                      ? 'Mobile'
                      : 'Design'
                    }
                  </span>
                  
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Bouton d'appel à l'action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a 
            href="https://github.com/sy-diouf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
          >
            <Github size={20} className="mr-2" />
            Voir tous mes projets sur GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;