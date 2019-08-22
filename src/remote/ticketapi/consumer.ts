import crypto from "crypto"
import { EventEmitter } from "events"

import { IConsumerLogger } from ".."

import { createTicketsQuery, fetchTicketsPage } from "./fetch"
import { prepareRemoteTickets } from "./helpers"
import { IRemoteTicketsPage } from "./interfaces"
import { validateResponse } from "./validations"

export class TicketAPI extends EventEmitter {
  public readonly uid: string = crypto.randomBytes(4).toString("hex")
  private fetchCounter: number = 0
  constructor(private baseUrl: string, public readonly limit: number = 100) {
    super()
  }

  public async fetchPage(page: number): Promise<IRemoteTicketsPage> {
    try {
      this.fetchCounter++
      const query = createTicketsQuery(this.fetchCounter, this.baseUrl, page, this.limit)
      this.emit("fetch.page.request", { page, query })
      // if (page === 3 || page === 11) {
      //   throw new Error(`fake error on page ${page}!`)
      // }
      const response = await fetchTicketsPage(query)
      validateResponse(response)
      response.tickets = prepareRemoteTickets(response.body as any[])
      this.emit("fetch.page.response", { page, query, response })
      return {
        page,
        data: response.tickets,
      }
    } catch (error) {
      const pageError = { page, error: error.message }
      this.emit("fetch.page.error", pageError)
      return pageError
    }
  }

  public async fetchPages(pages: number, skip: number = 0): Promise<IRemoteTicketsPage[]> {
    const promises: Promise<IRemoteTicketsPage>[] = []
    for (let page = skip + 1; page <= pages + skip; page++) {
      promises.push(this.fetchPage(page))
    }
    const responses = await Promise.all(promises)
    return responses
  }

  public bindEventsToLogger(logger: IConsumerLogger): void {
    this.on("fetch.page.request", ({ page, query }) => {
      const reqId = `${this.uid}.${query.queryId}`
      logger.info(`${reqId} fetching page ${page} limited by ${query.limit}`)
    })
    this.on("fetch.page.response", ({ page, query, response }) => {
      const reqId = `${this.uid}.${query.queryId}`
      logger.info(`${reqId} received page ${page} with ${(response.tickets || []).length} tickets`)
    })
    this.on("fetch.page.error", ({ page, error }) => {
      const reqId = `${this.uid}`
      logger.error(`${reqId} ERROR while fetching page ${page}: ${error.message}`)
    })
  }
}
