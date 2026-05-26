import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Map, TreePine, Home, Castle, Flower2, Sparkles, Lock,
  ChevronRight, Star, TrendingUp, Zap
} from 'lucide-react';
import { useGame } from '@/hooks/GameContext';

const WORLD_EVOLUTIONS = [
  {
    level: 1,
    name: 'Humble Beginnings',
    description: 'A small campsite with a single tent',
    required: 0,
    unlocked: true,
    icon: Home,
  },
  {
    level: 2,
    name: 'Growing Settlement',
    description: 'Wooden cottages and a small garden',
    required: 25,
    unlocked: false,
    icon: TreePine,
  },
  {
    level: 3,
    name: 'Bustling Village',
    description: 'Marketplace, farms, and a community hall',
    required: 50,
    unlocked: false,
    icon: Home,
  },
  {
    level: 4,
    name: 'Flourishing Town',
    description: 'Windmills, workshops, and a library',
    required: 75,
    unlocked: false,
    icon: Castle,
  },
  {
    level: 5,
    name: 'Magical Kingdom',
    description: 'A grand castle with enchanted gardens',
    required: 100,
    unlocked: false,
    icon: Castle,
  },
];

const BIOME_FEATURES = [
  { name: 'Enchanted Forest', unlocked: true, percent: 80, color: '#10B981' },
  { name: 'Crystal Caves', unlocked: true, percent: 45, color: '#8B5CF6' },
  { name: 'Golden Fields', unlocked: true, percent: 60, color: '#D97706' },
  { name: 'Mystic Lake', unlocked: false, percent: 20, color: '#3B82F6' },
  { name: 'Dragon Peak', unlocked: false, percent: 0, color: '#EF4444' },
  { name: 'Starlight Garden', unlocked: false, percent: 0, color: '#EC4899' },
];

export function WorldMap() {
  const { state } = useGame();
  const [selectedBiome, setSelectedBiome] = useState<number | null>(null);
  
  const evolutionPercent = state.worldEvolution;
  const currentEvolution = [...WORLD_EVOLUTIONS].reverse().find((e: typeof WORLD_EVOLUTIONS[0]) => evolutionPercent >= e.required) || WORLD_EVOLUTIONS[0];
  const nextEvolution = WORLD_EVOLUTIONS.find(e => evolutionPercent < e.required);
  
  return (
    <div className="min-h-screen pb-24 relative">
      {/* Parallax background layers */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: evolutionPercent >= 50 
            ? 'url(/world-evolved.jpg)' 
            : 'url(/diorama-hero.jpg)',
          opacity: 0.25,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-enchanted-purple/70 via-enchanted-purple/85 to-enchanted-purple" />
      
      <div className="relative z-10 px-4 pt-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Map className="w-5 h-5 text-amber-gold" />
            <h1 className="font-cinzel text-2xl font-bold text-parchment text-shadow-hero">
              World Map
            </h1>
          </div>
          <p className="text-sm text-amber-gold">
            Your world evolves with your habits
          </p>
        </motion.div>
        
        {/* World Evolution Progress */}
        <motion.div
          className="mt-4 wood-panel p-4 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Ambient glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl"
            style={{ backgroundColor: `${currentEvolution ? '#D97706' : '#7A8B69'}15` }}
          />
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-amber-gold/20 border-2 border-amber-gold flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-gold" />
            </div>
            <div>
              <h2 className="font-cinzel text-sm font-bold text-parchment">
                {currentEvolution.name}
              </h2>
              <p className="text-xs text-parchment-dark">{currentEvolution.description}</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-4 bg-wood-dark rounded-full overflow-hidden border border-wood-light">
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: 'linear-gradient(90deg, #7A8B69, #D97706, #F59E0B)',
                boxShadow: '0 0 15px rgba(217, 119, 6, 0.4)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${evolutionPercent}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-parchment-dark">World Level {state.worldLevel}</span>
            <span className="font-cinzel text-xs font-bold text-amber-gold">{evolutionPercent}%</span>
          </div>
          
          {nextEvolution && (
            <p className="text-[10px] text-parchment-dark mt-1">
              Next: {nextEvolution.name} at {nextEvolution.required}%
            </p>
          )}
        </motion.div>
        
        {/* Evolution Timeline */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-cinzel text-sm font-bold text-parchment mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-gold" />
            Evolution Timeline
          </h2>
          
          <div className="relative pl-6 space-y-3">
            {/* Vertical line */}
            <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-wood-light" />
            
            {WORLD_EVOLUTIONS.map((evo, i) => {
              const isUnlocked = evolutionPercent >= evo.required;
              const Icon = evo.icon;
              
              return (
                <motion.div
                  key={evo.level}
                  className="relative flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.1 }}
                >
                  {/* Node dot */}
                  <div 
                    className={`absolute left-[-22px] w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 ${
                      isUnlocked 
                        ? 'bg-amber-gold border-amber-dark' 
                        : 'bg-wood border-wood-light'
                    }`}
                  >
                    {isUnlocked ? (
                      <Sparkles className="w-2.5 h-2.5 text-parchment" />
                    ) : (
                      <Lock className="w-2.5 h-2.5 text-wood-light" />
                    )}
                  </div>
                  
                  <div className={`parchment-panel p-3 flex-1 ${isUnlocked ? '' : 'opacity-50'}`}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: isUnlocked ? '#D97706' : '#5D4037' }} />
                      <h4 className="font-cinzel text-xs font-bold text-ink">{evo.name}</h4>
                      {isUnlocked && <Sparkles className="w-3 h-3 text-amber-gold" />}
                    </div>
                    <p className="text-[10px] text-ink-light mt-0.5">{evo.description}</p>
                    {!isUnlocked && (
                      <p className="text-[9px] text-parchment-dark mt-1">Requires {evo.required}% evolution</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Biome Features */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-cinzel text-sm font-bold text-parchment mb-3 flex items-center gap-2">
            <Flower2 className="w-4 h-4 text-amber-gold" />
            Biome Features
          </h2>
          
          <div className="grid grid-cols-2 gap-2">
            {BIOME_FEATURES.map((biome, i) => (
              <motion.button
                key={biome.name}
                className={`parchment-panel p-3 text-left transition-all ${
                  selectedBiome === i ? 'ring-2 ring-amber-gold' : ''
                } ${biome.unlocked ? '' : 'opacity-50'}`}
                onClick={() => setSelectedBiome(selectedBiome === i ? null : i)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: biome.unlocked ? 1 : 0.5, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.06 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${biome.color}20` }}
                  >
                    {biome.unlocked ? (
                      <TreePine className="w-3.5 h-3.5" style={{ color: biome.color }} />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-wood-light" />
                    )}
                  </div>
                  <span className="font-cinzel text-[10px] font-bold text-ink">{biome.name}</span>
                </div>
                
                <div className="h-1.5 bg-wood-dark rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ 
                      backgroundColor: biome.color,
                      boxShadow: `0 0 6px ${biome.color}40`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${biome.percent}%` }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                  />
                </div>
                <p className="text-[9px] text-ink-light mt-1">{biome.percent}% grown</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* World Tips */}
        <motion.div
          className="mt-6 mb-4 wood-panel p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-cinzel text-xs font-bold text-parchment mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-gold" />
            How to Evolve Your World
          </h3>
          <div className="space-y-1.5">
            {[
              'Complete daily quests consistently',
              'Maintain streaks for bonus evolution',
              'Upgrade skills in the Skill Tree',
              'Contribute to guild challenges',
              'Track your finances regularly',
            ].map((tip, i) => (
              <motion.p
                key={tip}
                className="text-xs text-parchment-dark flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 + i * 0.05 }}
              >
                <ChevronRight className="w-3 h-3 text-amber-gold flex-shrink-0" />
                {tip}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
