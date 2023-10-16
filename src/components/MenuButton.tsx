"use client";

import "./menuButton.css";

export default function MenuButton(props: {
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
	ariaLabel?: string;
}) {
	return (
		<button onClick={props.onClick} className={props.className}>
			{props.children}
		</button>
	);
}
