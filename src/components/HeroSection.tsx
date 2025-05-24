import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowDown, User, Send, Code, Mail, Linkedin, Github } from 'lucide-react';
import { about, socialLinks } from '../data';
import InteractiveParticles from './InteractiveParticles';

const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  // Liste des textes à afficher en alternance
  const textArray = [
    "Développeur Web & Mobile",
    "Concepteur d'Applications",
    "Passionné de Technologie",
    "Full Stack Developer"
  ];
  
  // Obtenir le texte actuel en fonction du cycle
  const getCurrentText = () => textArray[loopNum % textArray.length];
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleTyping = () => {
      const currentText = getCurrentText();
      const shouldComplete = !isDeleting && typedText === currentText;
      const shouldDelete = isDeleting && typedText === '';
      
      // Définir la vitesse de frappe (plus rapide pour effacer)
      
      // Si nous avons terminé d'écrire le texte complet
      if (shouldComplete) {
        // Pause avant de commencer à effacer
        timer = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(50);
        }, 2000); // Pause de 2 secondes avant d'effacer
        return;
      }
      
      // Si nous avons fini d'effacer le texte
      if (shouldDelete) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150); // Légère pause avant de commencer le prochain mot
        return;
      }
      
      // Processus d'écriture/effacement
      const newText = isDeleting
        ? currentText.substring(0, typedText.length - 1)
        : currentText.substring(0, typedText.length + 1);
      
      setTypedText(newText);
      
      // Planifier la prochaine mise à jour
      timer = setTimeout(handleTyping, typingSpeed);
    };
    
    // Démarrer l'animation
    timer = setTimeout(handleTyping, typingSpeed);
    
    // Nettoyage lors du démontage du composant
    return () => {
      clearTimeout(timer);
    };
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-500 blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-secondary-500 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-500 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      {/* Particules interactives qui réagissent au mouvement du curseur */}
      <InteractiveParticles 
        count={40}
        maxDistance={200}
        colors={[
          'var(--color-primary-400)',
          'var(--color-secondary-400)',
          'var(--color-accent-400)',
          'var(--color-primary-300)'
        ]}
        speedFactor={0.05}
        className="z-0"
      />
      
      <div className="container mx-auto px-4 z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="lg:col-span-3 text-center lg:text-left"
            variants={itemVariants}
          >
            <motion.h1 
              className="mb-4 font-bold leading-tight"
              variants={itemVariants}
            >
              Bonjour, je suis <span className="text-gradient">{about.name}</span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl mb-6 font-medium text-gray-700 dark:text-gray-300"
              variants={itemVariants}
            >
              {typedText}<span className="animate-pulse">|</span>
            </motion.h2>
            
            <motion.div 
              className="relative text-lg mb-8 max-w-2xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-400 overflow-hidden"
              variants={itemVariants}
            >
              <BioTextScroller text={about.bio} />
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <motion.a 
                href="#about" 
                className="btn btn-primary flex items-center justify-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <User size={18} />
                En savoir plus
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn btn-outline flex items-center justify-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Send size={18} />
                Me contacter
              </motion.a>
              <motion.a 
                href="#projects" 
                className="btn btn-secondary flex items-center justify-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Code size={18} />
                Voir mes projets
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="flex justify-center lg:justify-start gap-4 mt-6"
              variants={itemVariants}
            >
              {/* Liens sociaux */}
              <motion.a 
                href={socialLinks[0].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={socialLinks[0].name}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 5,
                  backgroundColor: "var(--color-primary-100)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Mail size={20} />
              </motion.a>
              <motion.a 
                href={socialLinks[1].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={socialLinks[1].name}
                whileHover={{ 
                  scale: 1.2,
                  rotate: -5,
                  backgroundColor: "var(--color-primary-100)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href={socialLinks[2].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={socialLinks[2].name}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 5,
                  backgroundColor: "var(--color-primary-100)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Github size={20} />
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 p-2">
              {/* Bordure animée */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 p-1"
                animate={{ 
                  rotate: [0, 360],
                  background: [
                    'linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500), var(--color-primary-500))',
                    'linear-gradient(180deg, var(--color-primary-500), var(--color-secondary-500), var(--color-primary-500))',
                    'linear-gradient(270deg, var(--color-primary-500), var(--color-secondary-500), var(--color-primary-500))',
                    'linear-gradient(360deg, var(--color-primary-500), var(--color-secondary-500), var(--color-primary-500))'
                  ] 
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              
              {/* Conteneur de l'image avec animation flottante */}
              <motion.div 
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl z-10 bg-white dark:bg-gray-800"
                animate={{ y: [-5, 5, -5] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <motion.img 
                  src="images/profile.JPG" 
                  alt="Serigne Moustapha Diouf"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Reflet lumineux qui traverse l'image */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                  animate={{ 
                    x: [-200, 500],
                    opacity: [0, 0.1, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatDelay: 5
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        >
          <motion.a 
            href="#about"
            className="group flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.span 
              className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors"
              animate={{ y: [0, -4, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                repeatType: "reverse", 
                ease: "easeInOut" 
              }}
            >
              Découvrir
            </motion.span>
            
            <motion.div
              className="relative bg-primary-100 dark:bg-primary-900/30 rounded-full p-3 text-primary-500 dark:text-primary-400 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/40 transition-colors"
              whileTap={{ scale: 0.9 }}
              initial={{ boxShadow: "0 0 0 0 rgba(79, 70, 229, 0)" }}
              animate={{
                boxShadow: ["0 0 0 0 rgba(79, 70, 229, 0.3)", "0 0 0 10px rgba(79, 70, 229, 0)"],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                repeatType: "loop",
              }}
            >
              <ArrowDown size={28} className="animate-bounce" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Composant d'animation du texte de bio
const BioTextScroller: React.FC<{ text: string }> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  
  // Détecter si le texte est trop long pour le conteneur
  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;
      setIsComplete(textWidth <= containerWidth);
    }
  }, [text, isInView]);
  
  // Animation initiale d'apparition du texte
  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, isInView]);
  
  // Animation du défilement de texte
  useEffect(() => {
    if (!isComplete && textRef.current && containerRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      
      if (isHovered) {
        // Animation lente quand survolé
        controls.start({
          x: -(textWidth - containerWidth),
          transition: { duration: text.length * 0.05, ease: "linear" }
        });
      } else {
        // Pas de défilement, juste montrer le début du texte
        controls.start({ x: 0, transition: { duration: 0.5 } });
      }
    }
  }, [isHovered, isComplete, controls, text]);
  
  return (
    <motion.div 
      ref={containerRef}
      className="relative overflow-hidden py-1"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <motion.div
        className="relative inline-flex items-center"
        animate={controls}
      >
        <motion.p ref={textRef} className="whitespace-nowrap lg:whitespace-normal">
          {text}
        </motion.p>
        
        {!isComplete && (
          <motion.span 
            className="ml-2 text-primary-500 dark:text-primary-400 font-medium"
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            Survolez pour lire plus
          </motion.span>
        )}
      </motion.div>
      
      {/* Indicateur visuel pour montrer qu'il y a plus de texte */}
      {!isComplete && !isHovered && (
        <motion.div 
          className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-white dark:to-gray-900 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
      )}
    </motion.div>
  );
};

export default HeroSection;