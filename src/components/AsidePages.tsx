/* eslint-disable react/no-unescaped-entities */
"use client";

import "./asidePages.css";
import transientStore from "../stores/transient";
import persistentStore from "../stores/persistent";
import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "./icons/CloseIcon";

function useTransition(
	active: boolean,
	ref: React.RefObject<HTMLElement>,
	_class: string
) {
	useEffect(() => {
		if (ref.current) {
			if (active) {
				setTimeout(() => {
					if (ref.current) {
						ref.current.classList.add(_class);
					}
				}, 50);
			} else {
				ref.current.classList.remove(_class);
			}
		}
	}, [_class, active, ref]);
}

/**
 * Info
 */
const Info = (props: { className?: string; active: boolean }) => {
	const ref = useRef<HTMLDivElement>(null);

	useTransition(props.active, ref, "-in");

	return (
		<div ref={ref} className="asidePages__page">
			<h1 className="quote text-2xl text-almost-white mb-12 pl-12 pr-16">
				Information
			</h1>
			<div className="scrollable">
				<div className="scrollable__inner">
					<p className="body">
						Stoic Memo offers a unique quote from Stoic philosophy each day.
						Many of these quotes are derived from two primary texts - Seneca's
						'Letters from a Stoic' and Marcus Aurelius's 'Meditations'. Perhaps,
						like me, you're someone who appreciates a succinct daily reminder to
						remain grounded and present.
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
			</div>
		</div>
	);
};

/**
 * Favourites
 */
const Favourites = (props: { className?: string | null; active: boolean }) => {
	const ref = useRef<HTMLDivElement>(null);
	const favourites = persistentStore((state) => state.favourites);

	useTransition(props.active, ref, "-in");

	const toDate = (date: string) => {
		const dateString: string = date.toString();
		const year: number = parseInt(dateString.slice(0, 4));
		const month: number = parseInt(dateString.slice(4, 6)) - 1;
		const day: number = parseInt(dateString.slice(6, 8));
		return new Date(year, month, day);
	};

	const prettyDate = (date: string) => {
		return toDate(date).toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "2-digit",
		});
	};

	return (
		<div ref={ref} className="asidePages__page">
			<h1 className="quote text-2xl text-almost-white mb-12 pl-12 pr-16">
				Favourites
			</h1>
			{favourites.length === 0 && (
				<p className="body pl-12 pr-16 text-warm-grey opacity-50">
					You don't have any favourites yet.
				</p>
			)}
			{favourites.length > 0 && (
				<div className="favourites scrollable">
					<div className="scrollable__inner">
						{favourites.map((favourite) => (
							<div key={favourite.id} className="favourite mb-10 last:mb-0">
								<div className="label text-blush-petal mb-5">
									{prettyDate(favourite.date)}
								</div>
								<div className="body text-warm-grey">{favourite.quote}</div>
								<div className="font-bold text-sm text-hot-pink mt-2.5">
									{favourite.author}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

/**
 * Aside
 */
export default function AsideOverlay(props: { children?: any }) {
	const ref = useRef<HTMLDivElement>(null);

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

	useTransition(!!asideComponent, ref, "-active");

	return (
		<div
			ref={ref}
			className="asidePages absolute inset-y-0 right-0 w-1/2 overflow-hidden"
			style={{ pointerEvents: asideComponent ? "auto" : "none" }}
		>
			<div
				style={{
					// transition: `all ${transitionDuration}ms cubic-bezier(0.770, 0.000, 0.175, 1.000)`, // quart
					transform: asideComponent
						? "translateX(0) scaleX(1) skewX(0)"
						: "translateX(10%) scaleX(0) skewX(-6deg)",
					opacity: asideComponent ? 0.97 : 0.9,
				}}
				className="h-screen bg-deep-charcoal origin-top-left transition ease-cubic duration-1000"
			></div>
			<div className="absolute inset-0">
				<div className="pt-16 flex flex-col h-full">
					<button
						onClick={() => setAsideComponent(null)}
						className="asidePages__closePage"
						aria-label={`Close ${activeComponent}`}
					>
						<CloseIcon className="w-[13px] text-hot-pink" />
					</button>
					{activeComponent === "info" && <Info active={!isTransitioning} />}
					{activeComponent === "favourites" && (
						<Favourites active={!isTransitioning} />
					)}
				</div>
			</div>
		</div>
	);
}
