"use client";

export default function MenuButton(props: {
	children: React.ReactNode;
	onClick?: () => void;
	ariaLabel?: string;
}) {
	return (
		<button
			onClick={props.onClick}
			className="menuButton w-[44px] h-[44px] bg-nebula-indigo rounded-full flex items-center justify-center"
		>
			{props.children}
		</button>
	);
}
