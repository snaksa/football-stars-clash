import { Stack, type StackProps } from 'aws-cdk-lib';
import { type Construct } from 'constructs';
import {
  type Table
} from 'aws-cdk-lib/aws-dynamodb';
import { ScraperLambda } from './lambda/scraper';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';

interface ScraperStackProps extends StackProps {
  dbStore: Table
}

export class ScraperStack extends Stack {
  constructor (scope: Construct, id: string, props: ScraperStackProps) {
    super(scope, id, props);

    const { dbStore } = props;

    const scraperFunc = new ScraperLambda(this, 'ScraperLambdaProps', {
      dbStore
    });

    // eslint-disable-next-line no-new
    new Rule(this, 'FootballStarsClash-ScheduledExecutionRule', {
      description: 'Schedule a Lambda that scrapes the market value of football players',
      schedule: Schedule.cron({
        minute: '0',
        hour: '13',
        day: '*',
        month: '*',
        year: '*'
      }),
      targets: [new LambdaFunction(scraperFunc)]
    });
  }
}
