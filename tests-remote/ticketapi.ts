import repl from "repl"

import { SERVER_ID, TICKET_API_URL } from "../src/constants"
import { ITicket } from "../src/entities/tickets"
import { createLogger } from "../src/logger"
import { omdbSearchForTitleKeywords } from "../src/remote/omdbapi"
import { ITicketAPIResponse, TicketAPIReader } from "../src/remote/ticketapi"

let responses: ITicketAPIResponse[]
const logger = createLogger(SERVER_ID)

startReading(10, 20)
// startReading(3, 500)

async function startReading(pages: number = 2, limitPerPage: number = 5) {
  logger.info("reading.started")
  responses = []
  const reader = new TicketAPIReader(TICKET_API_URL, limitPerPage)
  for (let page = 1; page <= pages; page++) {
    try {
      responses.push(await fetchTickets(reader, page))
    } catch (error) {
      logger.info(`ERROR ${error.message}`)
    }
  }
  logger.info("reading.done")
  showConsole()
}

async function fetchTickets(reader: TicketAPIReader, page: number): Promise<ITicketAPIResponse> {
  const reqId = `${reader.uid}.${String(page).padStart(4, "0")}`
  logger.info(`${reqId}: fetching page ${page} limited by ${reader.limit}`)
  const response = await reader.read(page)
  logger.info(`${reqId}: received ${(response.data || []).length} tickets`)
  return response
}

async function fetchMoviesForTicket(ticket: ITicket): Promise<any[]> {
  let page = 1
  const movies: any[] = []
  for (const title of ticket.titles) {
    const resp = await omdbSearchForTitleKeywords(title.keywords, page++)
    movies.push(resp)
  }
  return movies
}

// REPL CONSOLE
function showConsole() {
  const context = repl.start("console > ").context
  context.fetchMoviesForTicket = fetchMoviesForTicket
  context.responses = responses
}
