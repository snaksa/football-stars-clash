import { DynamoDB } from '@aws-sdk/client-dynamodb'

class DatabaseService {
  private static instance: DatabaseService
  private readonly connection = new DynamoDB({ apiVersion: '2012-08-10' })

  public static getInstance (): DatabaseService {
    if (DatabaseService.instance === undefined) {
      DatabaseService.instance = new DatabaseService()
    }

    return DatabaseService.instance
  }

  public getConnection (): DynamoDB {
    return this.connection
  }
}

export default DatabaseService
