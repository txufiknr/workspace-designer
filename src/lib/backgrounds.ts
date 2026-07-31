export type BackgroundTheme = {
  id: string;
  name: string;
  gradient: string;
};

export const BACKGROUND_THEMES: BackgroundTheme[] = [
  {
    id: 'classic',
    name: 'Classic',
    gradient: 'bg-gradient-to-br from-background via-background to-surface',
  },
  {
    id: 'rice-terrace',
    name: 'Rice Terrace',
    gradient: 'bg-gradient-to-br from-emerald-950 via-green-900 to-lime-950',
  },
  {
    id: 'sunset-beach',
    name: 'Sunset Beach',
    gradient: 'bg-gradient-to-br from-rose-950 via-orange-900 to-amber-800',
  },
  {
    id: 'coworking-loft',
    name: 'Coworking Loft',
    gradient: 'bg-gradient-to-br from-zinc-900 via-stone-800 to-amber-950',
  },
];
