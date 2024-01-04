import React from "react";
import { Button, Stack } from "@mui/material";

interface GameOverOptionsProps {
  onPlayAgainClick: () => void;
  onExit: () => void;
}

export function GameOverOptions({
  onPlayAgainClick,
  onExit,
}: GameOverOptionsProps): React.JSX.Element {
  return (
    <Stack alignItems="center" spacing={2} height="250px" mt={2}>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#0ed50e" }}
        onClick={onPlayAgainClick}
      >
        <Stack direction="row" justifyContent="center" width="200px">
          PLAY AGAIN
        </Stack>
      </Button>
      <Button variant="contained" sx={{ backgroundColor: "red" }}>
        <Stack
          direction="row"
          justifyContent="center"
          width="200px"
          onClick={onExit}
        >
          CHANGE MODE
        </Stack>
      </Button>
    </Stack>
  );
}
