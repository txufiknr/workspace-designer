import type { WorkspaceConfig } from './types';

export type Preset = {
  id: string;
  name: string;
  description: string;
  image: string;
  config: WorkspaceConfig;
};

export const PRESETS: Preset[] = [
  {
    id: 'essentials',
    name: 'The Essentials',
    description: 'Minimal core essentials for focused work',
    image: '/bundles/the-essentials.webp',
    config: {
      desk: 'desk-mechanical',
      chair: 'chair-ergonomic',
      accessories: ['lamp-led'],
    },
  },
  {
    id: 'founders',
    name: 'Founders Setup',
    description: 'A complete setup for getting things done',
    image: '/bundles/the-founders-setup.webp',
    config: {
      desk: 'desk-electrical',
      chair: 'chair-ergonomic',
      accessories: ['monitor-27', 'lamp-led'],
    },
  },
  {
    id: 'studio',
    name: 'Studio Setup',
    description: 'Big screen, creative vibe',
    image: '/bundles/the-studio-setup.webp',
    config: {
      desk: 'desk-mechanical',
      chair: 'chair-ergonomic',
      accessories: ['monitor-27', 'lamp-hue', 'whiteboard-standing'],
    },
  },
  {
    id: 'trading',
    name: 'Trading Setup',
    description: 'Powerful setup for the markets',
    image: '/bundles/the-trading-setup.webp',
    config: {
      desk: 'desk-electrical',
      chair: 'chair-ergonomic',
      accessories: ['monitor-gaming', 'lamp-led', 'whiteboard-magnetic'],
    },
  },
];
