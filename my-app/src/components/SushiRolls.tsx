"use client";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group } from "three";


export default function SushiRolls() {

    const group = useRef<Group>(null);
    const { scene, animations } = useGLTF("/models/sushi_rolls/sushi_rolls.glb")
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        const firstAction = Object.values(actions)[0];
        firstAction?.play();
    }, [actions]);

    return (
        <group ref={group}>
            <primitive
            object={scene}
            position={[0,0,-55]}/>
        </group>
    )
}