import React from "react";
import { Stack, CircularProgress } from "@mui/material";

export function Loader(): React.JSX.Element {
  return (
    <Stack
      height="100%"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: "2px solid white",
        borderRadius: "20px",
      }}
    >
      <CircularProgress size={100} color="primary" />
    </Stack>
  );
}
