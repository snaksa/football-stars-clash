import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { type Construct } from 'constructs'
import * as path from 'path'
import { type Table } from 'aws-cdk-lib/aws-dynamodb'
import { FOOTBALL_STARS_CLASH_DATA_TABLE } from '../../../../core/utils/constants'

interface AnswerGameLambdaProps {
  dbStore: Table
}

export class AnswerGameLambda extends NodejsFunction {
  constructor (scope: Construct, id: string, props: AnswerGameLambdaProps) {
    super(scope, id, {
      entry: path.resolve(__dirname, './handler.ts'),
      environment: {
        dbStore: FOOTBALL_STARS_CLASH_DATA_TABLE
      }
    })

    props.dbStore.grantReadWriteData(this)
  }
}
