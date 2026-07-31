'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import type { WorkspaceConfig } from '@/lib/types';

type Action =
  | { type: 'SELECT_DESK'; id: string }
  | { type: 'DESELECT_DESK' }
  | { type: 'SELECT_CHAIR'; id: string }
  | { type: 'DESELECT_CHAIR' }
  | { type: 'TOGGLE_ACCESSORY'; id: string }
  | { type: 'RESET' }
  | { type: 'LOAD_PRESET'; config: WorkspaceConfig; presetId: string }
  | { type: 'HYDRATE'; config: WorkspaceConfig };

const INITIAL_CONFIG: WorkspaceConfig = {
  desk: null,
  chair: null,
  accessories: [],
};

const STORAGE_KEY = 'workspace-designer-config';

function loadSavedConfig(): WorkspaceConfig | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as WorkspaceConfig) : null;
  } catch {
    return null;
  }
}

function clearPreset(state: WorkspaceConfig): WorkspaceConfig {
  if (!state.activePreset) return state;
  return { ...state, activePreset: undefined };
}

function reducer(state: WorkspaceConfig, action: Action): WorkspaceConfig {
  switch (action.type) {
    case 'SELECT_DESK':
      return clearPreset({ ...state, desk: action.id });
    case 'DESELECT_DESK':
      return clearPreset({ ...state, desk: null });
    case 'SELECT_CHAIR':
      return clearPreset({ ...state, chair: action.id });
    case 'DESELECT_CHAIR':
      return clearPreset({ ...state, chair: null });
    case 'TOGGLE_ACCESSORY': {
      const exists = state.accessories.includes(action.id);
      return clearPreset({
        ...state,
        accessories: exists
          ? state.accessories.filter((id) => id !== action.id)
          : [...state.accessories, action.id],
      });
    }
    case 'LOAD_PRESET':
      return { ...action.config, activePreset: action.presetId };
    case 'HYDRATE':
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

  const isFirstRender = useRef(true);

  useEffect(() => {
    const saved = loadSavedConfig();
    if (saved) {
      dispatch({ type: 'HYDRATE', config: saved });
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch { /* storage full or unavailable */ }
  }, [config]);

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
