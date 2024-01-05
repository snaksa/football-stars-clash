import type Player from './player.model';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export default class Team {
  static readonly TYPE = 'TEAM';

  public pk: string;

  constructor (
    public id: string,
    public name: string,
    public url: string,
    public logo: string,
    public playersIds: string[] = [],
    public players: Player[] = []
  ) {
    this.pk = `${Team.TYPE}#${this.id}`;
  }

  public toDynamoDb (): Record<string, AttributeValue> {
    return {
      pk: {
        S: this.pk
      },
      record_type: {
        S: Team.TYPE
      },
      name: {
        S: this.name
      },
      logo: {
        S: this.logo
      },
      url: {
        S: this.url
      },
      playersIds: {
        SS: this.playersIds
      }
    };
  }

  static fromDynamoDb (data: Record<string, AttributeValue>): Team {
    const id = data?.pk?.S?.replace(`${Team.TYPE}#`, '') ?? '';
    const name = data?.name?.S ?? '';
    const logo = data?.logo?.S ?? '';
    const url = data?.url?.S ?? '';
    const playersIds = data?.playersIds?.SS ?? [];

    return new Team(id, name, url, logo, playersIds);
  }

  public getRandomPlayer (): string {
    const randomIndex = Math.floor(Math.random() * this.playersIds.length);
    return this.playersIds[randomIndex];
  }
}
