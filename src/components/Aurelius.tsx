/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
	nodes: {
		Object_2: THREE.Mesh;
		Object_3: THREE.Mesh;
	};
	materials: {
		["Scene_-_Root"]: THREE.MeshStandardMaterial;
	};
};

export function Model(props: JSX.IntrinsicElements["group"]) {
	const { nodes, materials } = useGLTF(
		"/assets/gsxnet-aurelius-transformed.glb"
	) as GLTFResult;
	const aureliusMat = materials["Scene_-_Root"];
	// aureliusMat.metalness = 0.1;
	aureliusMat.roughness = 0.6;
	// aureliusMat.envMapIntensity = 2.0;

	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				geometry={nodes.Object_2.geometry}
				material={aureliusMat}
			/>
			<mesh
				castShadow
				geometry={nodes.Object_3.geometry}
				material={aureliusMat}
			/>
		</group>
	);
}

useGLTF.preload("/assets/gsxnet-aurelius-transformed.glb");
