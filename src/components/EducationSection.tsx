import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CalendarDays, MapPin, Award } from 'lucide-react';
import { education, certifications } from '../data';
import { useInView } from 'react-intersection-observer';

const EducationSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.95, y: 30, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 12,
        duration: 0.6
      }
    }
  };
  
  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    }
  };
  
  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    }
  };

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="text-sm font-semibold tracking-wider text-primary-500 dark:text-primary-400 uppercase mb-2 block">Mon parcours</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400">Formation & Certifications</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 rounded-full transform scale-x-100 origin-left"></div>
            </h2>
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
            Mon parcours académique et mes certifications.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={itemVariants} 
              className="text-xl font-bold mb-8 text-primary-600 dark:text-primary-400 flex items-center bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent py-2 px-4 rounded-lg"
            >
              <div className="bg-primary-100 dark:bg-primary-800/40 p-2 rounded-full mr-3">
                <GraduationCap className="text-primary-600 dark:text-primary-400" size={20} />
              </div>
              Formation
            </motion.h3>

            <div className="space-y-8">
              {education.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.1)', transition: { duration: 0.2 } }}
                >
                  <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                      {item.degree}
                    </h4>
                    <motion.span 
                      variants={badgeVariants}
                      className="inline-flex items-center bg-primary-100 dark:bg-primary-800/50 text-primary-800 dark:text-primary-300 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      <CalendarDays size={12} className="mr-1" />
                      {item.startDate} - {item.endDate}
                    </motion.span>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="text-primary-600 dark:text-primary-400 font-medium flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary-500 mr-2"></div>
                        {item.school}
                      </h5>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <MapPin size={14} className="mr-1 flex-shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-3">{item.description}</p>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-center">
                      <motion.a 
                        href="resume/CV_Serigne_Moustapha_Diouf.pdf" 
                        download
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Télécharger mon CV
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={itemVariants} 
              className="text-xl font-bold mb-8 text-primary-600 dark:text-primary-400 flex items-center bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent py-2 px-4 rounded-lg"
            >
              <div className="bg-primary-100 dark:bg-primary-800/40 p-2 rounded-full mr-3">
                <Award className="text-primary-600 dark:text-primary-400" size={20} />
              </div>
              Certifications
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {certifications.map((certification) => (
                <motion.div
                  key={certification.id}
                  variants={cardVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative"
                  whileHover={{ 
                    scale: 1.03, 
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700"></div>
                  
                  <div className="p-4 pl-5">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-base font-semibold text-gray-800 dark:text-white">
                        {certification.title}
                      </h4>
                      <motion.span 
                        variants={badgeVariants}
                        className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded"
                      >
                        {certification.date}
                      </motion.span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex-grow">
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {certification.issuer}
                        </span>
                      </div>
                      
                      {certification.link && (
                        <a
                          href={certification.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-800/50 text-primary-700 dark:text-primary-300 py-1 px-2 rounded transition-colors inline-flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Certificat
                        </a>
                      )}
                    </div>
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

export default EducationSection;