import { TICKET_API_PAGELIMIT, TICKET_API_URL } from "../constants"

import { TicketAPI } from "./ticketapi"

export * from "./ticketapi/consumer"
export * from "./omdbapi/interfaces"

interface IConsumerLogger {
  info: (message: string) => void
  error: (message: string) => void
}

export function createTicketAPI(logger?: IConsumerLogger, limitPerPage?: number): TicketAPI {
  const consumer = new TicketAPI(TICKET_API_URL, limitPerPage || TICKET_API_PAGELIMIT)
  if (logger) {
    consumer.on("fetch.page.request", ({ page, query }) => {
      const reqId = `${consumer.uid}.${query.queryId}`
      logger.info(`${reqId} fetching page ${page} limited by ${query.limit}`)
    })
    consumer.on("fetch.page.response", ({ page, query, response }) => {
      const reqId = `${consumer.uid}.${query.queryId}`
      logger.info(`${reqId} received page ${page} with ${(query.data || []).length} tickets`)
    })
    consumer.on("fetch.page.error", ({ page, error }) => {
      const reqId = `${consumer.uid}`
      logger.error(`${reqId} ERROR while fetching page ${page}: ${error.message}`)
    })
  }
  return consumer
}
