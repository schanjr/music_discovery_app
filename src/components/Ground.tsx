/* eslint-disable */
import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";
import {texture} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

export function Ground() {
    // thanks to https://polyhaven.com/a/rough_plasterbrick_05 !
    // const texture = process.env.REACT_APP_SERVER_ENDPOINT + "/textures/raw_plank_wall_diff_1k.jpg";
    const [roughness, normal] = useLoader(TextureLoader, [
        process.env.REACT_APP_SERVER_ENDPOINT + "/textures/raw_plank_wall_diff_1k.jpg",
        process.env.REACT_APP_SERVER_ENDPOINT + "/textures/raw_plank_wall_diff_1k.jpg",
        // process.env.REACT_APP_SERVER_ENDPOINT + "/textures/terrain-roughness.jpg",
        // process.env.REACT_APP_SERVER_ENDPOINT + "/textures/terrain-normal.jpg",

    ]);

    useEffect(() => {
        [normal, roughness].forEach((t) => {
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(5, 5);
            t.offset.set(0, 0);
        });

        normal.encoding = LinearEncoding;
    }, [normal, roughness]);

    useFrame((state, delta) => {
        const t = -state.clock.getElapsedTime() * 0.01;
        roughness.offset.set(0, t % 1);
        normal.offset.set(0, t % 1);
    });

    return (
        <mesh rotation-x={-Math.PI * 0.5} castShadow={true} receiveShadow={true}>
            <planeGeometry args={[20, 20]} />
            <MeshReflectorMaterial
                    // normalMap={normal}
                    // roughnessMap={roughness}
                    map={normal}
                    mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                    // envMapIntensity={0}
                    // dithering={true}
                    // color={[0.015, 0.015, 0.015]}
                    // roughness={0.7}
                    // blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                    // mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                    // mixStrength={80} // Strength of the reflections
                    // mixContrast={1} // Contrast of the reflections
                    // resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                    //
                    // depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                    // minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                    // maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                    // depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                    // reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
            />
            {/*<ambientLight color="white" intensity={1} />*/}

        </mesh>
    );
}