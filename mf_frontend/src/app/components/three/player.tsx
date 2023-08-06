import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3, BoxGeometry } from "three";

export const Player = () => {
  const playerRef = useRef<Mesh>();
  const playerGemoetryRef = useRef<BoxGeometry>();
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
      // playerRef.current.scale.x += 0.1;
      // playerRef.current.position.x += 0.1;
      // playerRef.current.position.y += positionVector.y;
      // playerRef.current.
      // playerRef.current.
    }

    // if (playerGemoetryRef.current) {
    //   playerGemoetryRef.current.
    // }
  });

  return (
    <mesh ref={playerRef} position={[0, 0, 0]}>
      <boxGeometry ref={playerGemoetryRef} args={[1, 1, 1]} />
      <meshBasicMaterial color="red" />
      {/* <instancedMesh /> */}
    </mesh>
    //   <Instances
    //   limit={1000} // Optional: max amount of items (for calculating buffer size)
    //   range={1000} // Optional: draw-range
    // >
    //   <boxGeometry />
    //   <meshStandardMaterial />
    //   <Instance
    //     color="red"
    //     scale={2}
    //     position={[1, 2, 3]}
    //     rotation={[Math.PI / 3, 0, 0]}
    //     onClick={onClick} ... />
    //   // As many as you want, make them conditional, mount/unmount them, lazy load them, etc ...
    // </Instances>
  );
};
