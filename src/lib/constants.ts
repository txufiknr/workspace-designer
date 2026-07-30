export const RENTAL_PERIODS = ['daily', 'weekly', 'monthly'] as const;
export type RentalPeriod = (typeof RENTAL_PERIODS)[number];

export const MULTIPLIERS: Record<RentalPeriod, number> = {
  daily: 1,
  weekly: 5,
  monthly: 20,
};

export const DEFAULT_RENTAL_PERIOD: RentalPeriod = 'monthly';

export const WORKSPACE_SLOTS = {
  desk: { x: 0, y: 0, label: 'Desk' },
  chair: { x: 0, y: 100, label: 'Chair' },
  monitor: { x: 0, y: -80, label: 'Monitor' },
  lamp: { x: 80, y: -40, label: 'Lamp' },
  plant: { x: -80, y: -40, label: 'Plant' },
} as const;
