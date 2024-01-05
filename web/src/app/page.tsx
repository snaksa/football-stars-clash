"use client";
import React, { useState } from "react";
import { Box, Grid, styled } from "@mui/material";
import { StartScreen } from "@/components/StartScreen";
import { GameState } from "@/models";
import { PlayScreen } from "@/components/PlayScreen";

const GameField = styled(Box)(({ theme }) => ({
  width: 1200,
  height: 800,
  backgroundImage: "url(/bg.png)",
  backgroundSize: "cover",
  borderRadius: theme.shape.borderRadius * 5,

  [theme.breakpoints.down("lg")]: {
    width: "100vw",
    height: "100vh",
    backgroundPosition: "center",
    borderRadius: 0,
  },
}));

export default function Home(): React.JSX.Element {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [selectedLeague, setSelectedLeague] =
    useState<string>("premier-league");

  const onStartGame = async () => {
    setGameState(GameState.PLAYING);
  };

  const renderActiveScreen = () => {
    switch (gameState) {
      case GameState.START:
        return (
          <StartScreen
            onStart={onStartGame}
            selectedLeague={selectedLeague}
            onSelectedLeagueChange={setSelectedLeague}
          />
        );
      case GameState.PLAYING:
      case GameState.GAME_OVER:
        return (
          <PlayScreen
            gameState={gameState}
            selectedLeague={selectedLeague}
            onGameStateChange={setGameState}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignContent="center"
      sx={{ height: "100vh" }}
    >
      <Grid item>
        <GameField>{renderActiveScreen()}</GameField>
      </Grid>
    </Grid>
  );
}
