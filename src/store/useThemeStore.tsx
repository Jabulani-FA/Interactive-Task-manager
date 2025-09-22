import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark", // default
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage", // key in localStorage
    }
  )
);
