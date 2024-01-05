import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import Player from './player.model';

export default class GameRound {
  constructor (
    public player1: Player,
    public player2: Player,
    public moreValuablePlayer: string
  ) {}

  public toDynamoDb (): Record<string, AttributeValue> {
    return {
      player1: {
        S: this.player1.id
      },
      player2: {
        S: this.player2.id
      },
      moreValuablePlayer: {
        S: this.moreValuablePlayer
      }
    };
  }

  static fromDynamoDb (data: Record<string, AttributeValue>): GameRound {
    const player1 = data?.player1?.S ?? '';
    const player2 = data?.player2?.S ?? '';
    const moreValuablePlayer = data?.moreValuablePlayer?.S ?? '';

    return new GameRound(new Player(player1), new Player(player2), moreValuablePlayer);
  }

  public toDto = (showValues = false): any => {
    return {
      player1: this.player1.toDto(true),
      player2: this.player2.toDto(showValues)
    };
  };

  public isAnswerCorrect (answer: string): boolean {
    return this.moreValuablePlayer === answer;
  }
}
