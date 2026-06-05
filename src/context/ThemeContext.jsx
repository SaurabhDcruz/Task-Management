import React, { createContext, useEffect, useMemo, useState } from 'react';
import { storageService } from '../services/storageService';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(storageService.getThemeMode());

  useEffect(() => {
    storageService.setThemeMode(theme);
    // Apply dark class to HTML element for Tailwind's dark mode (darkMode: 'class')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
