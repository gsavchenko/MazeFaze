import { Instance, Instances } from "@react-three/drei";
import { Controls } from "../player.component";
import { usePlayerInstances } from "./playerMesh.hooks";

interface PlayerMeshProps {
  direction: Controls;
}

export const PlayerMesh: React.FC<PlayerMeshProps> = ({ direction }) => {
  const instances = usePlayerInstances(direction);

  return (
    <Instances>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial />
      {instances.map(({ position, scale }, index) => (
        <Instance
          key={index}
          color="blue"
          position={position.toArray()}
          scale={scale.toArray()}
        />
      ))}
    </Instances>
  );
};
