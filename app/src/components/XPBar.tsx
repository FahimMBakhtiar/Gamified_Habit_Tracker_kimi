import { motion } from 'framer-motion';
import { Star, Coins, Flame } from 'lucide-react';
import { useGame } from '@/hooks/GameContext';

export function XPBar() {
  const { state } = useGame();
  const progress = (state.xp / state.xpToNext) * 100;
  
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      {/* Level Badge */}
      <motion.div 
        className="relative flex-shrink-0"
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-12 h-12 rounded-full bg-amber-gold border-[3px] border-amber-dark flex items-center justify-center shadow-glow">
          <Star className="w-5 h-5 text-parchment-light absolute" />
          <span className="font-cinzel font-bold text-sm text-parchment-light relative z-10 mt-1">
            {state.level}
          </span>
        </div>
      </motion.div>
      
      {/* XP Progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-cinzel text-xs text-amber-gold font-bold tracking-wider">
            LEVEL {state.level}
          </span>
          <span className="font-quattro text-xs text-parchment-dark">
            {state.xp} / {state.xpToNext} XP
          </span>
        </div>
        <div className="h-4 bg-wood-dark rounded-full overflow-hidden border-2 border-wood-light shadow-inner">
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: 'linear-gradient(90deg, #D97706, #F59E0B, #D97706)',
              boxShadow: '0 0 10px rgba(217, 119, 6, 0.5), inset 0 1px 2px rgba(255,255,255,0.3)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Gold */}
      <motion.div 
        className="flex items-center gap-1.5 flex-shrink-0"
        whileHover={{ scale: 1.05 }}
      >
        <Coins className="w-5 h-5 text-amber-gold" />
        <span className="font-cinzel font-bold text-sm text-amber-gold">
          {state.gold.toLocaleString()}
        </span>
      </motion.div>
      
      {/* Streak */}
      <motion.div 
        className="flex items-center gap-1.5 flex-shrink-0"
        whileHover={{ scale: 1.05 }}
      >
        <Flame className="w-5 h-5 text-orange-500" />
        <span className="font-cinzel font-bold text-sm text-orange-400">
          {state.streak}
        </span>
      </motion.div>
    </div>
  );
}
