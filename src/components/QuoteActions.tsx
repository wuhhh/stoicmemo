import "./quoteActions.css";
import FavouriteIcon from "./icons/FavouriteIcon";
import XIcon from "./icons/XIcon";
import FacebookIcon from "./icons/FacebookIcon";

export default function QuoteActions(props: { className?: string }) {
	return (
		<div className={`quoteActions ${props.className}`}>
			{/* == Favourite == */}
			<button className="quoteActions__button py-2.5">
				<FavouriteIcon className="w-[16px]" />
				<span className="label">Favourite</span>
			</button>
			{/* == Divide == */}
			<div className="quoteActions__divide"></div>
			<div className="label mr-2.5">Share</div>
			{/* == X == */}
			<button className="p-2.5" aria-label="Share on X/Twitter">
				<XIcon className="w-[14px]" />
			</button>
			{/* == Facebook == */}
			<button className="p-2.5" aria-label="Share on Facebook">
				<FacebookIcon className="w-[7px]" />
			</button>
		</div>
	);
}
