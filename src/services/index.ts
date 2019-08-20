import { ServiceState, SyncingState } from "../helpers/states"

import { IServerStatus, IServicesLogger } from "./interfaces"
import { TicketsService } from "./tickets.service"

class Services {
  public tickets: TicketsService | null
  public getServerStatus(): IServerStatus {
    if (this.tickets) {
      return {
        tickets: this.tickets.serviceState,
        ticketapi: this.tickets.syncingState,
      }
    } else {
      return {
        tickets: ServiceState.stopped,
        ticketapi: SyncingState.notInitialized,
      }
    }
  }
}

const services = new Services()

export * from "./interfaces"
export * from "./tickets.service"

export function createAllServices(logger: IServicesLogger): void {
  services.tickets = new TicketsService(logger)
}

export default services
