import React, { createContext, useEffect, useState } from "react";
import "../../../colors.scss"; // This import will apply the CSS variables globally

export const ThemeContext = createContext(undefined);

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    const root = document.documentElement;

    // Define which color theme to apply
    const colorTheme = isDark ? "dark" : "light";

    // Apply the color variables for the chosen theme
    root.setAttribute("data-theme", colorTheme);
  }, [isDark]);

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
