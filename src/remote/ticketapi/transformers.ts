import { ITicket } from "../../entities/tickets/ticket"
import { trimAllWhitespaces } from "../../helpers/common"
import { createComputedGenres } from "../../helpers/genres"
import { transformInventory, transformPrice } from "../../helpers/numeric"
import { createComputedTitles } from "../../helpers/titles"

import { IRemoteTicket } from "./interfaces"

export function ticketFromRemoteData(rawRemoteTicket: IRemoteTicket): ITicket {
  const title = trimAllWhitespaces(rawRemoteTicket.title || "")
  return {
    remoteId: rawRemoteTicket.remoteId,
    title: title || "",
    titles: createComputedTitles(title),
    price: transformPrice(rawRemoteTicket.price),
    genres: createComputedGenres(rawRemoteTicket.genre),
    inventory: transformInventory(rawRemoteTicket.inventory),
    imageUrl: rawRemoteTicket.image || "",
    date: new Date(rawRemoteTicket.date || 0),
  }
}

export function prepareRemoteTickets(rawRemoteTickets: any[]): IRemoteTicket[] {
  return rawRemoteTickets.map(remoteTicket => {
    remoteTicket.remoteId = getRemoteID(remoteTicket)
    delete remoteTicket._id
    return remoteTicket
  })
}

export function getRemoteID(rawRemoteTicket: any) {
  return rawRemoteTicket._id && rawRemoteTicket._id.$oid ? String(rawRemoteTicket._id.$oid) : ""
}
