'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, Message, Scenario, Badge, UserProgress } from '@/types';
import { calculateLevel, getNextLevelXp } from '@/data/gamification';

const defaultProgress: UserProgress = {
  totalXp: 0,
  level: 1,
  completedScenarios: [],
  badges: [],
  streakDays: 1,
};

const initialState: AppState = {
  userProgress: defaultProgress,
  currentScenario: null,
  chatMessages: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
      };

    case 'COMPLETE_SCENARIO': {
      const { scenarioId, xpReward } = action.payload;
      const newXp = state.userProgress.totalXp + xpReward;
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          totalXp: newXp,
          level: calculateLevel(newXp),
          completedScenarios: [
            ...state.userProgress.completedScenarios,
            scenarioId,
          ],
        },
      };
    }

    case 'ADD_XP': {
      const newXp = state.userProgress.totalXp + action.payload;
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          totalXp: newXp,
          level: calculateLevel(newXp),
        },
      };
    }

    case 'UNLOCK_BADGE':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          badges: [...state.userProgress.badges, action.payload],
        },
      };

    case 'START_SCENARIO':
      return {
        ...state,
        currentScenario: action.payload,
        chatMessages: [...action.payload.initialMessages],
      };

    case 'RESET_CHAT':
      return {
        ...state,
        currentScenario: null,
        chatMessages: [],
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addMessage: (msg: Message) => void;
  completeScenario: (scenarioId: string, xpReward: number) => void;
  startScenario: (scenario: Scenario) => void;
  resetChat: () => void;
  unlockBadge: (badge: Badge) => void;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addMessage = (msg: Message) =>
    dispatch({ type: 'ADD_MESSAGE', payload: msg });

  const completeScenario = (scenarioId: string, xpReward: number) =>
    dispatch({ type: 'COMPLETE_SCENARIO', payload: { scenarioId, xpReward } });

  const startScenario = (scenario: Scenario) =>
    dispatch({ type: 'START_SCENARIO', payload: scenario });

  const resetChat = () => dispatch({ type: 'RESET_CHAT' });

  const unlockBadge = (badge: Badge) =>
    dispatch({ type: 'UNLOCK_BADGE', payload: badge });

  return (
    <AppContext.Provider
      value={{ state, dispatch, addMessage, completeScenario, startScenario, resetChat, unlockBadge }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
