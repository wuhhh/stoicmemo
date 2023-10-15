"use client";

import { useEffect } from "react";
import persistentStore from "../stores/persistent";

/**
 * Set local state based on the user's system preferences.
 */
export default function LocalFu() {
	useEffect(() => {
		const html = document.documentElement;
		const darkMode = persistentStore.getState().darkMode;
		if (darkMode || window.matchMedia("(prefers-color-scheme: dark)").matches) {
			html.classList.add("-dark");
		}
		if (
			window.matchMedia("(prefers-color-scheme: dark)").matches &&
			!darkMode
		) {
			persistentStore.setState({ darkMode: true });
		}
	}, []);

	return null;
}
