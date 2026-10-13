"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Check saved theme or system preference
    const saved = localStorage.getItem("nouvx-theme") as Theme | null;
    const initialTheme: Theme = saved === "light" ? "light" : "dark";
    
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("nouvx-theme", newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-9 h-9 rounded-xl border border-border bg-bg-card/80 opacity-0", className)} />
    );
  }

  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={cn(
        "relative w-9 h-9 rounded-xl border border-border bg-bg-card/80 backdrop-blur-md",
        "flex items-center justify-center text-text-muted hover:text-accent hover:border-accent-muted hover:bg-accent-dim",
        "transition-all duration-300 shadow-sm active:scale-95 cursor-pointer",
        className
      )}
    >
      {isLight ? (
        <Moon className="w-4 h-4 text-[#b87333] transition-transform duration-300 rotate-0 hover:-rotate-12" />
      ) : (
        <Sun className="w-4 h-4 text-[#d4a373] transition-transform duration-300 rotate-0 hover:rotate-45" />
      )}
    </button>
  );
}
