import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { Controls } from "../player.component";
import { useFrame } from "@react-three/fiber";

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
  });

  return instances;
};
