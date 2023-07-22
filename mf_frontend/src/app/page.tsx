"use client";

import { usePhoenixSocket } from "@/features";
import { Canvas } from "@react-three/fiber";
import styles from "./page.module.css";
import { Floor } from "./components";

export default function Home() {
  usePhoenixSocket();

  return (
    <div className={styles.scene}>
      <Canvas
        shadows
        className={styles.canvas}
        camera={{
          position: [-6, 7, 7],
        }}
      >
        <ambientLight color={"white"} intensity={0.3} />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
}

// extend({ BoxBufferGeometry });
