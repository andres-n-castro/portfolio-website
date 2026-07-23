"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Brain() {
    const { scene } = useGLTF("/models/brain/brain_point_cloud.glb");
    const ref = useRef<THREE.Group>(null);

    const center = useMemo(() => {
        const box = new THREE.Box3().setFromObject(scene);
        return box.getCenter(new THREE.Vector3());
    }, [scene]);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.002;
        }
    })

    return (
        <group ref={ref} scale={15} position={[0,0,0]}>
            <primitive
            object={scene}
            position={[-center.x, -center.y, -center.z]}
            />
        </group>
    );
}