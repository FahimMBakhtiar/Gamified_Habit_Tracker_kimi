import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { GameState, Quest, ScreenName, QuestCategory, QuestDifficulty, QuestFrequency } from '@/types/game';
import { getXpForLevel, DIFFICULTY_MULTIPLIER } from '@/types/game';

// Generate unique ID
const genId = () => Math.random().toString(36).substr(2, 9);

// Mock initial quests
const initialQuests: Quest[] = [
  {
    id: genId(),
    title: 'Morning Warrior',
    description: 'Complete a 15-minute morning workout routine',
    category: 'fitness',
    difficulty: 'medium',
    frequency: 'daily',
    xpReward: 50,
    goldReward: 10,
    completed: false,
    streak: 5,
    maxStreak: 12,
    icon: 'Flame',
    createdAt: new Date().toISOString(),
  },
  {
    id: genId(),
    title: 'Mind Temple',
    description: 'Read 10 pages of a book or meditate for 10 minutes',
    category: 'wisdom',
    difficulty: 'easy',
    frequency: 'daily',
    xpReward: 30,
    goldReward: 5,
    completed: false,
    streak: 8,
    maxStreak: 21,
    icon: 'BookOpen',
    createdAt: new Date().toISOString(),
  },
  {
    id: genId(),
    title: 'Spirit Path',
    description: 'Morning prayer or spiritual reflection',
    category: 'spiritual',
    difficulty: 'easy',
    frequency: 'daily',
    xpReward: 25,
    goldReward: 5,
    completed: false,
    streak: 12,
    maxStreak: 30,
    icon: 'Sparkles',
    createdAt: new Date().toISOString(),
  },
  {
    id: genId(),
    title: 'Health Guardian',
    description: 'Drink 8 glasses of water and eat healthy meals',
    category: 'fitness',
    difficulty: 'medium',
    frequency: 'daily',
    xpReward: 40,
    goldReward: 8,
    completed: false,
    streak: 3,
    maxStreak: 7,
    icon: 'Heart',
    createdAt: new Date().toISOString(),
  },
  {
    id: genId(),
    title: 'Financial Builder',
    description: 'Track expenses and review budget',
    category: 'financial',
    difficulty: 'medium',
    frequency: 'daily',
    xpReward: 35,
    goldReward: 15,
    completed: false,
    streak: 7,
    maxStreak: 14,
    icon: 'Wallet',
    createdAt: new Date().toISOString(),
  },
  {
    id: genId(),
    title: 'Discipline Forge',
    description: 'Complete the most important task before noon',
    category: 'discipline',
    difficulty: 'hard',
    frequency: 'daily',
    xpReward: 75,
    goldReward: 20,
    completed: false,
    streak: 2,
    maxStreak: 5,
    icon: 'Shield',
    createdAt: new Date().toISOString(),
  },
  {
    id: genId(),
    title: 'Deep Focus',
    description: '25-minute uninterrupted focus session (Pomodoro)',
    category: 'focus',
    difficulty: 'medium',
    frequency: 'daily',
    xpReward: 60,
    goldReward: 12,
    completed: false,
    streak: 4,
    maxStreak: 10,
    icon: 'Target',
    createdAt: new Date().toISOString(),
  },
  {
    id: genId(),
    title: 'Kindness Quest',
    description: 'Reach out to a friend or do a random act of kindness',
    category: 'social',
    difficulty: 'easy',
    frequency: 'daily',
    xpReward: 20,
    goldReward: 5,
    completed: false,
    streak: 6,
    maxStreak: 15,
    icon: 'HeartHandshake',
    createdAt: new Date().toISOString(),
  },
];

// Initial state
const initialState: GameState = {
  playerName: 'Adventurer',
  playerClass: 'Seeker',
  level: 12,
  xp: 850,
  xpToNext: getXpForLevel(13),
  gold: 2450,
  energy: 75,
  maxEnergy: 100,
  motivation: 88,
  maxMotivation: 100,
  streak: 8,
  maxStreak: 21,
  stats: {
    strength: 18,
    intellect: 24,
    agility: 15,
    wisdom: 28,
    spiritual: 22,
    fitness: 20,
    financial: 16,
    social: 19,
    discipline: 14,
    focus: 21,
  },
  quests: initialQuests,
  skills: [
    { id: 's1', name: 'Meditation Mastery', description: 'Boost Spiritual XP gain', category: 'spiritual', level: 3, maxLevel: 10, unlocked: true, icon: 'Sparkles', cost: 100 },
    { id: 's2', name: 'Iron Will', description: 'Boost Discipline XP gain', category: 'discipline', level: 2, maxLevel: 10, unlocked: true, icon: 'Shield', cost: 150 },
    { id: 's3', name: 'Scholar\'s Path', description: 'Boost Wisdom XP gain', category: 'wisdom', level: 4, maxLevel: 10, unlocked: true, icon: 'BookOpen', cost: 100 },
    { id: 's4', name: 'Athletic Form', description: 'Boost Fitness XP gain', category: 'fitness', level: 3, maxLevel: 10, unlocked: true, icon: 'Flame', cost: 120 },
    { id: 's5', name: 'Gold Hoarder', description: 'Boost Financial XP gain', category: 'financial', level: 2, maxLevel: 10, unlocked: true, icon: 'Coins', cost: 200 },
    { id: 's6', name: 'Social Butterfly', description: 'Boost Social XP gain', category: 'social', level: 1, maxLevel: 10, unlocked: false, icon: 'Users', cost: 150 },
    { id: 's7', name: 'Laser Focus', description: 'Boost Focus XP gain', category: 'focus', level: 3, maxLevel: 10, unlocked: true, icon: 'Target', cost: 180 },
    { id: 's8', name: 'Combo Master', description: 'Increase combo multiplier', category: 'discipline', level: 1, maxLevel: 5, unlocked: true, icon: 'Zap', cost: 250 },
  ],
  achievements: [
    { id: 'a1', title: 'First Steps', description: 'Complete your first quest', icon: 'Footprints', unlocked: true, unlockedAt: '2025-01-01', rarity: 'common' },
    { id: 'a2', title: 'Week Warrior', description: '7-day streak', icon: 'Calendar', unlocked: true, unlockedAt: '2025-01-15', rarity: 'common' },
    { id: 'a3', title: 'Bookworm', description: 'Read 500 pages total', icon: 'BookOpen', unlocked: true, unlockedAt: '2025-02-01', rarity: 'rare' },
    { id: 'a4', title: 'Iron Discipline', description: 'Complete all daily quests for 3 days', icon: 'Shield', unlocked: true, unlockedAt: '2025-02-20', rarity: 'rare' },
    { id: 'a5', title: 'Wealth Builder', description: 'Save $1000', icon: 'TrendingUp', unlocked: true, unlockedAt: '2025-03-01', rarity: 'epic' },
    { id: 'a6', title: 'Month Master', description: '30-day streak', icon: 'Crown', unlocked: false, rarity: 'epic' },
    { id: 'a7', title: 'Legendary Hero', description: 'Reach Level 50', icon: 'Star', unlocked: false, rarity: 'legendary' },
    { id: 'a8', title: 'Enlightened One', description: 'Max out Spiritual stat', icon: 'Sun', unlocked: false, rarity: 'legendary' },
  ],
  transactions: [
    { id: genId(), title: 'Paycheck', amount: 3500, type: 'income', category: 'salary', date: '2025-05-20', icon: 'Wallet' },
    { id: genId(), title: 'Groceries', amount: -180, type: 'expense', category: 'food', date: '2025-05-19', icon: 'ShoppingCart' },
    { id: genId(), title: 'Gym Membership', amount: -45, type: 'expense', category: 'health', date: '2025-05-18', icon: 'Dumbbell' },
    { id: genId(), title: 'Freelance Work', amount: 600, type: 'income', category: 'freelance', date: '2025-05-17', icon: 'Laptop' },
    { id: genId(), title: 'Coffee Shop', amount: -25, type: 'expense', category: 'food', date: '2025-05-16', icon: 'Coffee' },
    { id: genId(), title: 'Investment Return', amount: 320, type: 'income', category: 'investment', date: '2025-05-15', icon: 'TrendingUp' },
    { id: genId(), title: 'Books', amount: -40, type: 'expense', category: 'education', date: '2025-05-14', icon: 'BookOpen' },
  ],
  budgetCategories: [
    { id: 'b1', name: 'Housing', allocated: 1200, spent: 1200, icon: 'Home', color: '#D97706' },
    { id: 'b2', name: 'Food', allocated: 500, spent: 380, icon: 'UtensilsCrossed', color: '#10B981' },
    { id: 'b3', name: 'Health', allocated: 200, spent: 120, icon: 'Heart', color: '#EF4444' },
    { id: 'b4', name: 'Savings', allocated: 800, spent: 800, icon: 'PiggyBank', color: '#3B82F6' },
    { id: 'b5', name: 'Entertainment', allocated: 300, spent: 150, icon: 'Gamepad2', color: '#8B5CF6' },
  ],
  netWorth: 18750,
  savings: 8200,
  investments: 5500,
  guildName: 'The Rising Phoenix',
  guildMembers: [
    { id: 'g1', name: 'Aria Storm', avatar: 'avatar-hero.png', level: 15, class: 'Mage', streak: 12, contribution: 450 },
    { id: 'g2', name: 'Kael Ironheart', avatar: 'avatar-hero.png', level: 18, class: 'Warrior', streak: 21, contribution: 620 },
    { id: 'g3', name: 'Lyra Moonwhisper', avatar: 'avatar-hero.png', level: 10, class: 'Healer', streak: 5, contribution: 280 },
    { id: 'g4', name: 'Thorne Shadowblade', avatar: 'avatar-hero.png', level: 22, class: 'Rogue', streak: 30, contribution: 890 },
  ],
  worldLevel: 3,
  worldEvolution: 65,
  equippedHat: 'hat_wizard',
  equippedWeapon: 'weapon_sword',
  equippedPet: 'pet_slime',
  unlockedCosmetics: ['hat_wizard', 'weapon_sword', 'pet_slime', 'cape_red'],
  activeTimer: false,
  timerDuration: 1500,
  timerRemaining: 1500,
  activeQuestId: null,
};

// Actions
type GameAction =
  | { type: 'COMPLETE_QUEST'; questId: string }
  | { type: 'ADD_QUEST'; quest: Quest }
  | { type: 'DELETE_QUEST'; questId: string }
  | { type: 'SET_SCREEN'; screen: ScreenName }
  | { type: 'START_TIMER'; questId: string; duration: number }
  | { type: 'TICK_TIMER' }
  | { type: 'COMPLETE_TIMER' }
  | { type: 'CANCEL_TIMER' }
  | { type: 'ADD_TRANSACTION'; transaction: GameState['transactions'][0] }
  | { type: 'UPGRADE_SKILL'; skillId: string }
  | { type: 'EQUIP_ITEM'; itemType: 'hat' | 'weapon' | 'pet'; itemId: string }
  | { type: 'UPDATE_PLAYER_NAME'; name: string }
  | { type: 'RESET_DAILY' };

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'COMPLETE_QUEST': {
      const quest = state.quests.find(q => q.id === action.questId);
      if (!quest || quest.completed) return state;
      
      const multiplier = DIFFICULTY_MULTIPLIER[quest.difficulty];
      const streakBonus = Math.min(quest.streak * 0.1, 2);
      const totalXp = Math.floor(quest.xpReward * multiplier * (1 + streakBonus));
      const totalGold = Math.floor(quest.goldReward * multiplier);
      
      let newXp = state.xp + totalXp;
      let newLevel = state.level;
      let newXpToNext = state.xpToNext;
      
      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel++;
        newXpToNext = getXpForLevel(newLevel + 1);
      }
      
      const newStats = { ...state.stats };
      const statMap: Record<QuestCategory, keyof PlayerStats> = {
        spiritual: 'spiritual',
        fitness: 'fitness',
        wisdom: 'wisdom',
        financial: 'financial',
        social: 'social',
        discipline: 'discipline',
        focus: 'focus',
      };
      const statKey = statMap[quest.category];
      if (statKey) {
        newStats[statKey] = Math.min(newStats[statKey] + Math.floor(totalXp / 20), 100);
      }
      
      return {
        ...state,
        quests: state.quests.map(q => 
          q.id === action.questId 
            ? { ...q, completed: true, completedAt: new Date().toISOString(), streak: q.streak + 1, maxStreak: Math.max(q.streak + 1, q.maxStreak) }
            : q
        ),
        xp: newXp,
        level: newLevel,
        xpToNext: newXpToNext,
        gold: state.gold + totalGold,
        stats: newStats,
        worldEvolution: Math.min(state.worldEvolution + 2, 100),
      };
    }
    
    case 'ADD_QUEST':
      return { ...state, quests: [...state.quests, action.quest] };
    
    case 'DELETE_QUEST':
      return { ...state, quests: state.quests.filter(q => q.id !== action.questId) };
    
    case 'SET_SCREEN':
      return { ...state, activeTimer: false };
    
    case 'START_TIMER':
      return {
        ...state,
        activeTimer: true,
        timerDuration: action.duration,
        timerRemaining: action.duration,
        activeQuestId: action.questId,
      };
    
    case 'TICK_TIMER':
      if (state.timerRemaining <= 0) return { ...state, activeTimer: false };
      return { ...state, timerRemaining: state.timerRemaining - 1 };
    
    case 'COMPLETE_TIMER':
      return { ...state, activeTimer: false, timerRemaining: 0 };
    
    case 'CANCEL_TIMER':
      return { ...state, activeTimer: false, timerRemaining: state.timerDuration, activeQuestId: null };
    
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.transaction, ...state.transactions] };
    
    case 'UPGRADE_SKILL': {
      const skill = state.skills.find(s => s.id === action.skillId);
      if (!skill || skill.level >= skill.maxLevel || state.gold < skill.cost) return state;
      return {
        ...state,
        gold: state.gold - skill.cost,
        skills: state.skills.map(s =>
          s.id === action.skillId ? { ...s, level: s.level + 1 } : s
        ),
      };
    }
    
    case 'EQUIP_ITEM': {
      const fieldMap = { hat: 'equippedHat', weapon: 'equippedWeapon', pet: 'equippedPet' } as const;
      return { ...state, [fieldMap[action.itemType]]: action.itemId };
    }
    
    case 'UPDATE_PLAYER_NAME':
      return { ...state, playerName: action.name };
    
    case 'RESET_DAILY':
      return {
        ...state,
        quests: state.quests.map(q => ({ ...q, completed: false, completedAt: undefined })),
        energy: state.maxEnergy,
        motivation: state.maxMotivation,
      };
    
    default:
      return state;
  }
}

// Context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  currentScreen: ScreenName;
  setScreen: (screen: ScreenName) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [currentScreen, setCurrentScreen] = React.useState<ScreenName>('questboard');
  
  const setScreen = useCallback((screen: ScreenName) => {
    setCurrentScreen(screen);
    dispatch({ type: 'SET_SCREEN', screen });
  }, []);
  
  return (
    <GameContext.Provider value={{ state, dispatch, currentScreen, setScreen }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}

// Helper for creating quests
export function createQuest(
  title: string,
  description: string,
  category: QuestCategory,
  difficulty: QuestDifficulty,
  frequency: QuestFrequency,
  icon: string
): Quest {
  const baseXp = 30;
  const baseGold = 5;
  return {
    id: genId(),
    title,
    description,
    category,
    difficulty,
    frequency,
    xpReward: Math.floor(baseXp * DIFFICULTY_MULTIPLIER[difficulty]),
    goldReward: Math.floor(baseGold * DIFFICULTY_MULTIPLIER[difficulty]),
    completed: false,
    streak: 0,
    maxStreak: 0,
    icon,
    createdAt: new Date().toISOString(),
  };
}

// Need to import PlayerStats for the reducer
import type { PlayerStats } from '@/types/game';
