import repl from "repl"

import { SERVER_ID } from "../src/constants"
import { ticketFromRemoteData } from "../src/helpers/tickets"
import { createLogger } from "../src/logger"
import { createOMDBAPI, createTicketAPI } from "../src/remote"
import { IRemoteTicketsPage } from "../src/remote/ticketapi"

const logger = createLogger(SERVER_ID)

let responses: IRemoteTicketsPage[]

logger.info("starting console")

startReading(1)
// showMovieByImdbId("tt0054389")
// showMoviesForTitle("superman")

async function startReading(pages: number = 5, skip: number = 0) {
  const consumer = createTicketAPI(logger, 10)
  responses = await consumer.fetchPages(pages, skip)
  showConsole()
}

async function showMovieByImdbId(imdbId: string) {
  const consumer = createOMDBAPI(logger)
  const movie = await consumer.fetchByImdbId(imdbId)
  console.log(movie)
}

async function showMoviesForTitle(title: string) {
  const consumer = createOMDBAPI(logger)
  const movies = await consumer.searchByTitle(title)
  console.log(movies)
  console.log(movies.data)
}

// REPL CONSOLE
async function showConsole(expose?: any) {
  const context = repl.start("console > ").context
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
