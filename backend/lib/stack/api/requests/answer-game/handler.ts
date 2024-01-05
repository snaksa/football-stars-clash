import GameServiceFactory from '../../../../core/utils/factory/game-service.factory';

export const handler = async (event: { pathParameters: { id: string }, body?: string }): Promise<any> => {
  const gameId: string = event.pathParameters?.id ?? '';

  const body = (event.body != null) ? JSON.parse(event.body) : {};
  const answer: string = body?.answer ?? '';

  const gameService = GameServiceFactory.createGameService();

  let game = await gameService.getGame(gameId);

  if (game.isActive()) {
    if (game.round.isAnswerCorrect(answer)) {
      game = await gameService.generateNextRound(game);
    } else {
      game = await gameService.endGame(game);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: {
        game: game.toDto()
      }
    }),
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE'
    }
  };
};
