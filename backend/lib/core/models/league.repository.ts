import League from './league.model'
import { FOOTBALL_STARS_CLASH_DATA_TABLE } from '../utils/constants'
import type DatabaseService from '../services/database.service'

class LeagueRepository {
  constructor (public databaseService: DatabaseService) {
  }

  public async getLeague (id: string = 'premier-league'): Promise<League> {
    const leagueResponse = await this.databaseService
      .getConnection()
      .getItem({
        TableName: FOOTBALL_STARS_CLASH_DATA_TABLE,
        Key: {
          pk: {
            S: `${League.TYPE}#${id}`
          }
        }
      })

    return League.fromDynamoDb(leagueResponse.Item ?? {})
  }
}

export default LeagueRepository
