import { OMDB_API_KEY, OMDB_API_URL, TICKET_API_URL } from "../constants"

import { OMDBAPIReader } from "./omdbapi.reader"
import { TicketAPIReader } from "./ticketapi.reader"

export const createTicketAPIReader = (): TicketAPIReader => {
  return new TicketAPIReader(TICKET_API_URL)
}

export const createOMDBAPIReader = (): TicketAPIReader => {
  return new OMDBAPIReader(OMDB_API_URL, OMDB_API_KEY)
}
