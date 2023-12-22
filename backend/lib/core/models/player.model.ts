import { type AttributeValue } from '@aws-sdk/client-dynamodb'

export default class Player {
  static readonly TYPE = 'PLAYER'

  public pk: string
  public parsedValue: number

  constructor (
    public id: string,
    public name: string = '',
    public position: string = '',
    public image: string = '',
    public value: string = '',
    public url: string = ''
  ) {
    this.pk = `${Player.TYPE}#${this.id}`
    this.parsedValue = this.parseValue(value)
  }

  public toDynamoDb (): Record<string, AttributeValue> {
    return {
      pk: {
        S: this.pk
      },
      record_type: {
        S: Player.TYPE
      },
      name: {
        S: this.name
      },
      position: {
        S: this.position
      },
      image: {
        S: this.image
      },
      value: {
        S: this.value
      },
      url: {
        S: this.url
      }
    }
  }

  static fromDynamoDb (data: Record<string, AttributeValue>): Player {
    const id = data?.pk?.S?.replace(`${Player.TYPE}#`, '') ?? ''
    const name = data?.name?.S ?? ''
    const position = data?.position?.S ?? ''
    const image = data?.image?.S ?? ''
    const value = data?.value?.S ?? ''
    const url = data?.url?.S ?? ''

    return new Player(id, name, position, image, value, url)
  }

  private parseValue (value: string): number {
    const end = value[value.length - 1]
    const multiplier = end === 'm' ? 1000000 : end === 'k' ? 1000 : 1
    return parseInt(value.replace('€', '')) * multiplier
  }

  public toDto = (includeValue: boolean = false): Record<string, any> => {
    return {
      id: this.id,
      name: this.name,
      position: this.position,
      image: this.image,
      ...(includeValue ? { value: this.value } : {})
    }
  }
}
