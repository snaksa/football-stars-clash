import { FOOTBALL_STARS_CLASH_DATA_TABLE } from '../utils/constants';
import Team from './team.model';
import type DatabaseService from '../services/database.service';

class TeamRepository {
  constructor (public databaseService: DatabaseService) {}

  public async getTeam (id: string): Promise<Team> {
    const teamResponse = await this.databaseService
      .getConnection()
      .getItem({
        TableName: FOOTBALL_STARS_CLASH_DATA_TABLE,
        Key: {
          pk: {
            S: `${Team.TYPE}#${id}`
          }
        }
      });

    return Team.fromDynamoDb(teamResponse.Item ?? {});
  }
}

export default TeamRepository;
