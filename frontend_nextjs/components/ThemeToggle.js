"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle({ isHomepage }) {
  // State to track the theme (dark or light)
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Retrieve the saved theme preference from local storage
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // Apply the saved theme
      setIsDark(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // If no preference is found, use light by default
      setIsDark(false);
      document.documentElement.classList.toggle("dark", false);
    }
  }, []);

  // Function to toggle between dark and light themes
  const toggleTheme = () => {
    const newTheme = !isDark ? "dark" : "light";
    setIsDark(!isDark);

    // Store the selected theme in local storage
    localStorage.setItem("theme", newTheme);

    // Apply the selected theme to the document
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed top-5 
        ${isHomepage ? "left-4" : "right-4"} 
        p-2 bg-gray-300 rounded-full hover:bg-gray-400 
        dark:bg-gray-800 dark:hover:bg-gray-700 
        transition duration-200
      `}
    >
      {/* Toggle button icon based on theme */}
      {isDark ? "💡" : "🌙"}
    </button>
  );
}
