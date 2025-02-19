import { ITicket } from "../entities"
import { trimAllWhitespaces } from "../helpers/common"
import { createComputedGenres } from "../helpers/genres"
import { transformInventory, transformPrice } from "../helpers/numeric"
import { createComputedTitles } from "../helpers/titles"
import { IRemoteTicket } from "../remote"

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
