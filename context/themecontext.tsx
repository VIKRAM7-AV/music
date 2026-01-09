import React, { createContext, useState, useContext, useEffect } from "react";
import { Appearance, useColorScheme } from "react-native";

const LightTheme = {
  dark: false,
  colors: {
    background: "#ffffff",
    text: "#000000",
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    background: "#000000",
    text: "#ffffff",
  },
};

const ThemeContext = createContext({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }:any) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme === "dark" ? DarkTheme : LightTheme);

  useEffect(() => {
    // For now, just use system theme (AsyncStorage not compatible with Expo Go)
    setTheme(systemColorScheme === "dark" ? DarkTheme : LightTheme);
  }, [systemColorScheme]);

  const toggleTheme = () => {
    const newTheme = theme === DarkTheme ? LightTheme : DarkTheme;
    setTheme(newTheme);
    // TODO: Add AsyncStorage when using development build
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);