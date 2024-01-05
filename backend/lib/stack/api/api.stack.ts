import { Stack, type StackProps } from 'aws-cdk-lib';
import { type Construct } from 'constructs';
import { type Table } from 'aws-cdk-lib/aws-dynamodb';
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { GetGameLambda } from './requests/get-game';
import { CreateGameLambda } from './requests/create-game/index';
import { AnswerGameLambda } from './requests/answer-game/index';

interface ApiStackProps extends StackProps {
  dbStore: Table
}

export class ApiStack extends Stack {
  constructor (scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const { dbStore } = props;

    const apiGateway = new RestApi(this, 'FootballStarsClash-RestApi', {
      deploy: true,
      deployOptions: {
        stageName: 'v1'
      }
    });

    const gamesResource = apiGateway.root.addResource('games', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: ['*'],
        disableCache: true
      }
    });

    gamesResource.addMethod(
      'POST',
      new LambdaIntegration(
        new CreateGameLambda(this, 'FootballStarsClash-RestApi-CreateGame-POST', {
          dbStore
        })
      )
    );

    const singleGameResource = gamesResource.addResource('{id}');

    singleGameResource.addMethod(
      'GET',
      new LambdaIntegration(
        new GetGameLambda(this, 'FootballStarsClash-RestApi-GetGame-GET', {
          dbStore
        })
      )
    );

    const answerResource = singleGameResource.addResource('answer');
    answerResource.addMethod(
      'POST',
      new LambdaIntegration(
        new AnswerGameLambda(this, 'FootballStarsClash-RestApi-AnswerGame-POST', {
          dbStore
        })
      )
    );
  }
}
