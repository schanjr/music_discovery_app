/* eslint-disable */
// import * as THREE from 'three'
import React, {useRef, useState} from 'react'
import {Canvas, useFrame, ThreeElements} from '@react-three/fiber'
import {counter} from "src/useReducer/counter";

function Box(props: ThreeElements['mesh']) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame((state, delta) => (mesh.current.rotation.x += delta))
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
        </mesh>
    )
}

export default function ThreeD() {
    const {state: counterState, dispatch: counterDispatch} = counter();
    return (
        <div>
            <h1 style={{"color": "white"}}> Stanley, Count: {counterState.count} </h1>
            <button onClick={() => counterDispatch({type: 'increment'})}>Increment</button>
            <button onClick={() => counterDispatch({type: 'decrement'})}>Decrement</button>

            <Canvas>
                <ambientLight/>
                <pointLight position={[10, 10, 10]}/>
                <Box position={[-1.2, 0, 0]}/>
                <Box position={[1.2, 0, 0]}/>
            </Canvas>
        </div>)


}