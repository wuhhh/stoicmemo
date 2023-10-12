import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Quote } from "@/types/index";

interface PersistentState {
	darkMode: boolean;
	toggleDarkMode: () => void;
	favourites: Quote[];
	addFavourite: (favourite: Quote) => void;
	removeFavourite: (favourite: Quote) => void;
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
			addFavourite: (favourite: Quote) =>
				set((state) => {
					const favourites = [...state.favourites, favourite];
					return { favourites };
				}),
			removeFavourite: (favourite: Quote) =>
				set((state) => {
					const favourites = state.favourites.filter(
						(fav) => fav.id !== favourite.id
					);
					return { favourites };
				}),
		}),
		{
			name: "stoicmemo-storage",
		}
	)
);
