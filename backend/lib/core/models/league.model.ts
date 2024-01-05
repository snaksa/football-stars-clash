import type Team from './team.model';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export default class League {
  static readonly TYPE = 'LEAGUE';

  public pk: string;

  constructor (
    public id: string,
    public name: string,
    public url: string,
    public teamsIds: string[] = [],
    public teams: Team[] = []
  ) {
    this.pk = `${League.TYPE}#${this.id}`;
  }

  public toDynamoDb (): Record<string, AttributeValue> {
    return {
      pk: {
        S: this.pk
      },
      record_type: {
        S: League.TYPE
      },
      name: {
        S: this.name
      },
      url: {
        S: this.url
      },
      teamsIds: {
        SS: this.teamsIds
      }
    };
  }

  static fromDynamoDb (data: Record<string, AttributeValue>): League {
    const id = data?.pk?.S?.replace(`${League.TYPE}#`, '') ?? '';
    const name = data?.name?.S ?? '';
    const url = data?.url?.S ?? '';
    const teamIds = data?.teamsIds?.SS ?? [];

    return new League(id, name, url, teamIds);
  }

  public getRandomTeam (): string {
    const randomIndex = Math.floor(Math.random() * this.teamsIds.length);
    return this.teamsIds[randomIndex];
  }
}
