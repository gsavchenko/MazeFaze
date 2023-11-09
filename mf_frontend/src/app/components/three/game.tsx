import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Mesh } from "three";

export const Grid = () => {
  const position = useRef();

  useFrame(() => {
    console.log("Hey, I'm executing every frame!");
    position;
  });

  return (
    <mesh ref={position}>
      <planeGeometry args={[100, 50, 5, 5]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
};
