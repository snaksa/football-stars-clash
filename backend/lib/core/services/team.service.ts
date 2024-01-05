import type Team from '../models/team.model';
import type TeamRepository from '../models/team.repository';

class TeamService {
  constructor (public teamRepository: TeamRepository) {}

  public async getTeam (id: string): Promise<Team> {
    return await this.teamRepository.getTeam(id);
  }
}

export default TeamService;
