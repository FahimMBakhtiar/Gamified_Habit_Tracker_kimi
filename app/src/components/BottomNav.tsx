import { motion } from 'framer-motion';
import { Scroll, Shield, Swords, Coins, Users, Map } from 'lucide-react';
import { useGame } from '@/hooks/GameContext';
import type { ScreenName } from '@/types/game';

const NAV_ITEMS: { screen: ScreenName; label: string; icon: React.ElementType }[] = [
  { screen: 'questboard', label: 'Quests', icon: Scroll },
  { screen: 'character', label: 'Hero', icon: Shield },
  { screen: 'battle', label: 'Battle', icon: Swords },
  { screen: 'treasury', label: 'Vault', icon: Coins },
  { screen: 'guildhall', label: 'Guild', icon: Users },
  { screen: 'worldmap', label: 'World', icon: Map },
];

export function BottomNav() {
  const { currentScreen, setScreen } = useGame();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-wood/95 backdrop-blur-md border-t-[4px] border-wood-dark">
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = currentScreen === item.screen;
          const Icon = item.icon;
          
          return (
            <motion.button
              key={item.screen}
              className="relative flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[56px]"
              onClick={() => setScreen(item.screen)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Active glow */}
              {isActive && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-amber-gold/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  color: isActive ? '#D97706' : '#D4C4A8',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 1.5} />
              </motion.div>
              
              <motion.span
                className="font-cinzel text-[10px] tracking-wider font-bold"
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  color: isActive ? '#D97706' : '#D4C4A8',
                }}
              >
                {item.label}
              </motion.span>
              
              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-0.5 w-8 h-0.5 bg-amber-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

// Floating Action Button for creating new quests
export function FAB() {
  const { setScreen } = useGame();
  
  return (
    <motion.button
      className="fixed bottom-24 right-4 z-50 w-14 h-14 bg-amber-gold rounded-full border-[3px] border-amber-dark shadow-3d flex items-center justify-center"
      onClick={() => setScreen('questboard')}
      whileHover={{ scale: 1.1, boxShadow: '0 8px 0px #2A1F15, 0 0 20px rgba(217, 119, 6, 0.5)' }}
      whileTap={{ scale: 0.95, y: 4, boxShadow: '0 4px 0px #2A1F15' }}
      animate={{ y: [0, -4, 0] }}
      transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
    >
      <Swords className="w-6 h-6 text-parchment-light" />
    </motion.button>
  );
}
