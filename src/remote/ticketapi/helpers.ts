import { IRemoteTicket } from "./interfaces"

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
