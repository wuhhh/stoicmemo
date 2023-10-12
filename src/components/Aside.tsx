"use client";

import "./aside.css";
import transientStore from "../stores/transient";
import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "./icons/CloseIcon";

function useTransition(active: boolean, ref: React.RefObject<HTMLElement>) {
	useEffect(() => {
		if (ref.current) {
			if (active) {
				setTimeout(() => {
					if (ref.current) {
						ref.current.classList.add("-in");
					}
				}, 10);
			} else {
				ref.current.classList.remove("-in");
			}
		}
	}, [active, ref]);
}

/**
 * Info
 */
const Info = (props: { className?: string; active: boolean }) => {
	const ref = useRef<HTMLDivElement>(null);

	useTransition(props.active, ref);

	return (
		<div ref={ref} className="aside__page">
			<h1 className="quote text-2xl text-almost-white mb-12">Information</h1>
			<p className="body">
				Stoic Memo offers a unique quote from Stoic philosophy each day. Many of
				these quotes are derived from two primary texts - Seneca's 'Letters from
				a Stoic' and Marcus Aurelius's 'Meditations'. Perhaps, like me, you're
				someone who appreciates a succinct daily reminder to remain grounded and
				present.
			</p>
			<div className="credits">
				<p>
					Website concept, design and development by{" "}
					<a href="https://huwroberts.net">Huw Roberts.</a>
				</p>
				<p>Icons from Remix Icon, an open-source icon library.</p>
				<p>
					<a href="https://skfb.ly/6soGn">"Marcus Aurelius" 3D model</a> by
					GSXNet is licensed under{" "}
					<a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
						CC Attribution-NonCommercial-ShareAlike
					</a>
					.
				</p>
			</div>
		</div>
	);
};

/**
 * Favourites
 */
const Favourites = (props: { className?: string | null; active: boolean }) => {
	const ref = useRef<HTMLDivElement>(null);

	useTransition(props.active, ref);

	return (
		<div ref={ref} className="aside__page">
			<h1 className="quote text-2xl text-almost-white mb-12">Favourites</h1>
		</div>
	);
};

/**
 * Aside
 */
export default function AsideOverlay(props: { children?: any }) {
	const transitionDuration = 1000;
	const asideComponent = transientStore((state) => state.asideComponent);
	const setAsideComponent = transientStore((state) => state.setAsideComponent);
	const [activeComponent, setActiveComponent] = useState(asideComponent);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		if (asideComponent !== activeComponent) {
			setIsTransitioning(true);
			setTimeout(() => {
				setActiveComponent(asideComponent);
				setIsTransitioning(false);
			}, transitionDuration);
		}
	}, [asideComponent, activeComponent]);

	return (
		<div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
			<div
				style={{
					transition: `all ${transitionDuration}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`, // cubic
					// transition: `all ${transitionDuration}ms cubic-bezier(0.770, 0.000, 0.175, 1.000)`, // quart
					transform: asideComponent
						? "translateX(0) scaleX(1) skewX(0)"
						: "translateX(10%) scaleX(0) skewX(-6deg)",
					opacity: asideComponent ? 0.97 : 0.9,
				}}
				className="h-screen bg-deep-charcoal origin-top-left"
			></div>
			<div className="absolute inset-0">
				<div className="py-16 pl-12 pr-16">
					{activeComponent && (
						<button
							onClick={() => setAsideComponent(null)}
							className="relative w-[44px] h-[44px] rounded-full border border-hot-pink flex items-center justify-center"
							aria-label={`Close ${activeComponent}`}
						>
							<CloseIcon className="w-[13px] text-hot-pink" />
						</button>
					)}
					{activeComponent === "info" && <Info active={!isTransitioning} />}
					{activeComponent === "favourites" && (
						<Favourites active={!isTransitioning} />
					)}
				</div>
			</div>
		</div>
	);
}
