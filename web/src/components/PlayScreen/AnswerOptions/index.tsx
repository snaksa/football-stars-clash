import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { Player } from "@/models";

interface AnswerOptionsProps {
  player1: Player;
  player2: Player;
  onAnswer: (playerId: string) => void;
  disabled: boolean;
}

export function AnswerOptions({
  player1,
  player2,
  onAnswer,
  disabled,
}: AnswerOptionsProps): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Stack
      alignItems="center"
      spacing={2}
      height={isMobile ? "200px" : "250px"}
      mt={isMobile ? 1 : 2}
    >
      <Box
        width={isMobile ? "90%" : "70%"}
        p={2}
        sx={{ backgroundColor: theme.palette.primary.dark, borderRadius: 4 }}
      >
        <Typography variant={isMobile ? "caption" : "body1"} align="center">
          Does <b>{player2.name.toUpperCase()}</b> have a{" "}
          <span style={{ color: theme.palette.green.dark, fontWeight: "bold" }}>
            HIGHER
          </span>{" "}
          or{" "}
          <span style={{ color: theme.palette.red.main, fontWeight: "bold" }}>
            LOWER
          </span>{" "}
          market value than <b>{player1.name.toUpperCase()}</b>?
        </Typography>
      </Box>

      <Button
        variant="contained"
        disabled={disabled}
        sx={{ backgroundColor: theme.palette.green.dark }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          width="200px"
          onClick={() => onAnswer(player2.id)}
        >
          <ExpandCircleDownIcon sx={{ rotate: "180deg" }} />
          HIGHER
          <ExpandCircleDownIcon sx={{ rotate: "180deg" }} />
        </Stack>
      </Button>
      <Button
        variant="contained"
        disabled={disabled}
        sx={{ backgroundColor: theme.palette.red.main }}
        onClick={() => onAnswer(player1.id)}
      >
        <Stack direction="row" justifyContent="space-between" width="200px">
          <ExpandCircleDownIcon />
          LOWER
          <ExpandCircleDownIcon />
        </Stack>
      </Button>
    </Stack>
  );
}
