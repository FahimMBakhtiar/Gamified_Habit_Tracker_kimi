import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Swords, Pause, Play, RotateCcw, Flag, Zap, Shield,
  Sparkles, Star, Flame
} from 'lucide-react';
import { useGame } from '@/hooks/GameContext';
import { ParticleSystem } from '@/components/ParticleSystem';

const PRESET_DURATIONS = [
  { label: 'Quick', minutes: 5, desc: '5 min burst' },
  { label: 'Focus', minutes: 15, desc: '15 min session' },
  { label: 'Deep', minutes: 25, desc: '25 min pomodoro' },
  { label: 'Epic', minutes: 45, desc: '45 min marathon' },
];

export function BattleMode() {
  const { state, dispatch } = useGame();
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [showVictory, setShowVictory] = useState(false);
  const [particles, setParticles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const totalSeconds = selectedDuration * 60;
  const progress = ((totalSeconds - timeRemaining) / totalSeconds) * 100;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setShowVictory(true);
            setParticles(prev => prev + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeRemaining]);
  
  const startTimer = () => {
    setTimeRemaining(selectedDuration * 60);
    setIsRunning(true);
    setShowVictory(false);
  };
  
  const pauseTimer = () => {
    setIsRunning(false);
  };
  
  const resumeTimer = () => {
    setIsRunning(true);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(selectedDuration * 60);
    setShowVictory(false);
  };
  
  const handleVictoryClose = () => {
    setShowVictory(false);
    dispatch({ type: 'COMPLETE_TIMER' });
    // Award XP
    dispatch({ type: 'COMPLETE_QUEST', questId: state.quests[0]?.id || '' });
  };
  
  // SVG circle for timer ring
  const circleRadius = 120;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference * (1 - progress / 100);
  
  return (
    <div className="min-h-screen pb-24 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/dungeon-battle.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-enchanted-purple via-enchanted-purple/90 to-enchanted-purple" />
      
      <ParticleSystem trigger={particles} count={30} type="confetti" />
      
      <div className="relative z-10 px-4 pt-4 flex flex-col items-center min-h-screen">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2">
            <Swords className="w-5 h-5 text-amber-gold" />
            <h1 className="font-cinzel text-2xl font-bold text-parchment text-shadow-hero">
              Dungeon Battle
            </h1>
          </div>
          <p className="text-sm text-parchment-dark mt-1">
            Focus to defeat the monster!
          </p>
        </motion.div>
        
        {!showVictory ? (
          <>
            {/* Duration selector */}
            {!isRunning && timeRemaining === totalSeconds && (
              <motion.div
                className="grid grid-cols-2 gap-2 w-full max-w-xs mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {PRESET_DURATIONS.map(d => (
                  <motion.button
                    key={d.minutes}
                    className={`p-3 rounded-xl border-2 font-cinzel text-xs font-bold transition-all ${
                      selectedDuration === d.minutes
                        ? 'bg-amber-gold border-amber-dark text-parchment shadow-3d'
                        : 'bg-wood border-wood-light text-parchment-dark hover:bg-wood-light'
                    }`}
                    onClick={() => {
                      setSelectedDuration(d.minutes);
                      setTimeRemaining(d.minutes * 60);
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="block text-sm">{d.label}</span>
                    <span className="text-[9px] opacity-70">{d.desc}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
            
            {/* Timer Circle */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <svg width="280" height="280" className="-rotate-90">
                {/* Background circle */}
                <circle
                  cx="140" cy="140" r={circleRadius}
                  fill="none" stroke="#3A2A20" strokeWidth="8"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="140" cy="140" r={circleRadius}
                  fill="none"
                  stroke="url(#timerGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circleCircumference}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.5 }}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(217, 119, 6, 0.5))',
                  }}
                />
                <defs>
                  <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Timer display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  className="font-cinzel text-5xl font-bold text-parchment text-shadow-hero tabular-nums"
                  key={timeRemaining}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </motion.div>
                <p className="text-xs text-parchment-dark mt-1">
                  {isRunning ? 'Focusing...' : 'Ready to battle'}
                </p>
              </div>
              
              {/* Monster indicator (decorative) */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: progress > 50 ? [0.5, 1, 0.5] : 0.3,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-1 text-[10px] text-ruby font-cinzel">
                  <Shield className="w-3 h-3" />
                  <span>Slime HP: {Math.max(0, 100 - Math.round(progress))}%</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Control Buttons */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {!isRunning ? (
                <>
                  {timeRemaining !== totalSeconds && (
                    <motion.button
                      className="w-14 h-14 rounded-full bg-wood border-2 border-wood-light flex items-center justify-center"
                      onClick={resetTimer}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <RotateCcw className="w-6 h-6 text-parchment-dark" />
                    </motion.button>
                  )}
                  
                  <motion.button
                    className="w-20 h-20 rounded-full bg-amber-gold border-[3px] border-amber-dark flex items-center justify-center shadow-glow"
                    onClick={timeRemaining === totalSeconds ? startTimer : resumeTimer}
                    whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(217, 119, 6, 0.6)' }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(217, 119, 6, 0.3)',
                        '0 0 30px rgba(217, 119, 6, 0.5)',
                        '0 0 20px rgba(217, 119, 6, 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="w-8 h-8 text-parchment ml-1" fill="currentColor" />
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    className="w-14 h-14 rounded-full bg-wood border-2 border-wood-light flex items-center justify-center"
                    onClick={resetTimer}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Flag className="w-6 h-6 text-ruby" />
                  </motion.button>
                  
                  <motion.button
                    className="w-20 h-20 rounded-full bg-amber-gold border-[3px] border-amber-dark flex items-center justify-center shadow-glow"
                    onClick={pauseTimer}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Pause className="w-8 h-8 text-parchment" />
                  </motion.button>
                </>
              )}
            </motion.div>
            
            {/* Battle stats */}
            <motion.div
              className="mt-8 grid grid-cols-3 gap-4 w-full max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { label: 'Focus Time', value: `${selectedDuration}m`, icon: Zap, color: '#D97706' },
                { label: 'Reward XP', value: `+${selectedDuration * 2}`, icon: Star, color: '#F59E0B' },
                { label: 'Combo', value: 'x1.0', icon: Flame, color: '#EF4444' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-5 h-5 mx-auto mb-1" style={{ color: stat.color }} />
                  <p className="font-cinzel text-sm font-bold text-parchment">{stat.value}</p>
                  <p className="text-[9px] text-parchment-dark">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </>
        ) : (
          /* Victory Screen */
          <AnimatePresence>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-gold to-amber-glow border-4 border-amber-dark flex items-center justify-center mb-4 shadow-glow"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className="w-16 h-16 text-parchment" />
              </motion.div>
              
              <motion.h2
                className="font-cinzel text-3xl font-bold text-amber-gold text-shadow-hero mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                VICTORY!
              </motion.h2>
              
              <motion.p
                className="text-parchment text-center mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                You defeated the slime with {selectedDuration} minutes of focus!
              </motion.p>
              
              <motion.div
                className="wood-panel p-4 w-full max-w-xs mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-cinzel text-xs font-bold text-parchment mb-2 text-center">Loot Gained</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <Star className="w-5 h-5 text-amber-gold mx-auto mb-1" />
                    <p className="font-cinzel text-sm font-bold text-amber-gold">+{selectedDuration * 2} XP</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-5 h-5 text-emerald-glow mx-auto mb-1" />
                    <p className="font-cinzel text-sm font-bold text-emerald-glow">+{Math.floor(selectedDuration * 1.5)} Energy</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.button
                className="btn-fantasy px-8 py-3"
                onClick={handleVictoryClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Claim Rewards
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
