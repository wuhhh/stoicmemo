"use client";

import MenuButton from "./MenuButton";
import InfoIcon from "./icons/InfoIcon";
import HeartIcon from "./icons/HeartIcon";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

import persistentStore from "../stores/persistent";
import transientStore from "../stores/transient";

export default function MenuButtons(props: { className?: string }) {
	const asideComponent = transientStore((state) => state.asideComponent);

	const handleInfoClick = () => {
		if (asideComponent === "info") {
			transientStore.getState().setAsideComponent(null);
			return;
		}
		transientStore.getState().setAsideComponent("info");
	};

	const handleFavouritesClick = () => {
		if (asideComponent === "favourites") {
			transientStore.getState().setAsideComponent(null);
			return;
		}
		transientStore.getState().setAsideComponent("favourites");
	};

	const handleDarkModeClick = () => {
		persistentStore.getState().toggleDarkMode();
	};

	return (
		<div className={`flex items-center gap-x-[7px] ${props.className}`}>
			<MenuButton onClick={handleInfoClick} ariaLabel="Show Info">
				<InfoIcon className="w-[4px]" />
			</MenuButton>
			<MenuButton onClick={handleFavouritesClick} ariaLabel="Show Favourites">
				<HeartIcon className="w-[18px] translate-y-px" />
			</MenuButton>
			<MenuButton onClick={handleDarkModeClick} ariaLabel="Enable Dark Mode">
				<SunIcon className="w-[22px]" />
			</MenuButton>
		</div>
	);
}
