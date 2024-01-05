import League from '../models/league.model'
import * as cheerio from 'cheerio'
import Team from '../models/team.model'
import Player from '../models/player.model'
import { type AttributeValue, type BatchWriteItemCommandInput } from '@aws-sdk/client-dynamodb'
import type DatabaseService from './database.service'
import { FOOTBALL_STARS_CLASH_DATA_TABLE } from '../utils/constants'

const leagues: League[] = [
  new League(
    'premier-league',
    'Premier League',
    'https://www.transfermarkt.com/premier-league/startseite/wettbewerb/GB1'
  ),
  new League(
    'primera-division',
    'La Liga',
    'https://www.transfermarkt.com/primera-division/startseite/wettbewerb/ES1'
  ),
  new League(
    'bundesliga',
    'Bundesliga',
    'https://www.transfermarkt.com/bundesliga/startseite/wettbewerb/L1'
  ),
  new League(
    'serie-a',
    'Serie A',
    'https://www.transfermarkt.com/serie-a/startseite/wettbewerb/IT1'
  )
]

export default class ScraperService {
  constructor (private readonly databaseService: DatabaseService) {
  }

  private readonly getLeagueTeams = async (league: League): Promise<Team[]> => {
    const teams: Team[] = []
    const html = await fetch(league.url)
      .then(async (response) => await response.text())
    const $ = cheerio.load(html)
    const tableBody = $('#yw1 table.items tbody')
    const rows = tableBody.find('tr')
    rows.each((_, element) => {
      const els = $(element).find('td')
      const first = els.first()
      const url = first.find('a').first().attr('href')
      // @ts-expect-error we know it is there
      const logo = first.find('a').find('img').first().attr('src').replace('tiny', 'head')

      const clubName = first.next()
      const name = clubName.find('a').first().attr('title')

      teams.push(
        new Team(
          league.id + '#' + url?.split('/')[1],
          name ?? '',
          url ?? '',
          logo ?? ''
        )
      )
    })

    return teams
  }

  private readonly getTeamPlayers = async (team: Team): Promise<Player[]> => {
    const players: Player[] = []
    const html = await fetch('https://transfermarkt.com' + team.url)
      .then(async (response) => await response.text())
    const $ = cheerio.load(html)

    const rows = $('#yw1 > table.items > tbody > tr')

    rows.each((_, playerRow) => {
      const els = $(playerRow).children('td')

      const detailsTable = els.first().next().find('table > tbody > tr')
      const image = detailsTable.first().find('img').first().attr('data-src')?.replace('medium', 'header')
      const position = detailsTable.first().next().find('td').text().trim()
      const nameAnchor = detailsTable.first().find('a').first()
      const name = nameAnchor.text().trim()
      const url = nameAnchor.attr('href')

      const value = els.first().next().next().next().next().find('a').first().text().trim()

      if (value.length === 0) {
        return
      }

      const urlParts = url?.split('/') ?? []

      players.push(
        new Player(
          team.id + '#' + urlParts[urlParts.length - 1],
          name,
          position,
          image ?? '',
          value,
          url ?? '',
          team.name,
          team.logo
        )
      )
    })

    return players
  }

  private readonly fetchData = async (): Promise<League[]> => {
    for (const league of leagues) {
      console.log('Find players of ' + league.name)
      league.teams = await this.getLeagueTeams(league)
      league.teamsIds = league.teams.map(t => t.id)
      const allPromises: Array<Promise<void>> = []
      for (const team of league.teams) {
        console.log('Find players of ' + team.name)
        const promise = this.getTeamPlayers(team).then((players) => {
          team.players = players
          team.playersIds = players.map(p => p.id)
        })

        allPromises.push(promise)
      }

      await Promise.all(allPromises)
    }

    return leagues
  }

  private readonly saveData = async (data: League[]): Promise<void> => {
    const recordsToSave = []
    for (const league of data) {
      recordsToSave.push(league.toDynamoDb())
      for (const team of league.teams) {
        recordsToSave.push(team.toDynamoDb())
        for (const player of team.players) {
          recordsToSave.push(player.toDynamoDb())
        }
      }
    }

    let batches = 0
    let requestItems: Array<Record<string, AttributeValue>> = []
    for (let i = 0; i < recordsToSave.length; i++) {
      if (requestItems.length === 20 || i === recordsToSave.length - 1) {
        const batchCommand: BatchWriteItemCommandInput = {
          RequestItems: {
            [FOOTBALL_STARS_CLASH_DATA_TABLE]: requestItems.map((item) => {
              return {
                PutRequest: {
                  Item: {
                    ...item,
                    expire_at: {
                      N: (Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30).toString() // expire record in 30 days
                    }
                  }
                }
              }
            })
          }
        }

        batches++
        console.log('Saving batch: ' + batches)
        await this.databaseService.getConnection().batchWriteItem(batchCommand)
        requestItems = []
      }

      requestItems.push(recordsToSave[i])
    }
  }

  public scrape = async (): Promise<boolean> => {
    try {
      const data = await this.fetchData()
      await this.saveData(data)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
