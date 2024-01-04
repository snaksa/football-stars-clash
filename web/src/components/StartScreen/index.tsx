import React from "react";
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
import { LeagueButton } from "@/components/StartScreen/LeagueButton";

interface StartScreenProps {
  onStart: (leagueId: string) => void;
}

const availableLeagues = [
  {
    id: "premier-league",
    src: "/premier-league-logo.png",
    alt: "Premier League",
  },
  {
    id: "la-liga",
    src: "/la-liga-logo.png",
    alt: "La Liga",
  },
];

export function StartScreen({ onStart }: StartScreenProps): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [selectedLeague, setSelectedLeague] =
    React.useState<string>("premier-league");
  return (
    <MainWrapper>
      <Stack
        alignItems="center"
        spacing={isMobile ? 1 : 3}
        height="100%"
        color="white"
        pt={isMobile ? 2 : 10}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <ExpandCircleDownIcon
            sx={{ fontSize: 40, color: "green", rotate: "180deg" }}
          />
          <Typography variant="h3" align="center">
            Football Stars Clash
          </Typography>
          <ExpandCircleDownIcon sx={{ fontSize: 40, color: "red" }} />
        </Stack>

        <Stack alignItems="center" p={1}>
          <Typography color="inherit" align="center">
            {"Do you think you know every player's market value?"}
          </Typography>
          <Typography color="inherit" align="center">
            {"Then show us what you've got."}
          </Typography>
        </Stack>

        <Stack
          alignItems="center"
          spacing={2}
          px={8}
          py={3}
          sx={{ border: "2px dashed white" }}
        >
          <Typography color="inherit" variant="h5">
            Choose a League
          </Typography>

          <Stack direction="row" alignItems="center" color="white" spacing={3}>
            {availableLeagues.map((league) => {
              return (
                <LeagueButton
                  key={league.id}
                  id={league.id}
                  src={league.src}
                  alt={league.alt}
                  selected={selectedLeague === league.id}
                  onSelect={setSelectedLeague}
                />
              );
            })}
          </Stack>
        </Stack>

        <Box pt={2} />

        <Button variant="contained" onClick={() => onStart(selectedLeague)}>
          START THE GAME
        </Button>
      </Stack>
    </MainWrapper>
  );
}
