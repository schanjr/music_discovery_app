/* eslint-disable */
import * as THREE from 'three'
import React, {useRef, useState} from 'react'
import {Canvas, useFrame, ThreeElements} from '@react-three/fiber'
import {useCounter} from "src/useReducer/counter";

function Box(props: ThreeElements['mesh'] & { scaleSize: number }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  return (
          <mesh
                  {...props}
                  ref={mesh}
                  scale={props.scaleSize}
                  onClick={(event) => setActive(!active)}
                  onPointerOver={(event) => setHover(true)}
                  onPointerOut={(event) => setHover(false)}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
          </mesh>
  )
}

export default function ThreeD() {
  const {state: counterState, dispatch: counterDispatch} = useCounter();
  return (
          <div>
            <h1 style={{"color": "white"}}> Stanley, Count: {counterState.count} </h1>
            <button onClick={() => counterDispatch({type: 'increment'})}>Increment</button>
            <button onClick={() => counterDispatch({type: 'decrement'})}>Decrement</button>

            <Canvas>
              <ambientLight/>
              <pointLight position={[10, 10, 10]}/>
              <Box position={[-1.2, 0, 0]} scaleSize={counterState.count}/>
              <Box position={[1.2, 0, 0]} scaleSize={counterState.count}/>
            </Canvas>
          </div>)
}