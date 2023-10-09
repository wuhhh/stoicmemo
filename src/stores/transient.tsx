import { create } from "zustand";

interface TransientState {
	quote: number | null;
	setQuote: (id: number) => void;
	showFavourites: boolean;
	showFavouritesToggle: () => void;
	showInfo: boolean;
	showInfoToggle: () => void;
}

export default create<TransientState>()((set) => ({
	quote: null,
	setQuote: (id: number) => set(() => ({ quote: id })),
	showInfo: false,
	showInfoToggle: () => set((state) => ({ showInfo: !state.showInfo })),
	showFavourites: false,
	showFavouritesToggle: () =>
		set((state) => ({ showFavourites: !state.showFavourites })),
}));
