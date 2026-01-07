import { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
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
  }, [theme]);

  return { theme, toggleTheme };
};

export { ThemeProvider, useTheme };
