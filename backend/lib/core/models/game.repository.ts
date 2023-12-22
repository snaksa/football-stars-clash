import { v4 as uuidv4 } from 'uuid'
import { FOOTBALL_STARS_CLASH_DATA_TABLE } from '../utils/constants'
import Game, { GameStatus } from './game.model'
import type Player from './player.model'
import GameRound from './game-round.model'
import type DatabaseService from '../services/database.service'

class GameRepository {
  constructor (public databaseService: DatabaseService) {}

  public async getGame (id: string): Promise<Game> {
    const gameResponse = await this.databaseService
      .getConnection()
      .getItem({
        TableName: FOOTBALL_STARS_CLASH_DATA_TABLE,
        Key: {
          pk: {
            S: `${Game.TYPE}#${id}`
          }
        }
      })

    return Game.fromDynamoDb(gameResponse.Item ?? {})
  }

  public async create (player1: Player, player2: Player): Promise<Game> {
    const game = new Game(
      uuidv4(),
      GameStatus.ACTIVE,
      0,
      new GameRound(
        player1,
        player2,
        player1.parsedValue > player2.parsedValue ? player1.id : player2.id
      )
    )
    const putItemInput = {
      TableName: FOOTBALL_STARS_CLASH_DATA_TABLE,
      Item: game.toDynamoDb()
    }

    await this.databaseService
      .getConnection()
      .putItem(putItemInput)

    return game
  }

  public async update (game: Game): Promise<Game> {
    const putItemInput = {
      TableName: FOOTBALL_STARS_CLASH_DATA_TABLE,
      Item: game.toDynamoDb()
    }

    await this.databaseService
      .getConnection()
      .putItem(putItemInput)

    return game
  }
}

export default GameRepository
