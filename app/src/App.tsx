import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameProvider, useGame } from '@/hooks/GameContext';
import { AmbientParticles } from '@/components/ParticleSystem';
import { XPBar } from '@/components/XPBar';
import { BottomNav, FAB } from '@/components/BottomNav';
import { QuestBoard } from '@/sections/QuestBoard';
import { CharacterDashboard } from '@/sections/CharacterDashboard';
import { Treasury } from '@/sections/Treasury';
import { GuildHall } from '@/sections/GuildHall';
import { WorldMap } from '@/sections/WorldMap';
import { BattleMode } from '@/sections/BattleMode';
import type { ScreenName } from '@/types/game';

const SCREEN_COMPONENTS: Record<ScreenName, React.ComponentType> = {
  questboard: QuestBoard,
  character: CharacterDashboard,
  treasury: Treasury,
  guildhall: GuildHall,
  worldmap: WorldMap,
  battle: BattleMode,
};

function ScreenRouter() {
  const { currentScreen } = useGame();
  const ScreenComponent = SCREEN_COMPONENTS[currentScreen];
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        <ScreenComponent />
      </motion.div>
    </AnimatePresence>
  );
}

function GameShell() {
  const { state } = useGame();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(state.level);
  
  useEffect(() => {
    if (state.level > prevLevel) {
      setShowLevelUp(true);
      setPrevLevel(state.level);
      const timer = setTimeout(() => setShowLevelUp(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.level, prevLevel]);
  
  return (
    <div className="min-h-screen bg-enchanted-purple relative overflow-hidden">
      {/* Ambient floating particles */}
      <AmbientParticles />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-enchanted-purple/90 backdrop-blur-md border-b border-wood/50">
        <XPBar />
      </header>
      
      {/* Main content */}
      <main className="relative">
        <ScreenRouter />
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
      <FAB />
      
      {/* Level Up Modal */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              {/* Banner drop */}
              <motion.div
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.1 }}
              >
                <div className="bg-gradient-to-b from-amber-gold to-amber-dark px-12 py-6 rounded-2xl border-[4px] border-wood-dark shadow-2xl">
                  <motion.p
                    className="font-cinzel text-sm text-parchment uppercase tracking-[0.3em] mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Level Up!
                  </motion.p>
                  <motion.h2
                    className="font-cinzel text-5xl font-bold text-parchment text-shadow-hero"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
                  >
                    Level {state.level}
                  </motion.h2>
                </div>
              </motion.div>
              
              {/* Particle burst */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2 }}
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-amber-gold"
                    initial={{ x: 0, y: 0, scale: 1 }}
                    animate={{
                      x: (Math.random() - 0.5) * 400,
                      y: (Math.random() - 0.5) * 400,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 1.5, delay: i * 0.02 }}
                  />
                ))}
              </motion.div>
              
              {/* Stats gained */}
              <motion.div
                className="mt-6 flex items-center justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-center">
                  <p className="font-cinzel text-lg font-bold text-amber-gold">+50</p>
                  <p className="text-xs text-parchment-dark">Max Energy</p>
                </div>
                <div className="text-center">
                  <p className="font-cinzel text-lg font-bold text-emerald-glow">+10</p>
                  <p className="text-xs text-parchment-dark">All Stats</p>
                </div>
                <div className="text-center">
                  <p className="font-cinzel text-lg font-bold text-amber-gold">+100</p>
                  <p className="text-xs text-parchment-dark">Gold Bonus</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameShell />
    </GameProvider>
  );
}

export default App;
