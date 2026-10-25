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
  const [theme, setThemeState] = React.useState<Theme>("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Set light theme as default
    localStorage.setItem("nouvx-theme", "light");
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
    setThemeState("light");
    setMounted(true);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.add("light");
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
  };

  const setTheme = (_newTheme: Theme) => {
    setThemeState("light");
    localStorage.setItem("nouvx-theme", "light");
    applyTheme("light");
  };

  const toggleTheme = () => {
    // White / light theme
  };

  return (
    <ThemeContext.Provider value={{ theme: "light", toggleTheme, setTheme }}>
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
        <Moon className="w-4 h-4 text-[#b45309] transition-transform duration-300 rotate-0 hover:-rotate-12" />
      ) : (
        <Sun className="w-4 h-4 text-[#d97706] transition-transform duration-300 rotate-0 hover:rotate-45" />
      )}
    </button>
  );
}
