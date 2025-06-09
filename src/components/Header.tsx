import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Check for user's preferred color scheme on initial load and handle section tracking
  useEffect(() => {
    // Check for saved theme preference or use the browser preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    // Observer pour détecter la section active
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',  // Considère une section comme active quand elle occupe au moins 20% de la vue
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observer toutes les sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    // Handle scroll event to change header background
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };
  
  // Vérifie si un lien est actif
  const isActive = (href: string) => {
    const section = href.replace('#', '');
    return section === activeSection;
  };

  const menuItems = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projects' },
    { name: 'Expérience', href: '#experience' },
    { name: 'Formation', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-white/95 via-white/90 to-white/95 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      {/* Ligne de dégradé qui apparaît en défilant */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500/80 via-secondary-500/80 to-primary-500/80"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0, opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href="#home" 
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 hover:from-primary-500 hover:to-secondary-500 dark:hover:from-primary-300 dark:hover:to-secondary-300 transition-all duration-300"
            >
              SMD
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {menuItems.map((item) => (
              <motion.div key={item.name} className="relative">
                <motion.a 
                  href={item.href}
                  className={`px-2 py-1 text-gray-700 dark:text-gray-300 transition-all duration-300 font-medium ${isActive(item.href) ? 'text-primary-600 dark:text-primary-400' : 'hover:text-primary-500 dark:hover:text-primary-400'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
                {/* Indicateur de section active */}
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ 
                    scaleX: isActive(item.href) ? 1 : 0, 
                    opacity: isActive(item.href) ? 1 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
            <motion.button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm hover:shadow transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="moon"
                    initial={{ y: 20, opacity: 0, rotate: 90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="text-primary-400" size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ y: 20, opacity: 0, rotate: 90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="text-primary-600" size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Effet d'ondulation lors du clic */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 dark:from-primary-700 dark:to-secondary-700 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1.5, opacity: 0.3 }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </motion.nav>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <motion.button 
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm hover:shadow transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="moon"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="text-primary-400" size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="text-primary-600" size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 shadow-sm hover:shadow transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="px-4 py-5 space-y-1"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {menuItems.map((item, index) => (
                <motion.div 
                  key={item.name} 
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: -20, opacity: 0 }
                  }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                >
                  <motion.div 
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${isActive(item.href) ? 'bg-gradient-to-b from-primary-500 to-secondary-500' : 'bg-transparent'}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isActive(item.href) ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <a
                    href={item.href}
                    className={`block pl-4 pr-2 py-3 rounded-lg ${isActive(item.href) 
                      ? 'text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-800' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'} transition-all font-medium`}
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;