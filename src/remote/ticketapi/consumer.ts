import crypto from "crypto"
import { EventEmitter } from "events"

import { validateResponse } from "../validations"

import { createTicketsQuery, fetchTicketsPage } from "./fetch"
import { IRemoteTicketsPage, IRemoteTicketsQuery } from "./interfaces"
import { prepareRemoteTickets } from "./transformers"

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
      this.emit("fetch.page.response", { page, query, response })
      validateResponse(response)
      return {
        page,
        data: prepareRemoteTickets(response.body as any[]),
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
}
