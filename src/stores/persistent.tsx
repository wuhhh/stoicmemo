import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersistentState {
	favourites: number[];
	addFavourite: (id: number) => void;
	removeFavourite: (id: number) => void;
}

export default create<PersistentState>()(
	persist(
		(set) => ({
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
