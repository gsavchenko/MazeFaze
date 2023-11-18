import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { PlayerMesh } from "./instancedMesh";
import { useCallback, useMemo, useState } from "react";

export enum Controls {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
}

export const Player: React.FC = () => {
  const controls = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.up, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.down, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    ],
    [],
  );
  const [playerDirection, setPlayerDirection] = useState<Controls>(Controls.up);

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
