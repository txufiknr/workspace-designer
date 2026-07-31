'use client';

import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { IconButton } from './ui';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#030712' : '#F5F5F7');
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* storage unavailable */
  }
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  }

  return (
    <IconButton
      icon={theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      size="md"
    />
  );
}
