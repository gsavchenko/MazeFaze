import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { PlayerMesh } from "./instancedMesh";
import { useCallback, useMemo, useState } from "react";

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

export const Player: React.FC = () => {
  const controls = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    ],
    [],
  );
  const [playerDirection, setPlayerDirection] = useState<Controls>(
    Controls.forward,
  );

  const handleKeyboardChange = useCallback((event: Controls) => {
    setPlayerDirection(event);
  }, []);

  return (
    <KeyboardControls
      map={controls}
      onChange={(event) => handleKeyboardChange(event as Controls)}
    >
      <PlayerMesh direction={playerDirection} />
    </KeyboardControls>
  );
};
