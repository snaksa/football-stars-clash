import React from "react";
import { Stack, CircularProgress } from "@mui/material";

export function Loader(): React.JSX.Element {
  return (
    <Stack height="100%" justifyContent="center" alignItems="center">
      <CircularProgress size={100} color="primary" />
    </Stack>
  );
}
