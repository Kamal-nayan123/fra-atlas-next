"use client";
import React from 'react';
import { useTheme } from './theme-provider';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};
