"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Color, type Group, type Mesh, type MeshStandardMaterial } from "three";

export default function Dust({ color = "#ffffff" }: { color?: string }) {
    const group = useRef<Group>(null);
    const { scene, animations } = useGLTF("/models/particles_dust/particles_dust.glb")
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        const firstAction = Object.values(actions)[0];
        firstAction?.play();
    }, [actions]);

    useEffect(() => {
        scene.traverse((child) => {
            const mesh = child as Mesh;
            if (mesh.isMesh) {
                (mesh.material as MeshStandardMaterial).color = new Color(color);
            }
        });
    }, [scene, color]);

    return (
        <group ref={group}>
            <primitive object={scene} position={[0,0,0]}/>
        </group>
    )
}
