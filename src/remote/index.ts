import { OMDB_API_KEY, OMDB_API_URL, TICKET_API_PAGELIMIT, TICKET_API_URL } from "../constants"

import { OMDBAPI } from "./omdbapi"
import { TicketAPI } from "./ticketapi"

export * from "./ticketapi"
export * from "./omdbapi"

export interface IConsumerLogger {
  info: (message: string) => void
  error: (message: string) => void
}

export function createTicketAPI(logger?: IConsumerLogger, limitPerPage?: number): TicketAPI {
  const consumer = new TicketAPI(TICKET_API_URL, limitPerPage || TICKET_API_PAGELIMIT)
  if (logger) {
    consumer.bindEventsToLogger(logger)
  }
  return consumer
}

export function createOMDBAPI(logger?: IConsumerLogger, apikey?: string): OMDBAPI {
  const consumer = new OMDBAPI(OMDB_API_URL, apikey || OMDB_API_KEY)
  if (logger) {
    consumer.bindEventsToLogger(logger)
  }
  return consumer
}
