import type { WorkspaceConfig } from './types';

export type Preset = {
  id: string;
  name: string;
  description: string;
  icon: string;
  config: WorkspaceConfig;
};

export const PRESETS: Preset[] = [
  {
    id: 'developer',
    name: 'Developer',
    description: 'Dual monitors, ergonomic setup',
    icon: '💻',
    config: {
      desk: 'desk-modern',
      chair: 'chair-ergonomic',
      accessories: ['monitor-dual', 'lamp-desk', 'plant-snake'],
    },
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Big screen, creative vibe',
    icon: '🎨',
    config: {
      desk: 'desk-classic',
      chair: 'chair-ergonomic',
      accessories: ['monitor-27', 'lamp-floor', 'plant-monstera'],
    },
  },
  {
    id: 'writer',
    name: 'Writer',
    description: 'Minimal, focused setup',
    icon: '✍️',
    config: {
      desk: 'desk-classic',
      chair: 'chair-minimal',
      accessories: ['lamp-desk'],
    },
  },
  {
    id: 'gamer',
    name: 'Gamer',
    description: 'Big desk, dual monitors',
    icon: '🎮',
    config: {
      desk: 'desk-modern',
      chair: 'chair-ergonomic',
      accessories: ['monitor-dual', 'lamp-floor'],
    },
  },
];
