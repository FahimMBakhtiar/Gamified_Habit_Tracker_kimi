import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Circle, Flame, BookOpen, Sparkles, Heart,
  Wallet, Shield, Target, HeartHandshake, Dumbbell, Timer,
  Zap, Star, TrendingUp
} from 'lucide-react';
import { useGame } from '@/hooks/GameContext';
import { ParticleSystem, XpFlyer } from '@/components/ParticleSystem';
import type { Quest } from '@/types/game';
import { CATEGORY_COLORS } from '@/types/game';

const ICON_MAP: Record<string, React.ElementType> = {
  Flame, BookOpen, Sparkles, Heart, Wallet, Shield, Target, HeartHandshake, Dumbbell, Timer, Zap, Star, TrendingUp,
};

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: 'Easy', color: '#10B981' },
  medium: { label: 'Med', color: '#D97706' },
  hard: { label: 'Hard', color: '#EF4444' },
  legendary: { label: 'LEGEND', color: '#8B5CF6' },
};

function QuestCard({ quest, onComplete }: { quest: Quest; onComplete: (quest: Quest, rect: DOMRect) => void }) {
  const Icon = ICON_MAP[quest.icon] || Star;
  const diffInfo = DIFFICULTY_LABELS[quest.difficulty];
  const categoryColor = CATEGORY_COLORS[quest.category];
  
  const handleComplete = (e: React.MouseEvent) => {
    if (quest.completed) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    onComplete(quest, rect);
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      className={`card-fantasy p-4 relative overflow-hidden ${
        quest.completed ? 'opacity-60' : ''
      }`}
      whileHover={{ y: -2, boxShadow: '0 12px 0px #2A1F15' }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Category accent bar */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: categoryColor }}
      />
      
      <div className="flex items-start gap-3 pl-2">
        {/* Checkbox / Complete button */}
        <motion.button
          className="flex-shrink-0 mt-0.5"
          onClick={handleComplete}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
        >
          {quest.completed ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <CheckCircle2 className="w-7 h-7 text-emerald-glow" />
            </motion.div>
          ) : (
            <Circle className="w-7 h-7 text-wood-light hover:text-amber-gold transition-colors" />
          )}
        </motion.button>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-cinzel font-bold text-sm truncate ${
              quest.completed ? 'line-through text-ink-light' : 'text-ink'
            }`}>
              {quest.title}
            </h3>
            <span 
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ 
                backgroundColor: `${diffInfo.color}20`,
                color: diffInfo.color,
              }}
            >
              {diffInfo.label}
            </span>
          </div>
          
          <p className="text-xs text-ink-light leading-relaxed mb-2 line-clamp-2">
            {quest.description}
          </p>
          
          {/* Footer row */}
          <div className="flex items-center gap-3">
            {/* Category badge */}
            <div className="flex items-center gap-1">
              <Icon className="w-3.5 h-3.5" style={{ color: categoryColor }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: categoryColor }}>
                {quest.category}
              </span>
            </div>
            
            {/* Streak */}
            {quest.streak > 0 && (
              <div className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-[10px] font-bold text-orange-500">
                  {quest.streak}d
                </span>
              </div>
            )}
            
            {/* XP Reward */}
            <div className="flex items-center gap-1 ml-auto">
              <Zap className="w-3.5 h-3.5 text-amber-gold" />
              <span className="text-[10px] font-bold text-amber-gold">
                +{quest.xpReward} XP
              </span>
              <span className="text-[10px] text-ink-light">
                / {quest.goldReward}g
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Glow effect on hover for incomplete */}
      {!quest.completed && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            boxShadow: `inset 0 0 20px ${categoryColor}15`,
          }}
        />
      )}
    </motion.div>
  );
}

export function QuestBoard() {
  const { state, dispatch } = useGame();
  const [particles, setParticles] = useState(0);
  const [xpFlyer, setXpFlyer] = useState<{ xp: number; originX: number; originY: number } | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const handleComplete = useCallback((quest: Quest, rect: DOMRect) => {
    dispatch({ type: 'COMPLETE_QUEST', questId: quest.id });
    setParticles(prev => prev + 1);
    setXpFlyer({
      xp: quest.xpReward,
      originX: rect.left + rect.width / 2,
      originY: rect.top,
    });
    setTimeout(() => setXpFlyer(null), 1200);
  }, [dispatch]);
  
  const filteredQuests = filter === 'all' 
    ? state.quests 
    : filter === 'completed'
    ? state.quests.filter(q => q.completed)
    : state.quests.filter(q => !q.completed);
  
  const completedCount = state.quests.filter(q => q.completed).length;
  const totalCount = state.quests.length;
  
  return (
    <div className="min-h-screen pb-24 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: 'url(/questboard-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-enchanted-purple/80 via-enchanted-purple/90 to-enchanted-purple" />
      
      {/* Floating particles */}
      <ParticleSystem trigger={particles} count={25} type="burst" />
      {xpFlyer && <XpFlyer {...xpFlyer} />}
      
      {/* Content */}
      <div className="relative z-10 px-4 pt-4">
        {/* Header */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-cinzel text-2xl font-bold text-parchment text-shadow-hero mb-1">
            Quest Board
          </h1>
          <p className="text-sm text-parchment-dark">
            {completedCount}/{totalCount} quests completed today
          </p>
        </motion.div>
        
        {/* Progress ring */}
        <motion.div 
          className="flex items-center gap-4 mb-4 parchment-panel p-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="#3A2A20" strokeWidth="5" />
              <motion.circle
                cx="32" cy="32" r="28" fill="none"
                stroke="#D97706" strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                animate={{ 
                  strokeDashoffset: 2 * Math.PI * 28 * (1 - completedCount / totalCount) 
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-cinzel font-bold text-sm text-amber-gold">
                {Math.round((completedCount / totalCount) * 100)}%
              </span>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-cinzel text-sm font-bold text-ink">
              Daily Progress
            </p>
            <p className="text-xs text-ink-light">
              {completedCount === totalCount 
                ? 'All quests complete! Legendary!' 
                : `${totalCount - completedCount} quests remaining`}
            </p>
          </div>
        </motion.div>
        
        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {['all', 'active', 'completed'].map(f => (
            <motion.button
              key={f}
              className={`px-4 py-2 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                filter === f 
                  ? 'bg-amber-gold border-amber-dark text-parchment' 
                  : 'bg-wood border-wood-light text-parchment-dark hover:bg-wood-light'
              }`}
              onClick={() => setFilter(f)}
              whileTap={{ scale: 0.95 }}
            >
              {f}
            </motion.button>
          ))}
        </div>
        
        {/* Quest List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredQuests.map((quest, index) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <QuestCard quest={quest} onComplete={handleComplete} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredQuests.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sparkles className="w-12 h-12 text-amber-gold/50 mx-auto mb-3" />
            <p className="font-cinzel text-parchment-dark text-lg">
              No quests here!
            </p>
            <p className="text-parchment-dark/60 text-sm mt-1">
              Create a new quest to begin your adventure
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
