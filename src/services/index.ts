import { ServiceState, SyncingState } from "../helpers/states"

import { IServerStatus, IServicesIO, IServicesLogger } from "./interfaces"
import { MoviesService } from "./movies.service"
import { TicketsService } from "./tickets.service"

class Services {
  public tickets: TicketsService | null
  public movies: MoviesService | null
  public getServerStatus(): IServerStatus {
    return {
      tickets: this.tickets ? this.tickets.serviceState : ServiceState.stopped,
      ticketapi: this.tickets ? this.tickets.syncingState : SyncingState.notInitialized,
      movies: this.movies ? this.movies.serviceState : ServiceState.stopped,
    }
  }
}

const services = new Services()

export * from "./interfaces"
export * from "./tickets.service"

export function createAllServices(
  ticketsDS: IServicesIO,
  moviesDS: IServicesIO,
  logger: IServicesLogger,
): void {
  services.tickets = new TicketsService(ticketsDS, logger)
  services.movies = new MoviesService(moviesDS, logger)
}

export default services
