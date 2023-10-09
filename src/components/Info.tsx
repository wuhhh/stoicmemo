"use client";

import transientStore from "../stores/transient";

export default function Info() {
	const showInfo = transientStore((state) => state.showInfo);
	const toggleInfo = transientStore((state) => state.showInfoToggle);

	return (
		<div
			style={{ opacity: showInfo ? 1 : 0 }}
			className="absolute inset-0 pointer-events-none bg-hot-pink flex items-center justify-center transition-opacity duration-500"
		>
			<div>
				<button onClick={toggleInfo} className="label pointer-events-auto">
					Close
				</button>
				<h1 className="quote text-[200px] text-almost-black">INFO</h1>
			</div>
		</div>
	);
}
