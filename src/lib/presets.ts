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
      desk: 'desk-electrical',
      chair: 'chair-ergonomic',
      accessories: ['monitor-gaming', 'lamp-led', 'whiteboard-magnetic'],
    },
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Big screen, creative vibe',
    icon: '🎨',
    config: {
      desk: 'desk-mechanical',
      chair: 'chair-ergonomic',
      accessories: ['monitor-27', 'lamp-hue', 'whiteboard-standing'],
    },
  },
  {
    id: 'writer',
    name: 'Writer',
    description: 'Minimal, focused setup',
    icon: '✍️',
    config: {
      desk: 'desk-mechanical',
      chair: 'chair-ergonomic',
      accessories: ['lamp-led'],
    },
  },
  {
    id: 'gamer',
    name: 'Gamer',
    description: 'Big desk, dual monitors',
    icon: '🎮',
    config: {
      desk: 'desk-electrical',
      chair: 'chair-ergonomic',
      accessories: ['monitor-gaming', 'lamp-hue'],
    },
  },
];
