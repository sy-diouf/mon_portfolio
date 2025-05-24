import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Award, Star, Briefcase, GraduationCap, Code } from 'lucide-react';
import { about, languages } from '../data';

const AboutSection: React.FC = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.7
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header with modern styling */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="text-sm font-semibold tracking-wider text-primary-500 dark:text-primary-400 uppercase mb-2 block">Découvrez mon parcours</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400">À Propos</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 rounded-full transform scale-x-100 origin-left"></div>
            </h2>
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
            Découvrez qui je suis, mes compétences, et ce qui me passionne dans le monde du développement web et mobile.
          </motion.p>
        </motion.div>

        {/* Three column layout for modern design */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Personal Information */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 h-full"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mr-4">
                <Briefcase size={20} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Informations Personnelles</h3>
            </div>

            <div className="space-y-6 mb-8">
              <motion.div 
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mr-4">
                  <MapPin size={16} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 block">Localisation</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{about.location}</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mr-4">
                  <Phone size={16} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 block">Téléphone</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{about.phone}</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mr-4">
                  <Mail size={16} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 block">Email</span>
                  <a 
                    href={`mailto:${about.email}`} 
                    className="text-gray-700 dark:text-gray-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {about.email}
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mr-4">
                <GraduationCap size={20} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Langues</h3>
            </div>

            <div className="space-y-5">
              {languages.map((language, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{language.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{language.level}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${index === 0 ? 'bg-primary-500 dark:bg-primary-400' : index === 1 ? 'bg-secondary-500 dark:bg-secondary-400' : 'bg-accent-500 dark:bg-accent-400'}`}
                      initial={{ width: 0 }}
                      animate={{ width: language.name === 'Wolof' ? '100%' : language.name === 'Français' ? '90%' : '70%' }}
                      transition={{ duration: 1.2, delay: 0.3 + (index * 0.2), ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Column 2: Bio */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 h-full flex flex-col"
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/40 flex items-center justify-center mr-4">
                <Code size={20} className="text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Qui suis-je ?</h3>
            </div>

            <div className="flex-grow">
              <motion.p 
                variants={itemVariants} 
                className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-lg first-letter:text-3xl first-letter:font-bold first-letter:text-primary-600 dark:first-letter:text-primary-400 first-letter:mr-1 first-letter:float-left"
              >
                {about.bio}
              </motion.p>
              
              <div className="flex justify-center">
                <motion.div 
                  className="p-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 inline-flex"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-full p-1.5">
                    <img 
                      src="/images/profile.jpg" 
                      alt="Serigne Moustapha Diouf" 
                      className="w-40 h-40 object-cover rounded-full border-2 border-white dark:border-gray-700"
                      onError={(e) => {
                        e.currentTarget.src = 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1716496563~exp=1716497163~hmac=0ea4334a8221089710d200c7671dc3d5e66e3fb9dd4b4e4b726185027db9e12d';
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Column 3: Points forts & Réalisations */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 h-full"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/40 flex items-center justify-center mr-4">
                <Star size={20} className="text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Points forts</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-8">
              {about.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5, backgroundColor: "var(--color-primary-50)" }}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mr-3 text-white font-medium text-xs shadow-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{highlight}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/40 flex items-center justify-center mr-4">
                <Award size={20} className="text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Réalisations</h3>
            </div>

            <div className="space-y-4">
              {about.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-secondary-500 text-white flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 group-hover:shadow-md transition-shadow">
                    <span className="text-xs font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <span className="text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors font-medium">{achievement}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;