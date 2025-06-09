import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  velocity: {
    x: number;
    y: number;
  };
}

interface InteractiveParticlesProps {
  count?: number;
  maxDistance?: number;
  colors?: string[];
  speedFactor?: number;
  className?: string;
}

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({
  count = 25,
  maxDistance = 150,
  colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'],
  speedFactor = 0.03,
  className = '',
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState<{x: number, y: number} | null>(null);
  
  // Initialiser les particules
  useEffect(() => {
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // position en pourcentage pour être responsive
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
        velocity: {
          x: (Math.random() - 0.5) * 0.1,
          y: (Math.random() - 0.5) * 0.1
        }
      });
    }
    
    setParticles(newParticles);
  }, [count, colors]);
  
  // Gérer le mouvement du curseur
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = document.getElementById('particles-container')?.getBoundingClientRect();
      if (!bounds) return;
      
      // Convertir en pourcentage relatif au conteneur
      const x = ((e.clientX - bounds.left) / bounds.width) * 100;
      const y = ((e.clientY - bounds.top) / bounds.height) * 100;
      
      if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
        setMousePosition({ x, y });
      } else {
        setMousePosition(null);
      }
    };
    
    const handleMouseLeave = () => {
      setMousePosition(null);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Animer les particules
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          // Calculer la nouvelle position basée sur la vélocité
          let newX = particle.x + particle.velocity.x;
          let newY = particle.y + particle.velocity.y;
          
          // Rebondir sur les bords
          if (newX <= 0 || newX >= 100) {
            particle.velocity.x *= -1;
            newX = Math.max(0, Math.min(100, newX));
          }
          
          if (newY <= 0 || newY >= 100) {
            particle.velocity.y *= -1;
            newY = Math.max(0, Math.min(100, newY));
          }
          
          // Ajuster la vélocité en fonction de la position de la souris
          if (mousePosition) {
            const dx = mousePosition.x - particle.x;
            const dy = mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
              const factor = 1 - (distance / maxDistance);
              
              return {
                ...particle,
                x: newX,
                y: newY,
                velocity: {
                  x: particle.velocity.x + dx * factor * speedFactor,
                  y: particle.velocity.y + dy * factor * speedFactor
                }
              };
            }
          }
          
          return {
            ...particle,
            x: newX,
            y: newY
          };
        });
      });
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, [particles, mousePosition, maxDistance, speedFactor]);
  
  return (
    <div id="particles-container" className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ maxWidth: '100vw' }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          animate={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            scale: mousePosition ? [1, 1.2, 1] : 1,
          }}
          transition={{ 
            left: { duration: 0.5, ease: "linear" }, 
            top: { duration: 0.5, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: 'blur(1px)',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveParticles;
