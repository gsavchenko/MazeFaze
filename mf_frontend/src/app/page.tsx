"use client";

import { usePhoenixSocket } from "@/features";
import { Canvas, useFrame } from "@react-three/fiber";
import styles from "./page.module.css";
import {
  KeyboardControls,
  KeyboardControlsEntry,
  OrbitControls,
} from "@react-three/drei";
import Floor from "./components/Floor";
import { Grid } from "./components/three/grid";
import { Player } from "./components/three/player";
import { useMemo } from "react";

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

export default function Home() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    ],
    [],
  );

  usePhoenixSocket();

  return (
    <div className={styles.scene}>
      <KeyboardControls map={map}>
        <Canvas
          shadows
          className={styles.canvas}
          camera={{
            position: [0, 0, 50],
            // near: 1,
          }}
        >
          <ambientLight color={"white"} intensity={0.3} />
          {/* <Floor position={[0, -1, 0]} /> */}
          <Grid />
          <OrbitControls makeDefault />
          <axesHelper args={[5]} />
          <Player />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

// extend({ BoxBufferGeometry });
