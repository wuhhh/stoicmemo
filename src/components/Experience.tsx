"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	AccumulativeShadows,
	accumulativeContext as AccumulativeContext,
	Environment,
	Float,
	Lightformer,
	OrbitControls,
	PerspectiveCamera,
	RandomizedLight,
} from "@react-three/drei";
import { Model as Aurelius } from "@/components/Aurelius";
import { Leva, useControls } from "leva";
import { Group } from "three";

import persistentStore from "@/stores/persistent";

export default function Experience() {
	return (
		<Canvas id="experience" shadows dpr={1.5}>
			<Scene />
			<Float floatingRange={[0.15, 0.2]}>
				<PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={30} />
			</Float>
			<OrbitControls />
			<Leva hidden />
		</Canvas>
	);
}

const Scene = () => {
	const ambientLight = useRef<THREE.AmbientLight>(null);
	const darkMode = useRef(persistentStore.getState().darkMode);

	useEffect(
		() =>
			persistentStore.subscribe((state) => (darkMode.current = state.darkMode)),
		[]
	);

	useFrame((_, delta) => {
		if (
			darkMode.current &&
			ambientLight.current &&
			ambientLight.current.intensity > 0.0
		) {
			ambientLight.current.intensity -= delta * 2.0;
		} else if (
			!darkMode.current &&
			ambientLight.current &&
			ambientLight.current.intensity < 1.5
		) {
			ambientLight.current.intensity += delta * 2.0;
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

	return (
		<>
			<group position={[0, -0.375, 0]}>
				<Aurelius castShadow />
				<AccumulativeShadows frames={40} {...shadowProps}>
					<RandomizedLight {...randomizedLightProps} mapSize={256} />
				</AccumulativeShadows>
			</group>
			{/* <Environment frames={Infinity} resolution={128} blur={1}>
				<Lightformers />
			</Environment> */}
			<ambientLight ref={ambientLight} intensity={0.0} />
		</>
	);
};

const Lightformers = () => {
	const lightGroup = useRef<Group>(null);

	const lightFormerProps = useControls("lightFormer", {
		intensity: 6,
		form: "ring",
		scale: 0.5,
		target: [0, 0.375, 0],
	});

	useFrame(({ clock }) => {
		if (lightGroup.current) {
			lightGroup.current.rotation.y = clock.getElapsedTime();
		}
	});

	const dist = 0.675;

	return (
		<group ref={lightGroup} position={[0, -1, 0]}>
			<Lightformer
				color="blue"
				position={[-dist, dist, dist]}
				{...lightFormerProps}
			/>
			<Lightformer
				color="indigo"
				position={[dist, dist, -dist]}
				{...lightFormerProps}
			/>
			<Lightformer
				color="purple"
				position={[dist, dist, dist]}
				{...lightFormerProps}
			/>
			<Lightformer
				color="red"
				position={[-dist, dist, -dist]}
				{...lightFormerProps}
			/>
		</group>
	);
};
