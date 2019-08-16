// import { Ticket, TicketModel } from "../entities/Ticket"
import { ITicket } from "../entities/tickets"
import { IRemoteTicket } from "../remote/ticketapi"

import { trimAllWhitespaces } from "./common"
import { createComputedGenres } from "./genres"
import { transformInventory, transformPrice } from "./numeric"
import { createComputedTitles } from "./titles"

export function ticketFromRemoteData(rawRemoteTicket: IRemoteTicket): ITicket {
  let remoteId = ""
  if (rawRemoteTicket._id && rawRemoteTicket._id.$oid) {
    remoteId = String(rawRemoteTicket._id.$oid)
  }

  const title = trimAllWhitespaces(rawRemoteTicket.title)
  return {
    remoteId,
    title,
    titles: createComputedTitles(title),
    price: transformPrice(rawRemoteTicket.price),
    genres: createComputedGenres(rawRemoteTicket.genre),
    inventory: transformInventory(rawRemoteTicket.inventory),
    imageUrl: String(rawRemoteTicket.imageUrl || ""),
    date: new Date(rawRemoteTicket.date),
  }
}
