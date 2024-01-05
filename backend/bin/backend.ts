#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { StorageStack } from '../lib/stack/storage/storage.stack'
import { ApiStack } from '../lib/stack/api/api.stack'
import { ScraperStack } from '../lib/stack/scraper/scraper.stack'

const app = new cdk.App()

const storageStack = new StorageStack(app, 'FootballStarsClashStorageStack')

const apiStack = new ApiStack(app, 'FootballStarsClashApiStack', { dbStore: storageStack.dataTable })
apiStack.addDependency(storageStack)

const scraperStack = new ScraperStack(app, 'FootballStarsClashScraperStack', { dbStore: storageStack.dataTable })
scraperStack.addDependency(storageStack)
