import GameServiceFactory from '../../../../core/utils/factory/game-service.factory'

export const handler = async (): Promise<any> => {
  const gameService = GameServiceFactory.createGameService()

  const game = await gameService.create()

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
