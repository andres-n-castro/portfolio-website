"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, Vector2 } from "three";

export default function CameraRig() {
    const smoothed = useRef(new Vector2(0, 0));

    useFrame((state) => {
        const { camera, pointer } = state;

        smoothed.current.x = MathUtils.lerp(smoothed.current.x, pointer.x, 0.015);
        smoothed.current.y = MathUtils.lerp(smoothed.current.y, pointer.y, 0.015);

        // Position: the dominant, clearly-visible effect. The camera pans
        // toward the cursor directly (no lookAt involved), with more range
        // upward than downward per the "rises more" request.
        const targetX = smoothed.current.x * 0.4;
        const targetY = smoothed.current.y > 0
            ? smoothed.current.y * 0.7
            : smoothed.current.y * 0.3;

        camera.position.x = MathUtils.lerp(camera.position.x, targetX, 0.025);
        camera.position.y = MathUtils.lerp(camera.position.y, targetY, 0.025);

        // Tilt: a small, independent rotation layered on top of the position
        // move, capped so it stays "slight" regardless of how far the camera
        // has panned. Pitches down whenever the cursor is off vertical
        // center; yaws toward the cursor horizontally.
        const targetPitch = -Math.abs(smoothed.current.y) * 0.05;
        const targetYaw = -smoothed.current.x * 0.05;

        camera.rotation.x = MathUtils.lerp(camera.rotation.x, targetPitch, 0.025);
        camera.rotation.y = MathUtils.lerp(camera.rotation.y, targetYaw, 0.025);
    });

    return null;
}
