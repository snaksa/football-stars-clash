import GameServiceFactory from '../../../../core/utils/factory/game-service.factory';

export const handler = async (event: { body?: string }): Promise<any> => {
  const body = (event.body != null) ? JSON.parse(event.body) : {};
  const leagueId: string = body?.leagueId ?? '';

  const gameService = GameServiceFactory.createGameService();

  const game = await gameService.create(leagueId);

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
