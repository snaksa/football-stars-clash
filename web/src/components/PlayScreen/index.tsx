import React, { useCallback, useEffect } from "react";
import MainWrapper from "@/components/MainWrapper";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { AnswerState, Game, GameState } from "@/models";
import { PlayerDetails } from "@/components/PlayScreen/PlayerDetails";
import { FieldSeparator } from "@/components/PlayScreen/FieldSeparator";
import { AnswerOptions } from "@/components/PlayScreen/AnswerOptions";
import { checkAnswer, startGame } from "@/utils/api";
import { GameOverOptions } from "@/components/PlayScreen/GameOverOptions";
import { Loader } from "@/components/PlayScreen/Loader";

interface PlayScreenProps {
  gameState: GameState;
  selectedLeague: string;
  onGameStateChange: (gameState: GameState) => void;
}

export function PlayScreen({
  gameState,
  selectedLeague,
  onGameStateChange,
}: PlayScreenProps): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [game, setGame] = React.useState<Game | null>(null);
  const [answerState, setAnswerState] = React.useState<AnswerState>(
    AnswerState.NEUTRAL,
  );
  const [checkingAnswer, setCheckingAnswer] = React.useState<boolean>(false);
  const [hideSecondPlayerValue, setHideSecondPlayerValue] =
    React.useState<boolean>(true);

  const startNewGame = useCallback(async () => {
    setGame(null);
    const newGame = await startGame(selectedLeague);

    if (newGame) {
      setAnswerState(AnswerState.NEUTRAL);
      setHideSecondPlayerValue(true);

      setGame(newGame);
      onGameStateChange(GameState.PLAYING);
    }
  }, [onGameStateChange, selectedLeague]);

  useEffect(() => {
    startNewGame();

    return () => {
      setGame(null);
    };
  }, [startNewGame]);

  const onAnswer = async (answer: string) => {
    if (!game || gameState !== GameState.PLAYING) {
      return;
    }

    setCheckingAnswer(true);
    const answerGameResponse = await checkAnswer(game.id, answer);
    setCheckingAnswer(false);

    if (!answerGameResponse) {
      return;
    }

    if (answerGameResponse.status === "INACTIVE") {
      onGameStateChange(GameState.GAME_OVER);
      setAnswerState(AnswerState.INCORRECT);
      setGame(answerGameResponse);
    } else {
      // show the player 2 market value
      setAnswerState(AnswerState.CORRECT);
      setGame({
        ...game,
        round: {
          ...game.round,
          player2: {
            ...game.round.player2,
            value: answerGameResponse.round.player1.value,
          },
        },
      });
    }

    setHideSecondPlayerValue(false);
    setTimeout(() => {
      // if the answer was correct start a new round, otherwise keep showing the player 2 market value
      if (answerGameResponse.status !== "INACTIVE") {
        setAnswerState(AnswerState.NEUTRAL);
        setGame(answerGameResponse);
        setHideSecondPlayerValue(true);
      }
    }, 3000);
  };

  if (!game) {
    return <Loader />;
  }

  return (
    <MainWrapper>
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        sx={{ height: "100%", color: "white" }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          minHeight={isMobile ? "50%" : "auto"}
          sx={{
            backgroundColor: theme.palette.background.paper,
            width: isMobile ? "100%" : "50%",
            borderRadius: isMobile ? 0 : "20px 0 0 20px",
          }}
        >
          <PlayerDetails player={game.round.player1} />
        </Stack>

        <Stack
          justifyContent="center"
          alignItems="center"
          minHeight={isMobile ? "50%" : "auto"}
          sx={{
            backgroundColor:
              answerState === AnswerState.NEUTRAL
                ? theme.palette.background.paper
                : answerState === AnswerState.CORRECT
                  ? theme.palette.green.light
                  : theme.palette.red.light,
            transition:
              answerState === AnswerState.NEUTRAL
                ? "none"
                : "background-color 1000ms linear",
            width: isMobile ? "100%" : "50%",
            borderRadius: isMobile ? 0 : "0 20px 20px 0",
          }}
        >
          <PlayerDetails
            player={game.round.player2}
            hideValue={hideSecondPlayerValue}
          >
            {gameState === GameState.GAME_OVER && (
              <GameOverOptions
                onExit={() => onGameStateChange(GameState.START)}
                onPlayAgainClick={startNewGame}
              />
            )}
          </PlayerDetails>

          {hideSecondPlayerValue && (
            <AnswerOptions
              player1={game.round.player1}
              player2={game.round.player2}
              onAnswer={onAnswer}
              disabled={checkingAnswer}
            />
          )}
        </Stack>
      </Stack>

      <FieldSeparator />
    </MainWrapper>
  );
}
