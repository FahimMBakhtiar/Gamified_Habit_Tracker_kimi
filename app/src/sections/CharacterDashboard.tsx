import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star, TrendingUp, Lock, Zap,
  Footprints, Calendar, BookOpen, Shield, Crown, Sun,
  Award, Sparkles
} from 'lucide-react';
import { useGame } from '@/hooks/GameContext';
import { STAT_NAMES, CATEGORY_COLORS } from '@/types/game';

const ACHIEVEMENT_ICONS: Record<string, React.ElementType> = {
  Footprints, Calendar, BookOpen, Shield, TrendingUp, Crown, Star, Sun,
};

const RARITY_COLORS: Record<string, string> = {
  common: '#9CA3AF',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#D97706',
};

function StatVial({ label, value, max, color, delay }: { 
  label: string; value: number; max: number; color: string; delay: number 
}) {
  const percent = (value / max) * 100;
  
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <span className="font-cinzel text-xs font-bold w-20 text-right text-parchment-dark uppercase tracking-wider flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 h-6 stat-vial relative">
        <motion.div
          className="stat-vial-fill"
          style={{
            background: `linear-gradient(180deg, ${color}, ${color}88)`,
            height: `${percent}%`,
            boxShadow: `0 0 10px ${color}40`,
          }}
          initial={{ height: 0 }}
          animate={{ height: `${percent}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
        >
          {/* Liquid shimmer */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 rounded-full"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.3), transparent)`,
            }}
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-cinzel text-[10px] font-bold text-parchment drop-shadow-lg">
            {value}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function SkillNode({ skill, onUpgrade, gold }: {
  skill: ReturnType<typeof useGame>['state']['skills'][0];
  onUpgrade: () => void;
  gold: number;
}) {
  const canAfford = gold >= skill.cost;
  const isMaxed = skill.level >= skill.maxLevel;
  
  return (
    <motion.div
      className={`p-3 rounded-xl border-2 relative overflow-hidden ${
        skill.unlocked ? 'bg-wood/60 border-wood-light' : 'bg-wood-dark/40 border-wood-dark opacity-50'
      }`}
      whileHover={skill.unlocked && !isMaxed ? { y: -2, boxShadow: `0 8px 0px #2A1F15, 0 0 15px ${CATEGORY_COLORS[skill.category]}30` } : {}}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${CATEGORY_COLORS[skill.category]}30` }}
          >
            <Zap className="w-4 h-4" style={{ color: CATEGORY_COLORS[skill.category] }} />
          </div>
          <div>
            <h4 className="font-cinzel text-xs font-bold text-parchment">{skill.name}</h4>
            <p className="text-[10px] text-parchment-dark">{skill.description}</p>
          </div>
        </div>
        {isMaxed ? (
          <Star className="w-4 h-4 text-amber-gold" />
        ) : (
          <Lock className="w-4 h-4 text-wood-light" />
        )}
      </div>
      
      {/* Level dots */}
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: skill.maxLevel }).map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: i < skill.level ? CATEGORY_COLORS[skill.category] : '#3A2A20',
              boxShadow: i < skill.level ? `0 0 4px ${CATEGORY_COLORS[skill.category]}` : 'none',
            }}
          />
        ))}
        <span className="text-[10px] text-parchment-dark ml-1">
          {skill.level}/{skill.maxLevel}
        </span>
      </div>
      
      {/* Upgrade button */}
      {skill.unlocked && !isMaxed && (
        <motion.button
          className={`w-full py-2 rounded-lg font-cinzel text-[10px] font-bold uppercase tracking-wider border-2 transition-colors ${
            canAfford
              ? 'bg-amber-gold/20 border-amber-gold text-amber-gold hover:bg-amber-gold/30'
              : 'bg-wood-dark border-wood-light text-wood-light cursor-not-allowed'
          }`}
          onClick={onUpgrade}
          whileTap={canAfford ? { scale: 0.98 } : {}}
          disabled={!canAfford}
        >
          {canAfford ? `Upgrade - ${skill.cost}g` : `Need ${skill.cost}g`}
        </motion.button>
      )}
    </motion.div>
  );
}

export function CharacterDashboard() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState<'stats' | 'skills' | 'achievements'>('stats');
  
  const statEntries = Object.entries(state.stats);
  const statColors = [
    '#EF4444', '#3B82F6', '#10B981', '#D97706', '#8B5CF6', 
    '#EC4899', '#06B6D4', '#F59E0B', '#6366F1', '#14B8A6'
  ];
  
  return (
    <div className="min-h-screen pb-24 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: 'url(/skilltree-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-enchanted-purple via-enchanted-purple/95 to-enchanted-purple" />
      
      <div className="relative z-10 px-4 pt-4">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Avatar */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
            transition={{ rotate: { duration: 0.5 } }}
          >
            <div className="w-20 h-20 rounded-full border-[3px] border-amber-gold overflow-hidden shadow-glow bg-wood">
              <img 
                src="/avatar-hero.png" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-gold rounded-full border-2 border-wood-dark flex items-center justify-center">
              <span className="font-cinzel text-[10px] font-bold text-wood">
                {state.level}
              </span>
            </div>
          </motion.div>
          
          <div>
            <h1 className="font-cinzel text-xl font-bold text-parchment text-shadow-hero">
              {state.playerName}
            </h1>
            <p className="text-sm text-amber-gold font-bold">
              {state.playerClass} • Level {state.level}
            </p>
            <p className="text-xs text-parchment-dark mt-0.5">
              Streak: {state.streak} days • Best: {state.maxStreak}
            </p>
          </div>
        </motion.div>
        
        {/* Tab navigation */}
        <div className="flex gap-2 mb-4">
          {(['stats', 'skills', 'achievements'] as const).map(tab => (
            <motion.button
              key={tab}
              className={`flex-1 py-2.5 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                activeTab === tab
                  ? 'bg-amber-gold border-amber-dark text-parchment shadow-3d'
                  : 'bg-wood border-wood-light text-parchment-dark hover:bg-wood-light'
              }`}
              onClick={() => setActiveTab(tab)}
              whileTap={{ scale: 0.98 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
        
        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <motion.div
            className="wood-panel p-4 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-cinzel text-sm font-bold text-parchment mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-gold" />
              Hero Attributes
            </h2>
            <div className="space-y-3">
              {statEntries.map(([key, value], i) => (
                <StatVial
                  key={key}
                  label={STAT_NAMES[key] || key}
                  value={value}
                  max={100}
                  color={statColors[i % statColors.length]}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {state.skills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <SkillNode
                  skill={skill}
                  gold={state.gold}
                  onUpgrade={() => dispatch({ type: 'UPGRADE_SKILL', skillId: skill.id })}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {state.achievements.map((achievement, i) => {
              const Icon = ACHIEVEMENT_ICONS[achievement.icon] || Award;
              const rarityColor = RARITY_COLORS[achievement.rarity];
              
              return (
                <motion.div
                  key={achievement.id}
                  className={`parchment-panel p-3 flex items-center gap-3 ${
                    !achievement.unlocked ? 'opacity-50' : ''
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: achievement.unlocked ? 1 : 0.5, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={achievement.unlocked ? { y: -2 } : {}}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: achievement.unlocked ? `${rarityColor}20` : '#3A2A2040',
                      border: `2px solid ${achievement.unlocked ? rarityColor : '#3A2A20'}`,
                    }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: achievement.unlocked ? rarityColor : '#5D4037' }} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-cinzel text-xs font-bold text-ink truncate">
                        {achievement.title}
                      </h4>
                      <span 
                        className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${rarityColor}20`, color: rarityColor }}
                      >
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-[10px] text-ink-light">{achievement.description}</p>
                    {achievement.unlockedAt && (
                      <p className="text-[9px] text-amber-gold mt-0.5">
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {!achievement.unlocked && <Lock className="w-4 h-4 text-wood-light flex-shrink-0" />}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
