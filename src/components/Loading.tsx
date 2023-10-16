"use client";

import "./loading.css";
import Image from "next/image";
import { CSSProperties, useEffect, useRef } from "react";
import transientStore from "@/stores/transient";

export default function Loading() {
	const loading = useRef<HTMLDivElement>(null);
	const logoClipper = useRef<HTMLDivElement>(null);
	const logoClipperLogo = useRef<HTMLImageElement>(null);
	const experienceLoaded = transientStore((state) => state.experienceLoaded);

	useEffect(() => {
		if (logoClipper.current && logoClipperLogo.current) {
			logoClipper.current.style.transform = "translateX(-29%)";
			logoClipperLogo.current.style.transform = "translateX(29%)";

			logoClipper.current.addEventListener("transitionend", () => {
				if (loading.current) {
					loading.current.classList.add("-transitionsComplete");
				}
			});
		}
	}, []);

	return (
		<div
			ref={loading}
			className={`loading ${experienceLoaded ? "-loaded" : ""}`}
		>
			<div className="loading__wrapper">
				<div className="loading__omega !bg-hot-pink !delay-[30ms] mix-blend-difference"></div>
				<div className="loading__omega"></div>
				<div className="loading__alpha !bg-hot-pink !delay-[130ms] mix-blend-difference"></div>
				<div className="loading__alpha"></div>
				<div className="loading__logos">
					<Image
						src="/stoicmemo-outlined.svg"
						width={114}
						height={90}
						alt="Stoic Memo Logo"
					/>
					<div ref={logoClipper} className="loading__logoClipper">
						<Image
							ref={logoClipperLogo}
							className="loading__logoClipper__logo"
							src="/stoicmemo.svg"
							width={114}
							height={90}
							alt="Stoic Memo Logo"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
