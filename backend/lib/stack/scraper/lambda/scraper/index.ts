import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { type Construct } from 'constructs';
import * as path from 'path';
import { type Table } from 'aws-cdk-lib/aws-dynamodb';
import { FOOTBALL_STARS_CLASH_DATA_TABLE } from '../../../../core/utils/constants';
import { Duration } from 'aws-cdk-lib';

interface ScraperLambdaProps {
  dbStore: Table
}

export class ScraperLambda extends NodejsFunction {
  constructor (scope: Construct, id: string, props: ScraperLambdaProps) {
    super(scope, id, {
      entry: path.resolve(__dirname, './handler.ts'),
      timeout: Duration.minutes(5),
      memorySize: 1024,
      environment: {
        dbStore: FOOTBALL_STARS_CLASH_DATA_TABLE
      }
    });

    props.dbStore.grantReadWriteData(this);
  }
}
