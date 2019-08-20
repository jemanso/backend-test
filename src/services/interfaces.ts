import { ServiceState, SyncingState } from "../helpers/states"

import { TicketsService } from "./tickets.service"

export interface IServicesLogger {
  info: (message: string) => void
  error: (message: string) => void
}

export interface IServicesIO {
  connect: (...args: any[]) => Promise<any>
  disconnect: (...args: any[]) => Promise<any>
  read: (...args: any[]) => Promise<any>
  write: (...args: any[]) => Promise<any>
  seek: (...args: any[]) => Promise<any[]>
}

export interface IServerStatus {
  tickets: ServiceState
  ticketapi: SyncingState
}

export interface IServices {
  tickets: TicketsService | null
}

export interface ICursorFilter {
  after: Date
  limit: number
}
