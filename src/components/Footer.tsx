import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code, Phone, MapPin, Heart } from 'lucide-react';
import { socialLinks, about } from '../data';

const Footer: React.FC = () => {
  // Variants d'animation pour les éléments du footer
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const navLinks = [
    { name: "À propos", href: "#about" },
    { name: "Compétences", href: "#skills" },
    { name: "Expériences", href: "#experience" },
    { name: "Projets", href: "#projects" },
    { name: "Formation", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 transition-colors duration-300 relative overflow-hidden">
      {/* Éléments de décoration en arrière-plan */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-80"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Colonne 1: Informations personnelles */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="mb-4">
              <motion.h3 
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 inline-block mb-2"
                whileHover={{ scale: 1.02 }}
              >
                Serigne Moustapha Diouf
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <Code size={14} className="mr-2 text-primary-500" />
                Développeur Web & Mobile
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Je transforme des idées en solutions digitales modernes avec une passion pour le code propre et les interfaces utilisateur élégantes.
            </p>
            
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((link, index) => {
                let Icon;
                switch (link.icon) {
                  case 'github':
                    Icon = Github;
                    break;
                  case 'linkedin':
                    Icon = Linkedin;
                    break;
                  case 'mail':
                    Icon = Mail;
                    break;
                  default:
                    Icon = Mail;
                }
                
                return (
                  <motion.a 
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-700 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:shadow-md transition-all shadow-sm relative overflow-hidden"
                    aria-label={link.name}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -3,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.1) }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-primary-500/30 dark:to-secondary-500/30"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
          
          {/* Colonne 2: Navigation rapide */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <motion.span 
                className="w-6 h-0.5 bg-primary-500 mr-2"
                animate={{ width: [0, 24] }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (index * 0.05) }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center"
                  >
                    <motion.span 
                      className="w-0 h-0.5 bg-primary-500 mr-0 opacity-0" 
                      whileHover={{ width: 12, opacity: 1, marginRight: 8 }}
                      transition={{ duration: 0.2 }}
                    />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Colonne 3: Contact */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <motion.span 
                className="w-6 h-0.5 bg-primary-500 mr-2"
                animate={{ width: [0, 24] }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              Contact
            </h4>
            <ul className="space-y-3">
              <motion.li 
                className="text-gray-600 dark:text-gray-400 flex items-start"
                whileHover={{ scale: 1.01, x: 2 }}
              >
                <Mail size={16} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                <a href={`mailto:${about.email}`} className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  {about.email}
                </a>
              </motion.li>
              <motion.li 
                className="text-gray-600 dark:text-gray-400 flex items-start"
                whileHover={{ scale: 1.01, x: 2 }}
              >
                <Phone size={16} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                <a href={`tel:${about.phone}`} className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  {about.phone}
                </a>
              </motion.li>
              <motion.li 
                className="text-gray-600 dark:text-gray-400 flex items-start"
                whileHover={{ scale: 1.01, x: 2 }}
              >
                <MapPin size={16} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                <span>{about.location}</span>
              </motion.li>
            </ul>
          </motion.div>
          
          {/* Colonne 4: Technologies */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <motion.span 
                className="w-6 h-0.5 bg-primary-500 mr-2"
                animate={{ width: [0, 24] }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              Technologies préférées
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "React Native"
              ].map((tech, index) => (
                <motion.span 
                  key={tech}
                  className="text-sm px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (index * 0.05) }}
                  whileHover={{ y: -3, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center">
            &copy; {new Date().getFullYear()} Serigne Moustapha Diouf. Tous droits réservés.
            <motion.span 
              className="inline-flex items-center ml-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
            >
              <Heart size={14} className="text-red-500 mr-1" /> 
              <span>Conçu avec passion</span>
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;