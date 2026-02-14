export type MessageRole = 'user' | 'bot' | 'system';

export type ScenarioCategory = 'Vendita' | 'Leadership' | 'HR';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: ScenarioCategory;
  difficulty: DifficultyLevel;
  icon: string;
  initialMessages: Message[];
  xpReward: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  requirement: string;
}

export interface UserProgress {
  totalXp: number;
  level: number;
  completedScenarios: string[];
  badges: Badge[];
  streakDays: number;
}

export interface GamificationRules {
  xpPerMessage: number;
  xpPerScenarioComplete: number;
  xpPerStreak: number;
  levelThresholds: number[];
}

export interface AppState {
  userProgress: UserProgress;
  currentScenario: Scenario | null;
  chatMessages: Message[];
}

export type AppAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'COMPLETE_SCENARIO'; payload: { scenarioId: string; xpReward: number } }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'UNLOCK_BADGE'; payload: Badge }
  | { type: 'START_SCENARIO'; payload: Scenario }
  | { type: 'RESET_CHAT' };
