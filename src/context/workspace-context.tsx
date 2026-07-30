'use client';

import {
  createContext,
  useContext,
  useReducer,
  useOptimistic,
  type ReactNode,
} from 'react';
import type { WorkspaceConfig } from '@/lib/types';

type Action =
  | { type: 'SELECT_DESK'; id: string }
  | { type: 'SELECT_CHAIR'; id: string }
  | { type: 'TOGGLE_ACCESSORY'; id: string }
  | { type: 'RESET' }
  | { type: 'LOAD_PRESET'; config: WorkspaceConfig };

const INITIAL_CONFIG: WorkspaceConfig = {
  desk: null,
  chair: null,
  accessories: [],
};

function reducer(state: WorkspaceConfig, action: Action): WorkspaceConfig {
  switch (action.type) {
    case 'SELECT_DESK':
      return { ...state, desk: action.id };
    case 'SELECT_CHAIR':
      return { ...state, chair: action.id };
    case 'TOGGLE_ACCESSORY': {
      const exists = state.accessories.includes(action.id);
      return {
        ...state,
        accessories: exists
          ? state.accessories.filter((id) => id !== action.id)
          : [...state.accessories, action.id],
      };
    }
    case 'LOAD_PRESET':
      return action.config;
    case 'RESET':
      return INITIAL_CONFIG;
    default:
      return state;
  }
}

type WorkspaceContextType = {
  config: WorkspaceConfig;
  dispatch: (action: Action) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [config, dispatch] = useReducer(reducer, INITIAL_CONFIG);

  return (
    <WorkspaceContext.Provider value={{ config, dispatch }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return ctx;
}
