import repl from "repl"

import { SERVER_ID } from "../src/constants"
import { createLogger } from "../src/logger"
import { createTicketAPI } from "../src/remote"
import { IRemoteTicketsPage } from "../src/remote/ticketapi"
import { ticketFromRemoteData } from "../src/remote/ticketapi/transformers"

const logger = createLogger(SERVER_ID)

let responses: IRemoteTicketsPage[]

startReading(0, 10)

async function startReading(skip: number, limitOfPages: number = 5) {
  const consumer = createTicketAPI(logger, 10)
  responses = await consumer.fetchPages(limitOfPages, skip)
  showConsole()
}

// REPL CONSOLE
async function showConsole(expose?: any) {
  const context = repl.start("console > ").context
  // context.fetchMoviesForTicket = fetchMoviesForTicket
  context.responses = responses
  context.expose = expose
  if (responses[0] && responses[0].data) {
    const remoteTicket = responses[0].data[0]
    const ticket = ticketFromRemoteData(remoteTicket)
    // const movies = await fetchMoviesForTicket(ticket)
    // context.movies = movies
    context.ticket = ticket
    context.remoteTicket = remoteTicket
  }
}
