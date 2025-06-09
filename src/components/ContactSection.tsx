import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Phone, MapPin, Check, AlertCircle } from 'lucide-react';
import { about, socialLinks } from '../data';
import { useInView } from 'react-intersection-observer';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 1
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        mass: 0.8
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(e.target.name);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Le message est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        // Envoyer le formulaire à Formspree
        const response = await fetch('https://formspree.io/f/xkgrlwel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            subject: formState.subject,
            message: formState.message
          })
        });
        
        setIsSubmitting(false);
        
        if (response.ok) {
          // Succès
          setIsSubmitted(true);
          setFormState({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          
          // Reset success message after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        } else {
          // Erreur côté serveur
          setSubmitError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
        }
      } catch (error) {
        // Erreur de réseau
        setIsSubmitting(false);
        setSubmitError('Problème de connexion. Veuillez vérifier votre connexion internet et réessayer.');
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={titleVariants} className="inline-block">
            <motion.span 
              className="text-sm font-semibold tracking-wider text-primary-500 dark:text-primary-400 uppercase mb-2 block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Restons en contact
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 relative inline-block">
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                Contact
              </motion.span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
              ></motion.div>
            </h2>
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
            N'hésitez pas à me contacter pour discuter de vos projets ou opportunités.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold mb-6 text-primary-600 dark:text-primary-400">
              Mes Informations
            </motion.h3>

            <motion.div variants={containerVariants} className="space-y-6">
              <motion.div 
                variants={cardVariants} 
                className="group bg-white dark:bg-gray-700 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform border-l-4 border-primary-400 dark:border-primary-500"
                whileHover={{ 
                  scale: 1.05, 
                  y: -8, 
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start">
                  <motion.div 
                    className="bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 p-3 rounded-lg mr-4 transition-all duration-300 transform"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    animate={{ rotate: [0, 2, 0], transition: { repeat: Infinity, repeatType: "mirror", duration: 3 } }}
                  >
                    <Mail size={20} className="text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-1">Email</h4>
                    <a 
                      href={`mailto:${about.email}`} 
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
                    >
                      {about.email}
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={cardVariants} 
                className="group bg-white dark:bg-gray-700 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform border-l-4 border-primary-400 dark:border-primary-500"
                whileHover={{ 
                  scale: 1.05, 
                  y: -8, 
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start">
                  <motion.div 
                    className="bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 p-3 rounded-lg mr-4 transition-all duration-300 transform"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    animate={{ rotate: [0, -2, 0], transition: { repeat: Infinity, repeatType: "mirror", duration: 2.5 } }}
                  >
                    <Phone size={20} className="text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-1">Téléphone</h4>
                    <a 
                      href={`tel:${about.phone}`} 
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
                    >
                      {about.phone}
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={cardVariants} 
                className="group bg-white dark:bg-gray-700 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform border-l-4 border-primary-400 dark:border-primary-500"
                whileHover={{ 
                  scale: 1.05, 
                  y: -8, 
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start">
                  <motion.div 
                    className="bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 p-3 rounded-lg mr-4 transition-all duration-300 transform"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    animate={{ y: [0, 2, 0], scale: [1, 1.05, 1], transition: { repeat: Infinity, repeatType: "mirror", duration: 3 } }}
                  >
                    <MapPin size={20} className="text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-1">Adresse</h4>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">{about.location}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-xl font-bold my-6 text-primary-600 dark:text-primary-400">
              Suivez-moi
            </motion.h3>

            <motion.div variants={itemVariants} className="flex space-x-4">
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
                    className="bg-white dark:bg-gray-700 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:shadow-md transition-all shadow-sm relative overflow-hidden"
                    aria-label={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1), type: "spring", stiffness: 260, damping: 20 }}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -7,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-primary-500/30 dark:to-secondary-500/30"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold mb-6 text-primary-600 dark:text-primary-400">
              Envoyez-moi un message
            </motion.h3>

            <motion.div variants={itemVariants} className="mb-10 relative hidden lg:block">
              <div className="absolute -top-16 right-0 w-32 h-32 opacity-25 dark:opacity-10">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366F1"/>
                      <stop offset="1" stopColor="#8B5CF6"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="2" y1="9.5" x2="22" y2="9.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366F1"/>
                      <stop offset="1" stopColor="#8B5CF6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
            
            <motion.form variants={containerVariants} onSubmit={handleSubmit} className="space-y-4" action="https://formspree.io/f/xkgrlwel" method="POST">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'transform scale-[1.02]' : ''}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`input ${errors.name ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500' : 'focus:ring-primary-500 dark:focus:ring-primary-400'} transition-all duration-300 shadow-sm focus:shadow-md w-full`}
                    placeholder="Votre nom"
                  />
                  {focusedField === 'name' && !errors.name && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 dark:text-primary-400"
                    >
                      <Check size={16} />
                    </motion.div>
                  )}
                </div>
                {errors.name && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500 flex items-center"
                  >
                    <AlertCircle size={14} className="mr-1" />
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'transform scale-[1.02]' : ''}`}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`input ${errors.email ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500' : 'focus:ring-primary-500 dark:focus:ring-primary-400'} transition-all duration-300 shadow-sm focus:shadow-md w-full`}
                    placeholder="Votre email"
                  />
                  {focusedField === 'email' && !errors.email && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 dark:text-primary-400"
                    >
                      <Check size={16} />
                    </motion.div>
                  )}
                </div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500 flex items-center"
                  >
                    <AlertCircle size={14} className="mr-1" />
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sujet
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'subject' ? 'transform scale-[1.02]' : ''}`}>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`input ${errors.subject ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500' : 'focus:ring-primary-500 dark:focus:ring-primary-400'} transition-all duration-300 shadow-sm focus:shadow-md w-full`}
                    placeholder="Sujet de votre message"
                  />
                  {focusedField === 'subject' && !errors.subject && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 dark:text-primary-400"
                    >
                      <Check size={16} />
                    </motion.div>
                  )}
                </div>
                {errors.subject && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500 flex items-center"
                  >
                    <AlertCircle size={14} className="mr-1" />
                    {errors.subject}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'transform scale-[1.01]' : ''}`}>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    rows={4}
                    className={`input ${errors.message ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500' : 'focus:ring-primary-500 dark:focus:ring-primary-400'} transition-all duration-300 shadow-sm focus:shadow-md w-full`}
                    placeholder="Votre message"
                  />
                </div>
                {errors.message && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500 flex items-center"
                  >
                    <AlertCircle size={14} className="mr-1" />
                    {errors.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-center mt-8">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative overflow-hidden flex items-center space-x-2 px-8 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0`}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15,
                    mass: 1 
                  }}
                >
                  <motion.span
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 0.3 }}
                    transition={{ duration: 0.8 }}
                  />
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </motion.button>
              </motion.div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ 
                    duration: 0.6, 
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }}
                  className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg flex items-center shadow-md relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-400/10 dark:from-green-400/5 dark:to-green-300/5"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full mr-3 flex items-center justify-center"
                    initial={{ scale: 0.5, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: 2, duration: 0.5, delay: 0.5 }}
                    >
                      <Check size={20} className="text-green-600 dark:text-green-400" />
                    </motion.div>
                  </motion.div>
                  <motion.span 
                    className="font-medium"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    Votre message a été envoyé avec succès !
                  </motion.span>
                </motion.div>
              )}
              
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring",
                    stiffness: 250,
                    damping: 15
                  }}
                  className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg flex items-center shadow-md relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-400/10 dark:from-red-400/5 dark:to-red-300/5"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="bg-red-100 dark:bg-red-800/50 p-2 rounded-full mr-3 flex items-center justify-center"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2, duration: 1 }}
                  >
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
                  </motion.div>
                  <motion.span 
                    className="font-medium"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {submitError}
                  </motion.span>
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
