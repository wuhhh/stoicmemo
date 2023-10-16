"use client";

import * as THREE from "three";
import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	AccumulativeShadows,
	Environment,
	Float,
	Lightformer,
	PerspectiveCamera,
	RandomizedLight,
} from "@react-three/drei";
import { Model as Aurelius } from "@/components/Aurelius";
import { Leva, useControls } from "leva";
import { Group } from "three";

import persistentStore from "@/stores/persistent";
import transientStore from "@/stores/transient";

export default function Experience() {
	return (
		<>
			<Suspense fallback={null}>
				<Canvas id="experience" shadows dpr={1.5}>
					<Scene />
					<Float floatingRange={[-0.025, 0.025]} rotationIntensity={0.25}>
						<PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={30} />
					</Float>
					{/* <Leva hidden /> */}
				</Canvas>
			</Suspense>
		</>
	);
}

const Scene = () => {
	const ambientLight = useRef<THREE.AmbientLight>(null);
	const darkMode = useRef(persistentStore.getState().darkMode);

	useEffect(() => {
		persistentStore.subscribe((state) => (darkMode.current = state.darkMode));
		const setExperienceLoaded = transientStore.getState().setExperienceLoaded;
		setExperienceLoaded();
	}, []);

	useFrame((_, delta) => {
		if (
			darkMode.current &&
			ambientLight.current &&
			ambientLight.current.intensity > 0.25
		) {
			ambientLight.current.intensity -= delta;
		} else if (
			!darkMode.current &&
			ambientLight.current &&
			ambientLight.current.intensity < 1.5
		) {
			ambientLight.current.intensity += delta;
		}
	});

	// const shadows = useRef<React.ComponentRef<typeof AccumulativeShadows>>(null);

	const shadowProps = useControls("shadows", {
		color: "#726c66",
		colorBlend: 4,
		toneMapped: true,
		alphaTest: 0.7,
		scale: 4,
		opacity: 1,
	});

	const randomizedLightProps = useControls("randomizedLight", {
		intensity: Math.PI,
		amount: 8,
		radius: 5,
		ambient: 0.8,
		position: [-20, 0, 11],
		bias: 0.001,
	});

	/**
	 * Get window mouse position
	 */
	const mouse = useRef(new THREE.Vector2(0, 0));
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
		};
		window.addEventListener("mousemove", handleMouseMove);
	}, []);

	/**
	 * Rotate groups on mousemove with damping
	 */
	const modelGroup = useRef<Group>(null);
	const xDiv = 8;
	const yDiv = 16;
	const xSpeed = 4.0;
	const ySpeed = 4.0;

	useFrame((_, delta) => {
		if (modelGroup.current) {
			modelGroup.current.rotation.y +=
				((mouse.current.x * Math.PI) / xDiv) * delta -
				modelGroup.current.rotation.y * (delta * xSpeed);

			modelGroup.current.rotation.x +=
				((mouse.current.y * -1 * Math.PI) / yDiv) * delta -
				modelGroup.current.rotation.x * (delta * ySpeed);
		}
	});

	return (
		<>
			<group ref={modelGroup}>
				<group position={[0, -0.375, 0]}>
					<Aurelius castShadow />
					<AccumulativeShadows frames={40} {...shadowProps}>
						<RandomizedLight {...randomizedLightProps} mapSize={256} />
					</AccumulativeShadows>
				</group>
			</group>

			<Environment frames={Infinity} resolution={128} blur={1}>
				<Lightformers />
			</Environment>
			<ambientLight ref={ambientLight} intensity={0.0} />
		</>
	);
};

const Lightformers = () => {
	const lightGroup = useRef<Group>(null);

	const lightFormerProps = useControls("lightFormer", {
		intensity: 6,
		form: "ring",
		scale: 1.0,
		target: [-1.0, 0, 0],
		color1: "#5151c4",
		color2: "#b16a87",
		color3: "#be91be",
		color4: "#865555",
		yRotation: 0,
	});

	const dist = 0.675;
	const darkMode = useRef(persistentStore.getState().darkMode);

	useEffect(() => {
		persistentStore.subscribe((state) => (darkMode.current = state.darkMode));
	}, []);

	useFrame((_, delta) => {
		if (
			darkMode.current &&
			lightGroup.current &&
			lightGroup.current.rotation.y < 1
		) {
			lightGroup.current.rotation.y += delta;
		} else if (
			!darkMode.current &&
			lightGroup.current &&
			lightGroup.current.rotation.y > -1
		) {
			lightGroup.current.rotation.y -= delta;
		}
	});

	return (
		<group
			ref={lightGroup}
			position={[0, -1, 0]}
			rotation={[0, lightFormerProps.yRotation, 0]}
		>
			<Lightformer
				color={lightFormerProps.color1}
				position={[-dist, dist, dist]}
				{...lightFormerProps}
			/>
			<Lightformer
				color={lightFormerProps.color2}
				position={[dist, dist, -dist]}
				{...lightFormerProps}
			/>
			<Lightformer
				color={lightFormerProps.color3}
				position={[dist, dist, dist]}
				{...lightFormerProps}
			/>
			<Lightformer
				color={lightFormerProps.color4}
				position={[-dist, dist, -dist]}
				{...lightFormerProps}
			/>
		</group>
	);
};
