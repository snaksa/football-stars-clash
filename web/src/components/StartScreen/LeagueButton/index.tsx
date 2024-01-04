import React from "react";
import Image from "next/image";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

interface LeagueButtonProps {
  id: string;
  src: string;
  alt: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function LeagueButton({
  id,
  src,
  alt,
  selected,
  onSelect,
}: LeagueButtonProps): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Stack alignItems="center">
      <Box
        sx={{
          backgroundColor: "#5089bf",
          width: "100%",
          padding: 1,
          border: `5px solid ${selected ? "#fff" : "#0f4275"}`,
          borderRadius: 5,
          cursor: "pointer",
        }}
        onClick={() => onSelect(id)}
      >
        <Image
          src={src}
          alt={alt}
          width={isMobile ? 40 : 60}
          height={isMobile ? 40 : 60}
          style={{ filter: "grayscale(100%) contrast(1000%) invert(100%)" }}
        />
      </Box>
    </Stack>
  );
}
