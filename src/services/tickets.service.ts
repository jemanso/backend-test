import { ITicket } from "../entities"
import {
  canChangeServiceState,
  canChangeSyncingState,
  ServiceState,
  SyncingState,
} from "../helpers/states"
import { ticketFromRemoteData } from "../helpers/tickets"
import { createTicketAPI, IRemoteTicket, IRemoteTicketsPage, TicketAPI } from "../remote"

import { IServicesLogger } from "."
import { ICursorFilter, IServicesIO } from "./interfaces"

export class TicketsService {
  public ticketapi: TicketAPI
  public serviceState: ServiceState = ServiceState.stopped
  public syncingState: SyncingState = SyncingState.notInitialized

  constructor(public ticketsDS: IServicesIO, public logger: IServicesLogger) {}

  public async start(): Promise<boolean> {
    this.setServiceState(ServiceState.starting)
    this.ticketapi = createTicketAPI(this.logger)
    await this.ticketsDS.connect()
    return this.setServiceState(ServiceState.started)
  }

  public async syncTickets(): Promise<boolean> {
    if (this.setSyncingState(SyncingState.syncing)) {
      let skip = 0
      const pages = 4
      do {
        const remoteTicketsPages = await this.ticketapi.fetchPages(pages, skip)
        this.importRemoteTicketsPages(remoteTicketsPages)
        if (this.hasMoreRemoteTicketsPages(remoteTicketsPages)) {
          skip += pages
        } else {
          skip = -1
        }
      } while (skip > 0)
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
      this.ticketsDS.write(ticketFromRemoteData(remoteTicket))
    })
  }

  public async getTicketByRemoteId(remoteId: string): Promise<ITicket | null> {
    const ticket = await this.ticketsDS.read(remoteId)
    return ticket
  }

  public async filterByCursor(cursorFilter: ICursorFilter): Promise<ITicket[]> {
    const tickets = await this.ticketsDS.seek(cursorFilter.after, cursorFilter.limit)
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

  private hasMoreRemoteTicketsPages(pages: IRemoteTicketsPage[]): boolean {
    let errorsCount = 0
    let hasEmptyPage = false
    for (const page of pages) {
      if (page.error) {
        this.logger.info(`tickets page ${page.page} got ERROR ${page.error}`)
        errorsCount++
      } else {
        if (!page.data || !page.data.length) {
          hasEmptyPage = true
        }
      }
    }
    if (hasEmptyPage || errorsCount === pages.length) {
      return false
    }
    return true
  }
}
