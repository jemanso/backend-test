import { TICKET_CACHE_FILE } from "../constants"
import { ITicket } from "../entities"
import {
  canChangeServiceState,
  canChangeSyncingState,
  ServiceState,
  SyncingState,
} from "../helpers/states"
import { ticketFromRemoteData } from "../helpers/tickets"
import { createDatasource } from "../models"
import {
  createOMDBAPI,
  createTicketAPI,
  IRemoteTicket,
  IRemoteTicketsPage,
  OMDBAPI,
  TicketAPI,
} from "../remote"

import { IServicesLogger } from "."
import { ICursorFilter, IServicesIO } from "./interfaces"

export class TicketsService {
  public omdbapi: OMDBAPI
  public ticketapi: TicketAPI
  public datasource: IServicesIO
  public serviceState: ServiceState = ServiceState.stopped
  public syncingState: SyncingState = SyncingState.notInitialized

  constructor(public logger: IServicesLogger) {}

  public async start(): Promise<boolean> {
    this.setServiceState(ServiceState.starting)
    this.omdbapi = createOMDBAPI(this.logger)
    this.ticketapi = createTicketAPI(this.logger)
    this.datasource = createDatasource("file", this.logger)
    await this.datasource.connect(TICKET_CACHE_FILE)
    return this.setServiceState(ServiceState.started)
  }

  public async syncTickets(): Promise<boolean> {
    if (this.setSyncingState(SyncingState.syncing)) {
      const remoteTicketsPages = await this.ticketapi.fetchPages(100, 0)
      this.importRemoteTicketsPages(remoteTicketsPages)
      await this.datasource.disconnect()
      await this.datasource.connect(TICKET_CACHE_FILE)
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
  }

  public importRemoteTickets(remoteTickets: IRemoteTicket[]): void {
    remoteTickets.forEach(remoteTicket => {
      this.datasource.write(ticketFromRemoteData(remoteTicket))
    })
  }

  public async filterByCursor(cursorFilter: ICursorFilter): Promise<ITicket[]> {
    const tickets = await this.datasource.seek(cursorFilter.after, cursorFilter.limit)
    return tickets
  }

  private setServiceState(state: ServiceState): boolean {
    if (canChangeServiceState(this.serviceState, state)) {
      this.serviceState = state
      this.logger.info(`tickets changed service state to ${state}`)
      return true
    }
    return false
  }

  private setSyncingState(state: SyncingState): boolean {
    if (canChangeSyncingState(this.syncingState, state)) {
      this.syncingState = state
      this.logger.info(`tickets changed syncing state to ${state}`)
      return true
    }
    return false
  }
}
