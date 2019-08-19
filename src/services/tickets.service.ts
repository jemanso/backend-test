import { ITicket } from "../entities/tickets/ticket"
import { sortTickets } from "../helpers/common"
import { createTicketAPI, TicketAPI } from "../remote"
import { OMDBAPI } from "../remote/omdbapi"
import { IRemoteTicket, IRemoteTicketsPage } from "../remote/ticketapi"
import { ticketFromRemoteData } from "../remote/ticketapi/transformers"

import { IServicesLogger, ServiceState, SyncingState } from "."
import { ICursorFilter } from "./interfaces"

export class TicketsService {
  public omdbapi: OMDBAPI
  public ticketapi: TicketAPI
  public ticketsCache: ITicket[]
  public serviceState: ServiceState = ServiceState.stopped
  public syncingState: SyncingState = SyncingState.notInitialized

  constructor(public logger: IServicesLogger) {}

  public async start(): Promise<boolean> {
    this.ticketapi = createTicketAPI(this.logger)
    return this.setServiceState(ServiceState.started)
  }

  public async syncTickets(): Promise<boolean> {
    if (this.setSyncingState(SyncingState.syncing)) {
      this.ticketsCache = []
      const remoteTicketsPages = await this.ticketapi.fetchPages(100, 0)
      this.importRemoteTicketsPages(remoteTicketsPages)
      this.setSyncingState(SyncingState.syncDone)
    }
    return true
  }

  public importRemoteTicketsPages(remoteTicketsPages: IRemoteTicketsPage[]): void {
    remoteTicketsPages.forEach((responsePage: IRemoteTicketsPage) => {
      if (responsePage.data) {
        this.importRemoteTickets(responsePage.data)
      }
    })
    this.sortTicketsCache()
  }

  public importRemoteTickets(remoteTickets: IRemoteTicket[]): void {
    remoteTickets.forEach(remoteTicket => {
      this.ticketsCache.push(ticketFromRemoteData(remoteTicket))
    })
    this.sortTicketsCache()
  }

  public sortTicketsCache(): void {
    this.ticketsCache.sort(sortTickets)
  }

  public filterByCursor(cursorFilter: ICursorFilter): ITicket[] {
    if (!this.ticketsCache) {
      return []
    }
    return this.ticketsCache
      .filter(ticket => ticket.date.getTime() > cursorFilter.after.getTime())
      .slice(0, cursorFilter.limit)
  }

  private setServiceState(state: ServiceState): boolean {
    if (this.serviceState === state) {
      return false
    }
    if (this.serviceState === ServiceState.stopped && state !== ServiceState.started) {
      return false
    }
    this.serviceState = state
    this.logger.info(`tickets changed service state to ${state}`)
    return true
  }

  private setSyncingState(state: SyncingState): boolean {
    if (this.syncingState === state) {
      return false
    }
    this.syncingState = state
    this.logger.info(`tickets changed syncing state to ${state}`)
    return true
  }
}
