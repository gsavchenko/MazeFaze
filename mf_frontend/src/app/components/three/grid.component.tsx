import { useFrame } from "@react-three/fiber";

export const Grid = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[100, 50, 5, 5]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
};
