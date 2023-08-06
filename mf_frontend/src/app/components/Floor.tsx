"use client";

import { ThreeElements, extend } from "@react-three/fiber";
import { Mesh, BoxGeometry, MeshPhysicalMaterial, Group } from "three";
import React from "react";

export function Floor(props: ThreeElements["mesh"]) {
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  );
}

// extend({ BoxGeometry });

export default Floor;
