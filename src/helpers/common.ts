import { IMovie, ITicket } from "../entities"

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

export const sortMovies = (a: IMovie, b: IMovie) => {
  if (a.title === b.title) {
    if (a.imdbID < b.imdbID) {
      return -1
    }
    if (a.imdbID > b.imdbID) {
      return 1
    }
  }
  if (a.title > b.title) {
    return 1
  }
  if (a.title < b.title) {
    return -1
  }
  return 0
}

export const trimAllWhitespaces = (text?: string): string => {
  if (!text) {
    return ""
  }
  return text.replace(/\s+/g, " ").trim()
}
