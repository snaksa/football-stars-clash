import GameServiceFactory from '../../../../core/utils/factory/game-service.factory'

export const handler = async (event: { pathParameters: { id: string } }): Promise<any> => {
  const gameId = event.pathParameters?.id ?? ''

  const gameService = GameServiceFactory.createGameService()

  const game = await gameService.getGame(gameId)

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
  }
}
