import DatabaseService from '../../services/database.service';
import PlayerService from '../../services/player.service';
import PlayerRepository from '../../models/player.repository';
import LeagueService from '../../services/league.service';
import LeagueRepository from '../../models/league.repository';
import TeamService from '../../services/team.service';
import TeamRepository from '../../models/team.repository';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class PlayerServiceFactory {
  static createPlayerService (): PlayerService {
    return new PlayerService(
      new PlayerRepository(DatabaseService.getInstance()),
      new LeagueService(new LeagueRepository(DatabaseService.getInstance())),
      new TeamService(new TeamRepository(DatabaseService.getInstance()))
    );
  }
}

export default PlayerServiceFactory;
