export type QuestCategory = 
  | 'spiritual' 
  | 'fitness' 
  | 'wisdom' 
  | 'financial' 
  | 'social' 
  | 'discipline' 
  | 'focus';

export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';

export type QuestFrequency = 'daily' | 'weekly' | 'monthly';

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  frequency: QuestFrequency;
  xpReward: number;
  goldReward: number;
  completed: boolean;
  completedAt?: string;
  streak: number;
  maxStreak: number;
  icon: string;
  createdAt: string;
}

export interface PlayerStats {
  strength: number;
  intellect: number;
  agility: number;
  wisdom: number;
  spiritual: number;
  fitness: number;
  financial: number;
  social: number;
  discipline: number;
  focus: number;
}

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  category: QuestCategory;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  icon: string;
  cost: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  icon: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  icon: string;
  color: string;
}

export interface GuildMember {
  id: string;
  name: string;
  avatar: string;
  level: number;
  class: string;
  streak: number;
  contribution: number;
}

export interface GameState {
  // Player core
  playerName: string;
  playerClass: string;
  level: number;
  xp: number;
  xpToNext: number;
  gold: number;
  energy: number;
  maxEnergy: number;
  motivation: number;
  maxMotivation: number;
  streak: number;
  maxStreak: number;
  
  // Stats
  stats: PlayerStats;
  
  // Quests
  quests: Quest[];
  
  // Skills
  skills: SkillNode[];
  
  // Achievements
  achievements: Achievement[];
  
  // Finance
  transactions: Transaction[];
  budgetCategories: BudgetCategory[];
  netWorth: number;
  savings: number;
  investments: number;
  
  // Guild
  guildName: string;
  guildMembers: GuildMember[];
  
  // World
  worldLevel: number;
  worldEvolution: number;
  
  // Inventory/Cosmetics
  equippedHat: string;
  equippedWeapon: string;
  equippedPet: string;
  unlockedCosmetics: string[];
  
  // Timer
  activeTimer: boolean;
  timerDuration: number;
  timerRemaining: number;
  activeQuestId: string | null;
}

export type ScreenName = 
  | 'questboard' 
  | 'character' 
  | 'treasury' 
  | 'guildhall' 
  | 'worldmap' 
  | 'battle';

export const XP_BASE = 100;
export const XP_MULTIPLIER = 1.5;

export function getXpForLevel(level: number): number {
  return Math.floor(XP_BASE * Math.pow(XP_MULTIPLIER, level - 1));
}

export const DIFFICULTY_MULTIPLIER: Record<QuestDifficulty, number> = {
  easy: 1,
  medium: 1.5,
  hard: 2.5,
  legendary: 5,
};

export const CATEGORY_COLORS: Record<QuestCategory, string> = {
  spiritual: '#8B5CF6',
  fitness: '#10B981',
  wisdom: '#3B82F6',
  financial: '#D97706',
  social: '#EC4899',
  discipline: '#EF4444',
  focus: '#06B6D4',
};

export const CATEGORY_ICONS: Record<QuestCategory, string> = {
  spiritual: 'Sparkles',
  fitness: 'Flame',
  wisdom: 'BookOpen',
  financial: 'Coins',
  social: 'Users',
  discipline: 'Shield',
  focus: 'Target',
};

export const STAT_NAMES: Record<string, string> = {
  strength: 'Strength',
  intellect: 'Intellect', 
  agility: 'Agility',
  wisdom: 'Wisdom',
  spiritual: 'Spiritual',
  fitness: 'Fitness',
  financial: 'Financial',
  social: 'Social',
  discipline: 'Discipline',
  focus: 'Focus',
};
