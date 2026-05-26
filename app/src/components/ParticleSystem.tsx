import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

interface ParticleSystemProps {
  originX?: number;
  originY?: number;
  count?: number;
  colors?: string[];
  trigger?: number;
  type?: 'burst' | 'float' | 'confetti';
}

export function ParticleSystem({
  originX = 50,
  originY = 50,
  count = 20,
  colors = ['#D97706', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899'],
  trigger = 0,
  type = 'burst',
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleId, setParticleId] = useState(0);

  const spawnParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleId + i,
        x: originX + (Math.random() - 0.5) * 10,
        y: originY + (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 3,
        duration: Math.random() * 0.8 + 0.6,
        delay: Math.random() * 0.15,
      });
    }
    setParticleId(prev => prev + count);
    setParticles(newParticles);
    
    setTimeout(() => setParticles([]), 1500);
  }, [count, colors, originX, originY, particleId]);

  useEffect(() => {
    if (trigger > 0) {
      spawnParticles();
    }
  }, [trigger, spawnParticles]);

  if (type === 'float') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              backgroundColor: colors[i % colors.length],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[100] rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
          animate={{
            scale: 0,
            opacity: 0,
            x: (Math.random() - 0.5) * 300,
            y: type === 'confetti' ? Math.random() * 400 + 100 : -(Math.random() * 200 + 100),
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </AnimatePresence>
  );
}

// Ambient floating particles for background atmosphere
export function AmbientParticles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            backgroundColor: i % 3 === 0 ? '#D97706' : i % 3 === 1 ? '#7A8B69' : '#8B5CF6',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.05, 0.25, 0.05],
          }}
          transition={{
            duration: Math.random() * 6 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// XP flying particles on quest completion
export function XpFlyer({ xp, originX, originY, onComplete }: { xp: number; originX: number; originY: number; onComplete?: () => void }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-[90] font-cinzel font-bold text-amber-gold text-lg"
      style={{ left: originX, top: originY }}
      initial={{ opacity: 1, scale: 0.5, y: 0 }}
      animate={{ opacity: 0, scale: 1.2, y: -80 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      onAnimationComplete={onComplete}
    >
      +{xp} XP
    </motion.div>
  );
}
