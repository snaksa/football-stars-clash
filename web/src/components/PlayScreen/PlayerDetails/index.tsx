import React, { PropsWithChildren } from "react";
import MainWrapper from "@/components/MainWrapper";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { Game, Player } from "@/models";
import Image from "next/image";

interface PlayerDetailsProps {
  player: Player;
  hideValue?: boolean;
}

export function PlayerDetails({
  children,
  player,
  hideValue = false,
}: PropsWithChildren<PlayerDetailsProps>): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Stack
      direction="column"
      color="white"
      alignItems="center"
      spacing={isMobile ? 1 : 2}
    >
      <Stack
        direction={isMobile ? "row" : "column"}
        color="white"
        alignItems="center"
        spacing={2}
      >
        <Image
          src={player.image}
          alt="Player image"
          width={100}
          height={130}
          style={{ border: "2px solid white" }}
        />
        <Stack
          spacing={isMobile ? 0 : 1}
          alignItems="start"
          width={isMobile ? "150px" : "auto"}
        >
          <Typography color="inherit" variant="h5">
            {player.name}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={player.teamLogo}
              alt="Player team logo"
              width="30"
              height="39"
            />
            <Typography color="inherit">{player.position}</Typography>
          </Stack>
        </Stack>
      </Stack>

      {!hideValue && (
        <Stack
          alignItems="center"
          justifyContent={isMobile ? "center" : "normal"}
          spacing={1}
          pt={isMobile ? 0 : 5}
          height={isMobile ? "200px" : "250px"}
        >
          <Box
            px={2}
            sx={{
              borderBottom: "2px solid white",
            }}
          >
            <Typography variant="h6">MARKET VALUE</Typography>
          </Box>
          <Typography variant="h4">
            <span style={{ fontSize: 24 }}>
              {player.value?.substring(0, 1)}
            </span>
            {player.value?.substring(1, player.value?.length)}
          </Typography>

          {children}
        </Stack>
      )}
    </Stack>
  );
}
