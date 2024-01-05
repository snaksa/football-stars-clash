import ScraperService from '../../../../core/services/scraper.service'
import DatabaseService from '../../../../core/services/database.service'

const scrapeService = new ScraperService(DatabaseService.getInstance())

export const handler = async (): Promise<any> => {
  const scraped = await scrapeService.scrape()

  if (scraped) {
    console.log('Scraped successfully')
  } else {
    console.log('Scraping failed')
  }
}
