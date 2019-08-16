import { EventEmitter } from "events"

import { OMDB_API_KEY, OMDB_API_URL, TICKET_API_PAGELIMIT, TICKET_API_URL } from "../constants"
import { ITicket } from "../entities/tickets"
import { ticketFromRemoteData } from "../helpers/ticket"
import { IRemoteTicket, ITicketAPIResponse } from "../remote/ticketapi"
import { TicketAPIReader } from "../remote/ticketapi/reader"

import { ServiceState, SyncingState } from "."

export class TicketsService extends EventEmitter {
  constructor(
    public serviceState = ServiceState.stopped,
    public syncingState = SyncingState.notInitialized,
  ) {
    super()
  }

  public async start(): Promise<boolean> {
    if (this.serviceState !== ServiceState.stopped) {
      return false
    }
    this.serviceState = ServiceState.starting
    this.emit("tickets.starting")
    this.syncTickets()
    this.serviceState = ServiceState.started
    this.emit("tickets.started")
    return true
  }

  public async syncTickets(): Promise<boolean> {
    if (!this.setSyncingState(SyncingState.syncing)) {
      return false
    }
    const ticketReader = this.createTicketAPIReader()
    let page = 0
    do {
      page++
      try {
        const remoteTickets = await this.fetchRemoteTickets(ticketReader, page)
        const tickets = this.convertRemoteTickets(remoteTickets)
        this.setSyncingState(SyncingState.syncDone)
        return true
      } catch (error) {
        this.setSyncingState(SyncingState.syncError)
        return true
      }
    } while (this.syncingState === SyncingState.syncing)
  }

  public createTicketAPIReader(): TicketAPIReader {
    return new TicketAPIReader(TICKET_API_URL, TICKET_API_PAGELIMIT)
  }

  public async fetchRemoteTickets(
    reader: TicketAPIReader,
    page?: number,
  ): Promise<IRemoteTicket[]> {
    let resp: ITicketAPIResponse = { page: page || 1 }
    resp = await reader.read(page)
    if (resp.error) {
      throw resp.error
    }
    return resp.data || []
  }

  public convertRemoteTickets(remoteTickets: IRemoteTicket[]): ITicket[] {
    return remoteTickets.map(remoteTicket => ticketFromRemoteData(remoteTicket))
  }

  private setSyncingState(state: SyncingState): boolean {
    if (state === this.syncingState) {
      return false
    }
    this.syncingState = state
    switch (this.syncingState) {
      case SyncingState.syncing:
        this.emit("tickets.sync.started")
        break
      case SyncingState.syncError:
        this.emit("tickets.sync.error")
        break
      case SyncingState.syncDone:
        this.emit("tickets.sync.done")
    }
    return true
  }
}

export const ticketsSvc = new TicketsService()
