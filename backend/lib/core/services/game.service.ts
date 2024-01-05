import { GameStatus } from '../models/game.model';
import type Game from '../models/game.model';
import type GameRepository from '../models/game.repository';
import type PlayerService from './player.service';
import GameRound from '../models/game-round.model';

class GameService {
  constructor (
    public gameRepository: GameRepository,
    public playerService: PlayerService
  ) {}

  public async getGame (id: string): Promise<Game> {
    const game = await this.gameRepository.getGame(id);
    game.round = await this.getGameRoundDetails(game);

    return game;
  }

  public async create (leagueId: string): Promise<Game> {
    const player1 = await this.playerService.getRandomPlayer(leagueId);
    let player2 = await this.playerService.getRandomPlayer(leagueId);
    while (player1.id === player2.id || player1.parsedValue === player2.parsedValue) {
      player2 = await this.playerService.getRandomPlayer(leagueId);
    }

    return await this.gameRepository.create(leagueId, player1, player2);
  }

  public async generateNextRound (game: Game): Promise<Game> {
    const player1 = await this.playerService.getPlayer(game.round.player2.id);
    let player2 = await this.playerService.getRandomPlayer(game.leagueId);
    while (player1.id === player2.id || player1.parsedValue === player2.parsedValue) {
      player2 = await this.playerService.getRandomPlayer(game.leagueId);
    }

    // update game round and score
    game.round = new GameRound(player1, player2, player1.parsedValue > player2.parsedValue ? player1.id : player2.id);
    game.score = game.score + 1;

    await this.gameRepository.update(game);

    return game;
  }

  public async endGame (game: Game): Promise<Game> {
    game.status = GameStatus.INACTIVE;
    await this.gameRepository.update(game);

    return game;
  }

  public async getGameRoundDetails (game: Game): Promise<GameRound> {
    const player1 = await this.playerService.getPlayer(game.round.player1.id);
    const player2 = await this.playerService.getPlayer(game.round.player2.id);

    return new GameRound(player1, player2, game.round.moreValuablePlayer);
  }
}

export default GameService;
