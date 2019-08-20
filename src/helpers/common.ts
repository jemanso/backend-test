import { ITicket } from "../entities"

export const sortTickets = (a: ITicket, b: ITicket) => {
  if (a.date.getTime() === b.date.getTime()) {
    if (a.remoteId < b.remoteId) {
      return -1
    }
    if (a.remoteId > b.remoteId) {
      return 1
    }
  }
  return a.date.getTime() - b.date.getTime()
}

export const trimAllWhitespaces = (text?: string): string => {
  if (!text) {
    return ""
  }
  return text.replace(/\s+/g, " ").trim()
}
