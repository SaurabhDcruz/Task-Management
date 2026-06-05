import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
}

export default ThemeToggle;
