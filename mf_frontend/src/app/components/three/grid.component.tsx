import { Vector3 } from "three";

export const Grid = () => {
  // Define the properties for planeGeometry
  const geometryProps = {
    width: 100,
    height: 50,
    widthSegments: 5,
    heightSegments: 5,
  };

  const meshPosition = new Vector3(0, 0, 0);

  return (
    <mesh position={meshPosition}>
      <planeGeometry
        args={[
          geometryProps.width,
          geometryProps.height,
          geometryProps.widthSegments,
          geometryProps.heightSegments,
        ]}
      />
      <meshBasicMaterial color="green" />
    </mesh>
  );
};
