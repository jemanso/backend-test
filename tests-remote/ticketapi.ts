import repl from "repl"

import { TICKET_API_URL } from "../src/constants"
import { ITicket } from "../src/entities/tickets"
import { omdbSearchForTitleKeywords } from "../src/remote/omdbapi"
import { ITicketAPIResponse, TicketAPIReader } from "../src/remote/ticketapi"

let responses: ITicketAPIResponse[]

startReading(1, 2)
// startReading(3, 500)

async function startReading(pages: number = 2, limitPerPage: number = 5) {
  console.log(`\n Starting...`)
  responses = []
  const reader = new TicketAPIReader(TICKET_API_URL, limitPerPage)
  for (let page = 1; page <= pages; page++) {
    responses.push(await fetchTickets(reader, page))
  }
  console.log(` Done!\n`)
  showConsole()
}

async function fetchTickets(reader: TicketAPIReader, page: number): Promise<ITicketAPIResponse> {
  const reqId = `${reader.uid}.${String(page).padStart(4, "0")}`
  console.log(` ${reqId}: fetching page ${page} limited by ${reader.limit}`)
  const response = await reader.read(page)
  console.log(` ${reqId}: received ${(response.data || []).length} tickets`)
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
