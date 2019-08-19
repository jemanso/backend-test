import { TicketsService } from "./tickets.service"

export enum ServiceState {
  stopped = "stopped",
  starting = "starting",
  started = "started",
}

export enum SyncingState {
  notInitialized = "notInitialized",
  syncing = "syncing",
  syncDone = "syncDone",
  syncError = "syncError",
}

export interface IServicesLogger {
  info: (message: string) => void
  error: (message: string) => void
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
