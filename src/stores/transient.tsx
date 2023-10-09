import { create } from "zustand";

interface TransientState {
	showInfo: boolean;
	showInfoToggle: () => void;
	showFavourites: boolean;
	showFavouritesToggle: () => void;
}

export default create<TransientState>()((set) => ({
	showInfo: false,
	showInfoToggle: () => set((state) => ({ showInfo: !state.showInfo })),
	showFavourites: false,
	showFavouritesToggle: () =>
		set((state) => ({ showFavourites: !state.showFavourites })),
}));
