"use client";

import "./quoteActions.css";
import FavouriteIcon from "./icons/FavouriteIcon";
import XIcon from "./icons/XIcon";
import FacebookIcon from "./icons/FacebookIcon";
import persistentStore from "../stores/persistent";
import { Quote } from "@/types/index";

export default function QuoteActions(props: {
	className?: string;
	quote: Quote;
}) {
	const favourites = persistentStore((state) => state.favourites);
	const favouritesIds = favourites.map((fav) => fav.id);

	const handleFavouriteClick = () => {
		if (favouritesIds.includes(props.quote.id)) {
			return persistentStore.getState().removeFavourite(props.quote);
		}
		persistentStore.getState().addFavourite(props.quote);
	};

	const handleShareX = () => {
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(
				props.quote.quote
			)}&hashtags=stoicmemo&url=${encodeURIComponent(window.location.href)}`
		);
	};

	const handleShareFacebook = () => {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				window.location.href
			)}`
		);
	};

	return (
		<div className={`quoteActions ${props.className}`}>
			{/* == Favourite == */}
			<button
				onClick={handleFavouriteClick}
				className="quoteActions__button py-2.5"
			>
				<FavouriteIcon
					className="w-[16px]"
					isFavourite={favouritesIds.includes(props.quote.id)}
				/>
				<span className="label">Favourite</span>
			</button>
			{/* == Divide == */}
			<div className="quoteActions__divide"></div>
			<div className="label mr-2.5">Share</div>
			{/* == X == */}
			<button
				onClick={handleShareX}
				className="p-2.5"
				aria-label="Share on X/Twitter"
			>
				<XIcon className="w-[14px]" />
			</button>
			{/* == Facebook == */}
			<button
				onClick={handleShareFacebook}
				className="p-2.5"
				aria-label="Share on Facebook"
			>
				<FacebookIcon className="w-[7px]" />
			</button>
		</div>
	);
}
