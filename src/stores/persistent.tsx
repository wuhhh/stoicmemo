import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersistentState {
	darkMode: boolean;
	toggleDarkMode: () => void;
	favourites: number[];
	addFavourite: (id: number) => void;
	removeFavourite: (id: number) => void;
}

export default create<PersistentState>()(
	persist(
		(set) => ({
			darkMode: false,
			toggleDarkMode: () =>
				set((state) => {
					// Set html class
					if (state.darkMode) {
						document.documentElement.classList.remove("-dark");
					} else {
						document.documentElement.classList.add("-dark");
					}
					return { darkMode: !state.darkMode };
				}),
			favourites: [],
			addFavourite: (id) =>
				set((state) => ({
					favourites: [...state.favourites, id],
				})),
			removeFavourite: (id) =>
				set((state) => ({
					favourites: state.favourites.filter((x) => x !== id),
				})),
		}),
		{
			name: "favourites-storage",
		}
	)
);
