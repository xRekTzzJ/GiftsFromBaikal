import { create } from "zustand";
import { Theme } from "../../constants";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeState>((set) => {
  const currentTheme = (localStorage.getItem("theme") as Theme) ?? Theme.DARK;

  return {
    theme: currentTheme,
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

        localStorage.setItem("theme", newTheme);
        return {
          theme: newTheme,
        };
      }),
  };
});
