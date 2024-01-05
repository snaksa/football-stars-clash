import GameService from '../../services/game.service';
import GameRepository from '../../models/game.repository';
import DatabaseService from '../../services/database.service';
import PlayerServiceFactory from './player-service.factory';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class GameServiceFactory {
  static createGameService (): GameService {
    return new GameService(
      new GameRepository(DatabaseService.getInstance()),
      PlayerServiceFactory.createPlayerService()
    );
  }
}

export default GameServiceFactory;
