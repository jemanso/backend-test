import { IMovie, ITicket } from "../entities"
import { movieFromRemoteData } from "../helpers/movies"
import {
  canChangeServiceState,
  canChangeSyncingState,
  ServiceState,
  SyncingState,
} from "../helpers/states"
import {
  createOMDBAPI,
  IRemoteMovieFull,
  IRemoteMovieShort,
  IRemoteMoviesPage,
  IRemoteMoviesSearchResponse,
  OMDBAPI,
} from "../remote"

import { IServicesLogger } from "."
import { ICursorFilter, IServicesIO } from "./interfaces"

export class MoviesService {
  public omdbapi: OMDBAPI
  public serviceState: ServiceState = ServiceState.stopped
  public syncingState: SyncingState = SyncingState.notInitialized

  constructor(public moviesDS: IServicesIO, public logger: IServicesLogger) {}

  public async start(): Promise<boolean> {
    this.setServiceState(ServiceState.starting)
    this.omdbapi = createOMDBAPI(this.logger)
    await this.moviesDS.connect()
    return this.setServiceState(ServiceState.started)
  }

  public async syncMoviesForTickets(tickets: ITicket[]): Promise<boolean> {
    if (this.setSyncingState(SyncingState.syncing)) {
      for (const ticket of tickets) {
        for (const title of ticket.titles) {
          const remoteMoviesPage = await this.omdbapi.searchByTitle(title.keywords, 1)
          this.importRemoteMoviesPage(remoteMoviesPage)
        }
      }
      this.setSyncingState(SyncingState.syncDone)
    }
    return true
  }

  public importRemoteMoviesPage(remoteMoviesPage: IRemoteMoviesPage): void {
    if (remoteMoviesPage.data) {
      this.importRemoteMovies(remoteMoviesPage.data)
    }
  }

  public importRemoteMovies(remoteMovies: IRemoteMovieShort[]): void {
    remoteMovies.forEach(async remoteMovieShort => {
      const remoteMovieFull = await this.omdbapi.fetchByImdbId(remoteMovieShort.imdbID)
      this.moviesDS.write(movieFromRemoteData(remoteMovieFull))
    })
  }

  public async filterByCursor(cursorFilter: ICursorFilter): Promise<IMovie[]> {
    const movies = await this.moviesDS.seek(cursorFilter.after, cursorFilter.limit)
    return movies
  }

  private setServiceState(state: ServiceState): boolean {
    if (canChangeServiceState(this.serviceState, state)) {
      this.serviceState = state
      this.logger.info(`movies changed service state to ${state}`)
      return true
    }
    return false
  }

  private setSyncingState(state: SyncingState): boolean {
    if (canChangeSyncingState(this.syncingState, state)) {
      this.syncingState = state
      this.logger.info(`movies changed syncing state to ${state}`)
      return true
    }
    return false
  }
}
