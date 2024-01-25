import { useEffect, useRef, useState } from "react";
import { Box3, Vector3 } from "three";
import { Controls } from "../player.component";
import { useFrame, useThree } from "@react-three/fiber";

interface PlayerInstance {
  position: Vector3;
  scale: Vector3;
  direction: Controls;
}

const scaleSpeed = 0.1;

export const usePlayerInstances = (direction: Controls) => {
  const [instances, setInstances] = useState<PlayerInstance[]>([]);
  const latestDirection = useRef(direction);

  // This effect updates the latest direction
  useEffect(() => {
    latestDirection.current = direction;
  }, [direction]);

  useFrame(() => {
    setInstances((prevInstances) => {
      let newInstances = [...prevInstances];

      if (newInstances.length === 0) {
        // Create the first instance if the array is empty
        newInstances.push({
          position: new Vector3(),
          scale: new Vector3(1, 1, 1),
          direction: latestDirection.current,
        });
      } else {
        let headInstance = { ...newInstances[newInstances.length - 1] };

        // If the direction has changed, initialize a new segment
        if (headInstance.direction !== latestDirection.current) {
          // Calculate the offset based on the current scale of the head instance
          let offset = new Vector3();
          switch (headInstance.direction) {
            case Controls.up:
              offset.setY(headInstance.scale.y / 2);
              break;
            case Controls.down:
              offset.setY(-headInstance.scale.y / 2);
              break;
            case Controls.left:
              offset.setX(-headInstance.scale.x / 2);
              break;
            case Controls.right:
              offset.setX(headInstance.scale.x / 2);
              break;
          }

          // Position the new head instance at the end of the last one
          const newPosition = headInstance.position.clone().add(offset);
          newInstances.push({
            position: newPosition,
            scale: new Vector3(1, 1, 1),
            direction: latestDirection.current,
          });
        }

        // Update the scale and position of the head instance
        headInstance = { ...newInstances[newInstances.length - 1] }; // Re-fetch the head instance after a potential push
        switch (headInstance.direction) {
          case Controls.up:
            headInstance.scale.y += scaleSpeed;
            headInstance.position.y += scaleSpeed / 2;
            break;
          case Controls.down:
            headInstance.scale.y += scaleSpeed;
            headInstance.position.y -= scaleSpeed / 2;
            break;
          case Controls.left:
            headInstance.scale.x += scaleSpeed;
            headInstance.position.x -= scaleSpeed / 2;
            break;
          case Controls.right:
            headInstance.scale.x += scaleSpeed;
            headInstance.position.x += scaleSpeed / 2;
            break;
        }

        // Update the head instance in the array
        newInstances[newInstances.length - 1] = headInstance;
      }

      return newInstances;
    });

    for (let i = 0; i < instances.length; i++) {
      const box1 = new Box3().setFromCenterAndSize(
        instances[i].position,
        instances[i].scale,
      );

      for (let j = i + 1; j < instances.length; j++) {
        const box2 = new Box3().setFromCenterAndSize(
          instances[j].position,
          instances[j].scale,
        );

        if (box1.intersectsBox(box2)) {
          console.log(`Instance ${i} intersects with instance ${j}`);
          // Handle the intersection
        }
      }
    }
  });

  return instances;
};
