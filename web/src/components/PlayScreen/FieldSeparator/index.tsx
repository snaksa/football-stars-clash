import React from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

export function FieldSeparator(): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Stack
      display="flex"
      flexDirection={isMobile ? "row" : "column"}
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "absolute",
        width: isMobile ? "100%" : "10px",
        height: isMobile ? "10px" : "100%",
        top: isMobile ? "calc(50% - 5px)" : 0,
        bottom: 0,
        left: isMobile ? 0 : "calc(50% - 5px)",
        color: "white",
      }}
    >
      <Box
        flexGrow={1}
        sx={{
          width: "2px",
          height: isMobile ? "2px" : "200px",
          backgroundColor: "white",
        }}
      ></Box>

      <Box
        px={1}
        sx={{ backgroundColor: "white", borderRadius: 1, color: "#000" }}
      >
        <Typography>vs</Typography>
      </Box>
      <Box
        flexGrow={1}
        sx={{
          width: "2px",
          height: isMobile ? "2px" : "200px",
          backgroundColor: "white",
        }}
      ></Box>
    </Stack>
  );
}
