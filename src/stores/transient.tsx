import { create } from "zustand";

interface TransientState {
	asideComponent: string | null;
	setAsideComponent: (component: string | null) => void;
	experienceLoaded: boolean;
	setExperienceLoaded: () => void;
	quote: number | null;
	setQuote: (id: number) => void;
}

export default create<TransientState>()((set) => ({
	// Aside component
	asideComponent: null,
	setAsideComponent: (component) => set(() => ({ asideComponent: component })),

	// Experience
	experienceLoaded: false,
	setExperienceLoaded: () => {
		setTimeout(() => {
			set(() => ({ experienceLoaded: true }));
		}, 1000);
	},

	// Quote
	quote: null,
	setQuote: (id: number) => set(() => ({ quote: id })),
}));
