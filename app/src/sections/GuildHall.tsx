import { motion } from 'framer-motion';
import {
  Trophy, Users, Flame, Star, TrendingUp, Crown, Swords,
  Target, Zap, Heart, Sparkles
} from 'lucide-react';
import { useGame } from '@/hooks/GameContext';

const CLASS_ICONS: Record<string, React.ElementType> = {
  Mage: Sparkles,
  Warrior: Swords,
  Healer: Heart,
  Rogue: Target,
  Seeker: Star,
};

export function GuildHall() {
  const { state } = useGame();
  const sortedMembers = [...state.guildMembers].sort((a, b) => b.contribution - a.contribution);
  
  return (
    <div className="min-h-screen pb-24 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: 'url(/guildhall-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-enchanted-purple via-enchanted-purple/95 to-enchanted-purple" />
      
      <div className="relative z-10 px-4 pt-4">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="w-5 h-5 text-amber-gold" />
            <h1 className="font-cinzel text-2xl font-bold text-parchment text-shadow-hero">
              Guild Hall
            </h1>
          </div>
          <p className="font-cinzel text-sm text-amber-gold">{state.guildName}</p>
          <p className="text-xs text-parchment-dark mt-1">
            {state.guildMembers.length} members • Rank: Silver
          </p>
        </motion.div>
        
        {/* Guild Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { label: 'Total Power', value: state.guildMembers.reduce((s, m) => s + m.level * 10, 0), icon: Zap, color: '#D97706' },
            { label: 'Avg Streak', value: Math.round(state.guildMembers.reduce((s, m) => s + m.streak, 0) / state.guildMembers.length), icon: Flame, color: '#EF4444' },
            { label: 'Quests Done', value: state.guildMembers.reduce((s, m) => s + m.contribution, 0), icon: Trophy, color: '#10B981' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="wood-panel p-3 text-center"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              <stat.icon className="w-5 h-5 mx-auto mb-1" style={{ color: stat.color }} />
              <p className="font-cinzel text-sm font-bold text-parchment">{stat.value}</p>
              <p className="text-[9px] text-parchment-dark uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-cinzel text-sm font-bold text-parchment mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-gold" />
            Leaderboard
          </h2>
          
          <div className="space-y-2">
            {sortedMembers.map((member, i) => {
              const ClassIcon = CLASS_ICONS[member.class] || Star;
              const isTop3 = i < 3;
              const rankColors = ['#D97706', '#9CA3AF', '#B45309'];
              
              return (
                <motion.div
                  key={member.id}
                  className={`parchment-panel p-3 flex items-center gap-3 relative overflow-hidden ${
                    isTop3 ? 'border-amber-gold/50' : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  whileHover={{ x: 4 }}
                >
                  {/* Rank badge */}
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-cinzel font-bold text-sm"
                    style={{
                      backgroundColor: isTop3 ? `${rankColors[i]}20` : '#3A2A2040',
                      border: `2px solid ${isTop3 ? rankColors[i] : '#5D4037'}`,
                      color: isTop3 ? rankColors[i] : '#9CA3AF',
                    }}
                  >
                    {i + 1}
                  </div>
                  
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-wood border-2 border-wood-light overflow-hidden flex-shrink-0">
                    <img src={`/${member.avatar}`} alt="" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-cinzel text-xs font-bold text-ink truncate">
                        {member.name}
                      </h4>
                      {isTop3 && i === 0 && <Crown className="w-3.5 h-3.5 text-amber-gold flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-ink-light">
                      <span className="flex items-center gap-0.5">
                        <ClassIcon className="w-3 h-3" />
                        {member.class}
                      </span>
                      <span>• Lvl {member.level}</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                      <Flame className="w-3 h-3 text-orange-500" />
                      <span className="font-cinzel text-[10px] font-bold text-orange-500">
                        {member.streak}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3 h-3 text-emerald-glow" />
                      <span className="font-cinzel text-[10px] text-emerald-glow">
                        {member.contribution}
                      </span>
                    </div>
                  </div>
                  
                  {/* Top 3 glow */}
                  {isTop3 && (
                    <div 
                      className="absolute inset-0 pointer-events-none rounded-xl"
                      style={{ boxShadow: `inset 0 0 20px ${rankColors[i]}10` }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Guild Challenges */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-cinzel text-sm font-bold text-parchment mb-3 flex items-center gap-2">
            <Swords className="w-4 h-4 text-amber-gold" />
            Guild Challenges
          </h2>
          
          <div className="space-y-2">
            {[
              { title: '7-Day Team Streak', progress: 5, total: 7, reward: '500 XP each' },
              { title: 'Collective Savings Goal', progress: 3200, total: 5000, reward: 'Guild Badge' },
              { title: 'Complete 100 Quests', progress: 67, total: 100, reward: 'Golden Trophy' },
            ].map((challenge, i) => (
              <motion.div
                key={challenge.title}
                className="wood-panel p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-cinzel text-xs font-bold text-parchment">{challenge.title}</h4>
                  <span className="text-[9px] text-amber-gold font-bold">{challenge.reward}</span>
                </div>
                <div className="h-2.5 bg-wood-dark rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-gold to-amber-glow"
                    initial={{ width: 0 }}
                    animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                  />
                </div>
                <p className="text-[10px] text-parchment-dark mt-1 text-right">
                  {challenge.progress} / {challenge.total}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
