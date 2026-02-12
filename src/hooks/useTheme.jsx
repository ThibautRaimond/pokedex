import { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext();

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = context;

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("darkMode");
    } else if (theme === "dark") {
      document.body.classList.add("darkMode");
    }

    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export { ThemeProvider, useTheme };
