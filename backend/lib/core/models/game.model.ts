import GameRound from './game-round.model';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import Player from './player.model';

export enum GameStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export default class Game {
  static readonly TYPE = 'GAME';

  public pk: string;

  constructor (
    public id: string,
    public leagueId: string,
    public status: GameStatus,
    public score: number,
    public round: GameRound
  ) {
    this.pk = `${Game.TYPE}#${this.id}`;
  }

  public toDynamoDb (): Record<string, AttributeValue> {
    return {
      pk: {
        S: this.pk
      },
      record_type: {
        S: Game.TYPE
      },
      leagueId: {
        S: this.leagueId
      },
      status: {
        S: this.status
      },
      score: {
        N: this.score.toString()
      },
      round: {
        M: this.round.toDynamoDb()
      }
    };
  }

  static fromDynamoDb (data: Record<string, AttributeValue>): Game {
    const id = data?.pk?.S?.replace(`${Game.TYPE}#`, '') ?? '';
    const status = data?.status?.S ?? '';
    const leagueId = data?.leagueId?.S ?? '';
    const score = parseInt(data?.score?.N ?? '0');
    const round = ((data?.round?.M) != null) ? GameRound.fromDynamoDb(data?.round?.M ?? {}) : new GameRound(new Player(''), new Player(''), '');

    return new Game(id, leagueId, status as GameStatus, score, round);
  }

  public isActive (): boolean {
    return this.status === GameStatus.ACTIVE;
  }

  public toDto = (): Record<string, any> => {
    return {
      id: this.id,
      leagueId: this.leagueId,
      status: this.status,
      score: this.score,
      round: this.round.toDto(this.status === GameStatus.INACTIVE)
    };
  };
}
