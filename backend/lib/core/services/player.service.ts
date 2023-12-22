import type PlayerRepository from '../models/player.repository'
import type Player from '../models/player.model'
import type LeagueService from './league.service'
import type TeamService from './team.service'

class PlayerService {
  constructor (
    public playerRepository: PlayerRepository,
    public leagueService: LeagueService,
    public teamService: TeamService
  ) {}

  public async getPlayer (id: string): Promise<Player> {
    return await this.playerRepository.getPlayer(id)
  }

  public async getRandomPlayer (leagueId: string = 'premier-league'): Promise<Player> {
    const league = await this.leagueService.getLeague(leagueId)
    const teamId = league.getRandomTeam()
    const team = await this.teamService.getTeam(teamId)
    const playerId = team.getRandomPlayer()

    return await this.getPlayer(playerId)
  }
}

export default PlayerService
