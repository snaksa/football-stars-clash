import React from 'react';
import MainWrapper from '@/components/MainWrapper';
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { LeagueButton } from '@/components/StartScreen/LeagueButton';

interface StartScreenProps {
  selectedLeague: string;
  onSelectedLeagueChange: (leagueId: string) => void;
  onStart: () => void;
}

const availableLeagues = [
  {
    id: 'premier-league',
    src: '/premier-league-logo.png',
    alt: 'Premier League',
    inverted: true,
  },
  {
    id: 'primera-division',
    src: '/la-liga-logo.png',
    alt: 'La Liga',
    inverted: true,
  },
  {
    id: 'bundesliga',
    src: '/bundesliga-logo.png',
    alt: 'Bundesliga',
    inverted: true,
  },
  {
    id: 'serie-a',
    src: '/serie-a-logo.png',
    alt: 'Serie A',
    inverted: false,
  },
];

export function StartScreen({
  selectedLeague,
  onSelectedLeagueChange,
  onStart,
}: StartScreenProps): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <MainWrapper>
      <Stack
        alignItems="center"
        spacing={isMobile ? 1 : 3}
        height="100%"
        pt={isMobile ? 2 : 10}
      >
        <Stack
          direction={isMobile ? 'column' : 'row'}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <ExpandCircleDownIcon
            sx={{
              fontSize: 40,
              color: theme.palette.green?.main,
              rotate: '180deg',
            }}
          />
          <Typography
            variant="h3"
            align="center"
            sx={{ fontFamily: "'Playfair Display', serif" }}
          >
            FOOTBALL STARS CLASH
          </Typography>
          <ExpandCircleDownIcon
            sx={{ fontSize: 40, color: theme.palette.red.main }}
          />
        </Stack>

        <Stack alignItems="center" p={1}>
          <Typography align="center">
            {"Do you think you know every player's market value?"}
          </Typography>
          <Typography align="center">
            {"Then show us what you've got."}
          </Typography>
        </Stack>

        <Stack
          alignItems="center"
          spacing={2}
          px={8}
          py={3}
          sx={{ border: '2px dashed white' }}
        >
          <Typography variant="h5">Choose a League</Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            maxWidth={isMobile ? 200 : 'auto'}
            flexWrap="wrap"
          >
            {availableLeagues.map((league, index) => {
              return (
                <LeagueButton
                  key={league.id}
                  id={league.id}
                  src={league.src}
                  alt={league.alt}
                  selected={selectedLeague === league.id}
                  onSelect={onSelectedLeagueChange}
                  inverted={league.inverted}
                />
              );
            })}
          </Stack>
        </Stack>

        <Box pt={2} />

        <Button variant="contained" onClick={onStart}>
          START THE GAME
        </Button>
      </Stack>
    </MainWrapper>
  );
}
