import { create } from "zustand";

interface TransientState {
	experienceLoaded: boolean;
	setExperienceLoaded: () => void;
	quote: number | null;
	setQuote: (id: number) => void;
	showFavourites: boolean;
	showFavouritesToggle: () => void;
	showInfo: boolean;
	showInfoToggle: () => void;
}

export default create<TransientState>()((set) => ({
	experienceLoaded: false,
	setExperienceLoaded: () => {
		setTimeout(() => {
			set(() => ({ experienceLoaded: true }));
		}, 1000);
	},
	quote: null,
	setQuote: (id: number) => set(() => ({ quote: id })),
	showInfo: false,
	showInfoToggle: () => set((state) => ({ showInfo: !state.showInfo })),
	showFavourites: false,
	showFavouritesToggle: () =>
		set((state) => ({ showFavourites: !state.showFavourites })),
}));
