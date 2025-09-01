import { create } from "zustand";
import { Theme } from "../../constants/theme";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeState>((set) => ({
  theme: Theme.DARK,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
    })),
}));
