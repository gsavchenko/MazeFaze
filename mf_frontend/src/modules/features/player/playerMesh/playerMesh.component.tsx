import { Instance, Instances } from "@react-three/drei";
import { Controls } from "../player.component";
import { usePlayerInstances } from "./playerMesh.hooks";
import { useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, Ref, RefObject, useEffect, useRef } from "react";
import { InstancedMesh, Object3D, Object3DEventMap } from "three";

interface PlayerMeshProps {
  direction: Controls;
}

export const PlayerMesh: React.FC<PlayerMeshProps> = ({ direction }) => {
  const instances = usePlayerInstances(direction);
  const { raycaster, scene } = useThree();
  const playerMeshRef: Ref<any> = useRef<any>(); // @TODO: note any bb

  useEffect(() => {}, []);
  useFrame(() => {
    const objectsToDetect = scene.children.filter((child) => {
      return child.uuid !== playerMeshRef?.current?.uuid;
    });
    const selfIntersect = raycaster.intersectObject(
      playerMeshRef.current as unknown as Object3D<Object3DEventMap>,
    );
    const intersect = raycaster.intersectObjects(objectsToDetect);
    if (selfIntersect) {
      console.log("intersect", selfIntersect);
    }
  });

  return (
    <Instances ref={playerMeshRef}>
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
