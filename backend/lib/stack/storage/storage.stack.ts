import { RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import {
  BillingMode,
  Table,
  AttributeType
} from 'aws-cdk-lib/aws-dynamodb'
import {
  FOOTBALL_STARS_CLASH_DATA_TABLE
} from '../../core/utils/constants'

export class StorageStack extends Stack {
  public dataTable: Table

  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.dataTable = new Table(this, FOOTBALL_STARS_CLASH_DATA_TABLE, {
      tableName: FOOTBALL_STARS_CLASH_DATA_TABLE,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      partitionKey: { name: 'pk', type: AttributeType.STRING }
      // sortKey: { name: "sk", type: AttributeType.STRING },
    })

    // this.dbStore.addGlobalSecondaryIndex({
    //   indexName: DB_STORE_CATEGORIES_GSI,
    //   partitionKey: { name: "record_type", type: AttributeType.STRING },
    //   sortKey: { name: "id", type: AttributeType.STRING },
    //   projectionType: ProjectionType.ALL,
    // });
  }
}
