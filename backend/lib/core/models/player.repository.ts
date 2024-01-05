import Player from './player.model';
import { FOOTBALL_STARS_CLASH_DATA_TABLE } from '../utils/constants';
import type DatabaseService from '../services/database.service';

class PlayerRepository {
  constructor (public databaseService: DatabaseService) {}

  public async getPlayer (id: string): Promise<Player> {
    const teamResponse = await this.databaseService
      .getConnection()
      .getItem({
        TableName: FOOTBALL_STARS_CLASH_DATA_TABLE,
        Key: {
          pk: {
            S: `${Player.TYPE}#${id}`
          }
        }
      });

    return Player.fromDynamoDb(teamResponse.Item ?? {});
  }
}

export default PlayerRepository;
