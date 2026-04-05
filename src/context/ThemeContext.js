import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ThemeContext = createContext();

// Custom hook to make it easy to use theme elsewhere
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Set initial theme to 'light'
  const [theme, setTheme] = useState('light');

  // On mount, check localStorage to load theme
  useEffect(() => {
    const storedTheme = localStorage.getItem('appTheme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  // Function to toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Provide the theme and toggle function to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


