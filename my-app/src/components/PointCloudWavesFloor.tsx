import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export default function PointCloudWavesFloor() {

    const { scene } = useGLTF("models/point_cloud_waves_floor/point_cloud_waves_floor.glb");
    const ref = useRef(null); 

    return (
        <group ref={ref}>
            <primitive
            object={scene}
            position={[-6,5,-11]}
            scale={7}
            rotation={[0,0,0]}
            />
        </group>
    )
}