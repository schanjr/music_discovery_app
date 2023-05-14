import React, {useEffect, useState} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Mesh} from "three";

export function MusicCassette() {
  const [hovered, setHovered] = useState(false);
  const gltf = useLoader(
          GLTFLoader,
          process.env.REACT_APP_SERVER_ENDPOINT + "/models/music_cassette/scene.gltf"
  );
  useEffect(() => {
    gltf.scene.scale.set(20, 20, 20);
    gltf.scene.position.set(0.5, 1, 0.5);
    gltf.scene.rotation.set(8, 7, 2.1);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);
  useFrame((state, delta) => {
    if (hovered) {
      gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.material.color.set(0x4bfa7a);
        }
      });
    } else {
      gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.material.color.set(0x000000);
        }
      });
    }
  });

  return (
          <primitive
                  // eslint-disable-next-line
                  object={gltf.scene}
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
          />
  );
}
