import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CalendarDays, MapPin, Check } from 'lucide-react';
import { experiences } from '../data';
import { useInView } from 'react-intersection-observer';

const ExperienceSection: React.FC = () => {
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
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        duration: 0.5
      }
    }
  };
  
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
  };
  
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.5
      }
    }
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400">Expérience Professionnelle</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 rounded-full transform scale-x-100 origin-left"></div>
            </h2>
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
            Mon parcours professionnel et mes expériences.
          </motion.p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto overflow-hidden">
          {/* Timeline SVG line with animated draw effect */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-full flex justify-center z-0">
            <motion.svg 
              className="absolute h-full w-2" 
              viewBox="0 0 2 100"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ overflow: 'visible' }}
            >
              <motion.path
                d={`M 1,0 L 1,100`}
                variants={lineVariants}
                className="stroke-primary-500 dark:stroke-primary-400" 
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </motion.svg>
          </div>

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-8 md:text-right md:ml-auto md:mr-1/2' : 'md:pl-8 md:text-left md:mr-auto md:ml-1/2'
              } md:w-3/5`}
            >
              {/* Timeline badge circle */}
              <motion.div 
                variants={circleVariants}
                className="absolute left-0 md:left-auto md:right-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 border-4 border-white dark:border-gray-800 transform -translate-y-1/2 md:translate-x-1/2 z-10 shadow-lg"
                whileHover={{ scale: 1.1, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <CalendarDays size={20} className="text-white" />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={`bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-600 ${
                  index % 2 === 0 ? 'md:rounded-tr-none' : 'md:rounded-tl-none'
                } w-full`}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col h-full">
                  {/* Header with title and company */}
                  <div className="flex justify-between items-start bg-gradient-to-r from-primary-500/10 to-primary-600/10 dark:from-primary-500/20 dark:to-primary-600/20 p-3 border-b border-gray-100 dark:border-gray-600">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                        <Briefcase size={16} className="text-primary-500 dark:text-primary-400 mr-2 flex-shrink-0" />
                        {experience.title}
                      </h3>
                      <h4 className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-1">
                        {experience.company}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-primary-100 dark:bg-primary-800/40 text-primary-800 dark:text-primary-200 text-xs font-medium px-2 py-1 rounded">
                        {experience.startDate} - {experience.endDate}
                      </span>
                      <div className="flex items-center justify-end text-gray-500 dark:text-gray-400 text-xs mt-1">
                        <MapPin size={12} className="mr-1 flex-shrink-0" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 flex-grow">
                    {/* Description */}
                    <div className="space-y-2 mb-3">
                      {experience.description.map((item, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="mr-2 bg-green-100 dark:bg-green-900/30 rounded-full p-1 flex-shrink-0 mt-0.5">
                            <Check size={10} className="text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Technologies */}
                    {experience.technologies && (
                      <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex flex-wrap gap-1.5">
                          {experience.technologies.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/30 text-primary-700 dark:text-primary-300 rounded border border-primary-200 dark:border-primary-800/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;