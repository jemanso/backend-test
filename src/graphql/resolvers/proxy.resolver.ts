import { Query, Resolver } from "type-graphql"

import { TICKET_API_URL } from "../../constants"
import { ITicket } from "../../entities/tickets"
import { omdbSearchForTitleKeywords } from "../../remote/omdbapi"
import { ITicketAPIResponse, TicketAPIReader } from "../../remote/ticketapi"
import { ticketsSvc } from "../../services"

@Resolver()
export class ProxyResolver {
  @Query(() => String, { description: "Get Tickets direct from remote API calls" })
  public async readRemoteTickets(pages: number = 1): Promise<string> {
    // TODO: Return server status
    console.log(`\n Starting...`)
    const responses = []
    const reader = new TicketAPIReader(TICKET_API_URL, 100)
    for (let page = 1; page <= pages; page++) {
      responses.push(await fetchTickets(reader, page))
    }
    console.log(` Done!\n`)
    return JSON.stringify(responses)
  }
}

// TESTING PROPOSE
// MUST BE REALOCATED
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
