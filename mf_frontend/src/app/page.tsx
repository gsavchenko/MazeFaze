"use client";

import { usePhoenixSocket } from "@/features/sockets";
import { Canvas } from "@react-three/fiber";
import styles from "./page.module.css";
import { Grid } from "./components/three/grid.component";
import { Player } from "@/features/player";

export default function Home() {
  usePhoenixSocket();

  return (
    <div className={styles.scene}>
      <Canvas
        shadows
        className={styles.canvas}
        camera={{
          position: [0, 0, 50],
        }}
      >
        <ambientLight color={"white"} intensity={0.3} />
        <Grid />
        {/* <OrbitControls makeDefault /> */}
        <axesHelper args={[5]} />
        <Player />
      </Canvas>
    </div>
  );
}
