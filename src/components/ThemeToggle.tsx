'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { IconButton } from './ui';

type Theme = 'light' | 'dark';

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getServerSnapshot(): Theme {
  return 'light';
}

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

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
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
