import { Game } from "@/models";

export const startGame = async (leagueId: string): Promise<Game | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ leagueId }),
  }).then((response) => response.json());

  return response?.data?.game;
};

export const checkAnswer = async (
  gameId: string,
  answer: string,
): Promise<Game | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/games/${gameId}/answer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    },
  ).then((response) => response.json());

  return response?.data?.game;
};
