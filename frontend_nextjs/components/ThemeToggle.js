"use client";
import React, { useEffect, useState } from 'react';

export default function ThemeToggle({ isHomepage }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default to system theme
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(systemPrefersDark);
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-5 ${isHomepage ? "left-4" : "right-4"} p-2 bg-gray-300 rounded-full hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-200`}
    >
      {isDark ? '💡' : '🌙'}
    </button>
    );
}
