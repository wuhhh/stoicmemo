"use client";

import transientStore from "../stores/transient";

export default function Info() {
	const showInfo = transientStore((state) => state.showInfo);
	const toggleInfo = transientStore((state) => state.showInfoToggle);

	return (
		<div
			// style={{ opacity: showInfo ? 1 : 0 }}
			className="absolute inset-y-0 right-0 w-1/4 pointer-events-none overflow-hidden"
		>
			<div
				style={{
					transition: "all 0.650s cubic-bezier(0.645, 0.045, 0.355, 1.000)", // cubic
					// transition: "all 0.75s cubic-bezier(0.770, 0.000, 0.175, 1.000)", // quart
					transform: showInfo
						? "translateX(0) scaleX(1) skewX(0)"
						: "translateX(10%) scaleX(0) skewX(-6deg)",
					opacity: showInfo ? 0.97 : 0.9,
				}}
				className="h-screen bg-deep-charcoal origin-top-left"
			></div>
			<div>
				<button onClick={toggleInfo} className="label pointer-events-auto">
					Close
				</button>
				<h1 className="quote text-2xl text-almost-black">INFO</h1>
			</div>
		</div>
	);
}
