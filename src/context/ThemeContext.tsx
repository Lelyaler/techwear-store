import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ThemeMode } from '../types';
import { AudioService } from '../services/audio';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  cycleTheme: () => void;
  soundEnabled: boolean;
  ambientActive: boolean;
  toggleSound: () => void;
  toggleAmbient: () => void;
}

const THEMES: ThemeMode[] = ['default', 'green', 'pink', 'cyber'];

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('techwear_theme') as ThemeMode;
    return THEMES.includes(saved) ? saved : 'default';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => AudioService.isSoundEnabled());
  const [ambientActive, setAmbientActive] = useState<boolean>(() => AudioService.isAmbientActive());

  const applyThemeToDom = useCallback((newTheme: ThemeMode) => {
    if (newTheme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    localStorage.setItem('techwear_theme', newTheme);
  }, []);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    applyThemeToDom(newTheme);
  }, [applyThemeToDom]);

  const cycleTheme = useCallback(() => {
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    setTheme(nextTheme);
  }, [theme, setTheme]);

  const toggleSound = useCallback(() => {
    const nextState = AudioService.toggleSound();
    setSoundEnabled(nextState);
    if (!nextState) {
      setAmbientActive(false);
    }
  }, []);

  const toggleAmbient = useCallback(() => {
    const nextState = AudioService.toggleAmbient();
    setAmbientActive(nextState);
  }, []);

  useEffect(() => {
    applyThemeToDom(theme);
  }, [theme, applyThemeToDom]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        cycleTheme,
        soundEnabled,
        ambientActive,
        toggleSound,
        toggleAmbient
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};
