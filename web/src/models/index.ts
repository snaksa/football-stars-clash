export interface Player {
  id: string;
  name: string;
  position: string;
  image: string;
  teamName: string;
  teamLogo: string;
  value?: string;
}

export interface Game {
  id: string;
  status: string;
  score: number;
  round: {
    player1: Player;
    player2: Player;
  };
}

export enum GameState {
  START = "start",
  PLAYING = "playing",
  GAME_OVER = "game-over",
}

export enum AnswerState {
  NEUTRAL = "NEUTRAL",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
}
