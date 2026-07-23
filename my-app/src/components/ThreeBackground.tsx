"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Dust from "./Dust";
import PointCloudWavesFloor from "./PointCloudWavesFloor";
import SushiRolls from "./SushiRolls";
import CameraRig from "./CameraRig";

export default function ThreeBackground() {
    const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined);

    useEffect(() => {
        setEventSource(document.body);

        // Works around a canvas-sizing race (react-use-measure misses its
        // initial ResizeObserver callback under React Strict Mode), which
        // leaves the <canvas> stuck at the browser default 300x150 size.
        const raf = requestAnimationFrame(() => {
            window.dispatchEvent(new Event("resize"));
        });
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{position: [0,0,1], fov: 60}}
                eventSource={eventSource}
                eventPrefix="client"
            >
                <ambientLight intensity={2}/>
                <CameraRig/>
                <Dust color="#fc0320"/>
            </Canvas>
        </div>
    )
}