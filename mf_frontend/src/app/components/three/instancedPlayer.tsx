import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";

export const InstancedPlayer = () => {
  const [positionBlue, setPositionBlue] = useState(new Vector3(0, 10, 0));
  const [scaleBlue, setScaleBlue] = useState(new Vector3(1, 1, 1));

  useFrame(() => {
    // Modify scale
    const deltaScale = 0.01;
    setScaleBlue((scale) => {
      return scale.clone().add(new Vector3(deltaScale, 0, 0));
    });

    // Adjust position accordingly
    setPositionBlue((pos) => {
      return pos.clone().add(new Vector3(deltaScale / 2, 0, 0));
    });
  });

  return (
    <Instances>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial />
      <Instance
        color="blue"
        position={positionBlue.toArray()}
        scale={scaleBlue.toArray()}
      />
      <Instance color="red" position={[0, 0, 0]} />
    </Instances>
  );
};
