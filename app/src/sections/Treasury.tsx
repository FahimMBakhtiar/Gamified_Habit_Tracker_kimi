import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet, TrendingUp, Dumbbell, PiggyBank, BarChart3,
  Home, UtensilsCrossed, Heart, Gamepad2, ShoppingCart,
  Coffee, Laptop, BookOpen, DollarSign, Coins, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { useGame } from '@/hooks/GameContext';

const TXN_ICONS: Record<string, React.ElementType> = {
  Wallet, ShoppingCart, Dumbbell, Laptop, Coffee, BookOpen, Home, UtensilsCrossed,
  Heart, Gamepad2, PiggyBank, TrendingUp, DollarSign, Coins,
};

export function Treasury() {
  const { state } = useGame();
  const [activeView, setActiveView] = useState<'overview' | 'transactions' | 'budget'>('overview');
  
  const totalIncome = state.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = state.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  
  return (
    <div className="min-h-screen pb-24 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: 'url(/treasury-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-enchanted-purple via-enchanted-purple/95 to-enchanted-purple" />
      
      <div className="relative z-10 px-4 pt-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-cinzel text-2xl font-bold text-parchment text-shadow-hero mb-1">
            Treasury
          </h1>
          <p className="text-sm text-amber-gold">Your Kingdom's Wealth</p>
        </motion.div>
        
        {/* Net Worth Card */}
        <motion.div
          className="mt-4 p-5 rounded-2xl border-[3px] border-amber-dark bg-gradient-to-br from-amber-900/50 to-wood relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Glow effect */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-gold/10 rounded-full blur-2xl" />
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-gold/20 border-2 border-amber-gold flex items-center justify-center">
              <Coins className="w-5 h-5 text-amber-gold" />
            </div>
            <span className="font-cinzel text-xs font-bold text-amber-gold uppercase tracking-wider">
              Net Worth
            </span>
          </div>
          
          <motion.p 
            className="font-cinzel text-3xl font-bold text-parchment text-shadow-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ${state.netWorth.toLocaleString()}
          </motion.p>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <ArrowUpRight className="w-4 h-4 text-emerald-glow" />
              <span className="text-xs text-emerald-glow font-bold">+${totalIncome.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowDownRight className="w-4 h-4 text-ruby" />
              <span className="text-xs text-ruby font-bold">-${totalExpenses.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Savings', value: state.savings, icon: PiggyBank, color: '#3B82F6' },
            { label: 'Invested', value: state.investments, icon: TrendingUp, color: '#10B981' },
            { label: 'Gold', value: state.gold, icon: Coins, color: '#D97706' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="parchment-panel p-3 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              whileHover={{ y: -2 }}
            >
              <item.icon className="w-5 h-5 mx-auto mb-1" style={{ color: item.color }} />
              <p className="font-cinzel text-xs font-bold text-ink">${item.value.toLocaleString()}</p>
              <p className="text-[9px] text-ink-light uppercase tracking-wider">{item.label}</p>
            </motion.div>
          ))}
        </div>
        
        {/* View Tabs */}
        <div className="flex gap-2 mt-4 mb-4">
          {(['overview', 'transactions', 'budget'] as const).map(view => (
            <motion.button
              key={view}
              className={`flex-1 py-2.5 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                activeView === view
                  ? 'bg-amber-gold border-amber-dark text-parchment shadow-3d'
                  : 'bg-wood border-wood-light text-parchment-dark hover:bg-wood-light'
              }`}
              onClick={() => setActiveView(view)}
              whileTap={{ scale: 0.98 }}
            >
              {view}
            </motion.button>
          ))}
        </div>
        
        {/* Transactions View */}
        {activeView === 'transactions' && (
          <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {state.transactions.map((txn, i) => {
              const Icon = TXN_ICONS[txn.icon] || Wallet;
              const isIncome = txn.type === 'income';
              
              return (
                <motion.div
                  key={txn.id}
                  className="parchment-panel p-3 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 2 }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: isIncome ? '#10B98120' : '#EF444420',
                      border: `2px solid ${isIncome ? '#10B981' : '#EF4444'}`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: isIncome ? '#10B981' : '#EF4444' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-cinzel text-xs font-bold text-ink truncate">{txn.title}</h4>
                    <p className="text-[10px] text-ink-light">{txn.category} • {new Date(txn.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`font-cinzel text-sm font-bold flex-shrink-0 ${isIncome ? 'text-emerald-glow' : 'text-ruby'}`}>
                    {isIncome ? '+' : ''}{txn.amount < 0 ? '' : ''}${Math.abs(txn.amount)}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
        
        {/* Budget View */}
        {activeView === 'budget' && (
          <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {state.budgetCategories.map((cat, i) => {
              const percent = (cat.spent / cat.allocated) * 100;
              const isOver = percent > 100;
              
              return (
                <motion.div
                  key={cat.id}
                  className="parchment-panel p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${cat.color}20` }}
                      >
                        <BarChart3 className="w-4 h-4" style={{ color: cat.color }} />
                      </div>
                      <span className="font-cinzel text-xs font-bold text-ink">{cat.name}</span>
                    </div>
                    <span className={`font-cinzel text-xs font-bold ${isOver ? 'text-ruby' : 'text-ink'}`}>
                      ${cat.spent} / ${cat.allocated}
                    </span>
                  </div>
                  <div className="h-3 bg-wood-dark rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: isOver ? '#EF4444' : cat.color,
                        boxShadow: `0 0 8px ${isOver ? '#EF4444' : cat.color}40`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percent, 100)}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
        
        {/* Overview View */}
        {activeView === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Wealth Growth Chart (simplified visual) */}
            <div className="wood-panel p-4">
              <h3 className="font-cinzel text-xs font-bold text-parchment mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-glow" />
                Wealth Growth
              </h3>
              <div className="flex items-end gap-1 h-32">
                {[35, 42, 38, 55, 48, 62, 58, 70, 75, 68, 82, 78, 85, 92, 88, 95, 100, 105, 110, 118].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      background: `linear-gradient(180deg, #D97706, #D9770660)`,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(h / 120) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.03 }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[9px] text-parchment-dark">Jan</span>
                <span className="text-[9px] text-parchment-dark">May</span>
              </div>
            </div>
            
            {/* Financial Milestones */}
            <div className="wood-panel p-4">
              <h3 className="font-cinzel text-xs font-bold text-parchment mb-3">
                Kingdom Milestones
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'First 1K Saved', done: true },
                  { label: '5K Net Worth', done: true },
                  { label: '10K Net Worth', done: true },
                  { label: 'First Investment', done: true },
                  { label: '25K Net Worth', done: false },
                  { label: 'Home Fund Ready', done: false },
                ].map((milestone, i) => (
                  <motion.div
                    key={milestone.label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      milestone.done ? 'bg-emerald-glow' : 'bg-wood-light'
                    }`}>
                      {milestone.done ? (
                        <TrendingUp className="w-3 h-3 text-parchment" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-wood-dark" />
                      )}
                    </div>
                    <span className={`font-cinzel text-[11px] ${milestone.done ? 'text-parchment' : 'text-parchment-dark'}`}>
                      {milestone.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
