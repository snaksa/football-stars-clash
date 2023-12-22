import type LeagueRepository from '../models/league.repository'
import type League from '../models/league.model'

class LeagueService {
  constructor (public leagueRepository: LeagueRepository) {}

  public async getLeague (id: string): Promise<League> {
    return await this.leagueRepository.getLeague(id)
  }
}

export default LeagueService
