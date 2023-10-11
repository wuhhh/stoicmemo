"use client";

import { CSSProperties } from "react";
import transientStore from "@/stores/transient";

export default function Loading() {
	const experienceLoaded = transientStore((state) => state.experienceLoaded);
	const style: CSSProperties | undefined = experienceLoaded
		? { opacity: 0, pointerEvents: "none" }
		: undefined;

	return (
		<div
			style={style}
			className="absolute inset-0 flex items-center justify-center text-7xl text-center text-hot-pink bg-slate-night transition-opacity duration-1000"
		>
			Loading...
		</div>
	);
}
