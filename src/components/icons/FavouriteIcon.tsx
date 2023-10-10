import "./favouriteIcon.css";

import { useEffect, useState } from "react";

export default function FavouriteIcon(props: {
	className?: string;
	isFavourite: boolean;
}) {
	const [clientSideFavourite, setClientSideFavourite] = useState(false);

	useEffect(() => {
		setClientSideFavourite(props.isFavourite);
	}, [props.isFavourite]);

	return (
		<svg
			className={`favouriteIcon ${clientSideFavourite ? "-favourite" : ""} ${
				props.className
			}`}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 16 18"
		>
			{/* <path
				className={`${
					clientSideFavourite ? "fill-hot-pink" : "fill-almost-black"
				} transition duration-500`}
				d="M15.111 0H.89A.9.9 0 0 0 .26.254.855.855 0 0 0 0 .866v16.7a.425.425 0 0 0 .202.364.453.453 0 0 0 .424.032L8 14.754l7.374 3.207a.454.454 0 0 0 .572-.188.425.425 0 0 0 .054-.207V.866c0-.23-.094-.45-.26-.612A.9.9 0 0 0 15.11 0ZM8 9.963l-2.612 1.339.498-2.835-2.113-2.008 2.92-.414L8 3.465l1.307 2.58 2.92.414-2.113 2.008.498 2.835L8 9.963Z"
			/>
			<path
				className={`${
					clientSideFavourite ? "fill-almost-black" : "fill-transparent"
				} transition duration-500`}
				d="M5.388 11.302 8 9.963l2.612 1.339-.498-2.835 2.113-2.008-2.92-.414L8 3.465l-1.307 2.58-2.92.414 2.113 2.008-.498 2.835Z"
			/> */}
			<path
				className="favouriteIcon__pennant"
				d="M15.111 0H.89A.9.9 0 0 0 .26.254.855.855 0 0 0 0 .866v16.7a.425.425 0 0 0 .202.364.453.453 0 0 0 .424.032L8 14.754l7.374 3.207a.454.454 0 0 0 .572-.188.425.425 0 0 0 .054-.207V.866c0-.23-.094-.45-.26-.612A.9.9 0 0 0 15.11 0ZM8 9.963l-2.612 1.339.498-2.835-2.113-2.008 2.92-.414L8 3.465l1.307 2.58 2.92.414-2.113 2.008.498 2.835L8 9.963Z"
			/>
			<path
				className="favouriteIcon__star"
				d="M5.388 11.302 8 9.963l2.612 1.339-.498-2.835 2.113-2.008-2.92-.414L8 3.465l-1.307 2.58-2.92.414 2.113 2.008-.498 2.835Z"
			/>
		</svg>
	);
}
