"use client";

import { usePhoenixSocket } from "@/features/sockets";
import { Canvas } from "@react-three/fiber";
import styles from "./page.module.css";
import { Grid } from "./components/three/grid.component";
import { Player } from "@/features/player";
import styled from "styled-components";
import { Indicator } from "./components";

const StyledScene = styled.div`
  width: 90vw; // 100% of the viewport width
  height: 90vh; // 100% of the viewport height
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IndicatorContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default function Home() {
  usePhoenixSocket();

  return (
    <>
      <IndicatorContainer>
        <Indicator color="red" label="connection" />
      </IndicatorContainer>
      <StyledScene>
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
      </StyledScene>
    </>
  );
}
