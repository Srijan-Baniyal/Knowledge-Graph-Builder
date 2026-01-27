"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>()(
	persist(
		(set) => ({
			theme: "light",
			setTheme: (theme) => set({ theme }),
			toggleTheme: () =>
				set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
		}),
		{
			name: "theme",
		}
	)
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const theme = useThemeStore((state) => state.theme);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	return <>{children}</>;
}

export const useTheme = useThemeStore;
