/* eslint-disable */
import React, {Suspense, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Canvas} from "@react-three/fiber";
import {
    EffectComposer,
    DepthOfField,
    Bloom,
} from "@react-three/postprocessing";
import {
    OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei";
import "./cassetteShow.css";
import {MusicCassette} from "../../components/MusicCassette"
import {Ground} from "../../components/Ground";
import * as THREE from "three";

function CassetteShow() {
    const navigate = useNavigate();
    return (
        <>
            <OrbitControls
                target={[0, 0.35, 0]}
                maxPolarAngle={1.45}
            />

            <PerspectiveCamera makeDefault fov={50} position={[3, 3, 3]}/>
            <color args={[0, 0, 0]} attach="background"/>
            <mesh
                onClick={() => {navigate('/artists')}}>
                <MusicCassette/>
            </mesh>
            <spotLight
                intensity={0.5}
                color={[1, 1, 1]}
                angle={0.6}
                penumbra={0.5}
                position={[5, 5, 0]}
                castShadow={true}
                shadow-bias={-0.0001}
            />
            <Ground/>

            <EffectComposer>
                <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480}/>
                <Bloom
                    intensity={1.3} // The bloom intensity.
                    width={300} // render width
                    height={300} // render height
                    kernelSize={5} // blur kernel size
                    luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
                    luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
                />
            </EffectComposer>

        </>
    );
}

function App() {
    return (
        <Suspense fallback={null}>
            <Canvas shadows linear={true}>
                <CassetteShow/>
            </Canvas>
        </Suspense>
    );
}

export default App;