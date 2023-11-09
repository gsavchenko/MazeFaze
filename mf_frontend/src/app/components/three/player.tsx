import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";

export const Player = () => {
  const playerRef = useRef<Mesh>();
  const [, get] = useKeyboardControls();
  const positionVector = new Vector3(0, 0, 0);

  useFrame(() => {
    const { forward, back, left, right } = get();

    positionVector.set(
      Number(right) - Number(left),
      Number(forward) - Number(back),
      0,
    );
    positionVector.normalize().multiplyScalar(0.5);

    if (playerRef.current) {
      console.log(forward, back, left, right);
      playerRef.current.position.x += positionVector.x;
      playerRef.current.position.y += positionVector.y;
    }
  });
  return (
    <mesh ref={playerRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};
