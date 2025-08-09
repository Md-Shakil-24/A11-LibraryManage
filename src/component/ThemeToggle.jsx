import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;

    // Check localStorage first
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme === "dark";

    // If no stored theme, check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Add a class to trigger CSS transition (optional)
    document.documentElement.classList.add("theme-transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 300);

    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      aria-pressed={isDark}
      title="Toggle to change theme"
      className="p-2 rounded-2xl border bg-cyan-900 hover:cursor-pointer border-gray-500 dark:border-gray-300 transition-colors"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
