"use client";

import "./menuButton.css";

export default function MenuButton(props: {
	children: React.ReactNode;
	onClick?: () => void;
	ariaLabel?: string;
}) {
	return (
		<button onClick={props.onClick} className="menuButton">
			{props.children}
		</button>
	);
}
