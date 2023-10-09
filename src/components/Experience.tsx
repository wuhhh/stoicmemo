"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	AccumulativeShadows,
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
	const shadowProps = useControls("shadows", {
		color: "#a39991",
		colorBlend: 4,
		toneMapped: true,
		alphaTest: 0.7,
		opacity: 10,
		scale: 4,
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
					<RandomizedLight {...randomizedLightProps} />
				</AccumulativeShadows>
			</group>
			{/* <Environment frames={Infinity} resolution={128} blur={1}>
				<Lightformers />
			</Environment> */}
			<ambientLight intensity={2.5} />
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
