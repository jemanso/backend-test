import crypto from "crypto"
import { EventEmitter } from "events"

import { IConsumerLogger } from ".."

import {
  createMovieQueryByImdbId,
  createMoviesSearchQuery,
  fetchMovie,
  searchMovies,
} from "./fetch"
import { IRemoteMovieFull, IRemoteMovieShort, IRemoteMoviesPage } from "./interfaces"
import { validateMovieResponse } from "./validations"

export class OMDBAPI extends EventEmitter {
  public readonly uid: string = crypto.randomBytes(4).toString("hex")
  private fetchCounter: number = 0
  constructor(private baseUrl: string, public readonly apikey: string) {
    super()
  }

  public async fetchByImdbId(imdbId: string): Promise<IRemoteMovieFull> {
    try {
      this.fetchCounter++
      const query = createMovieQueryByImdbId(this.fetchCounter, this.baseUrl, this.apikey, imdbId)
      this.emit("fetch.movie.request", { imdbId, query })
      const response = await fetchMovie(query)
      this.emit("fetch.movie.response", { imdbId, query, response })
      validateMovieResponse(response)
      const remoteMovie = response.body
      return remoteMovie as IRemoteMovieFull
    } catch (error) {
      const pageError = { imdbId, error: error.message }
      this.emit("fetch.movie.error", pageError)
      throw new Error(`imdbId ${imdbId}: ${error.message}`)
    }
  }

  public async searchByTitle(titleKeywords: string, page: number = 1): Promise<IRemoteMoviesPage> {
    try {
      this.fetchCounter++
      const query = createMoviesSearchQuery(
        this.fetchCounter,
        this.baseUrl,
        this.apikey,
        titleKeywords,
        page,
      )
      this.emit("search.movies.request", { titleKeywords, query })
      const response = await searchMovies(query)
      this.emit("search.movies.response", { titleKeywords, query, response })
      validateMovieResponse(response)
      return {
        page,
        data: response.body as IRemoteMovieShort[],
      }
    } catch (error) {
      const pageError = { page, error: error.message }
      this.emit("search.movies.error", pageError)
      return pageError
    }
  }

  public bindEventsToLogger(logger: IConsumerLogger): void {
    this.on("fetch.movie.request", ({ imdbId, query }) => {
      const reqId = `${this.uid}.${query.queryId}`
      logger.info(`${reqId} fetching movie imdbId ${imdbId}`)
    })
    this.on("fetch.movie.response", ({ imdbId, query, response }) => {
      const reqId = `${this.uid}.${query.queryId}`
      logger.info(`${reqId} received movie imdbId ${imdbId}`)
    })
    this.on("fetch.movie.error", ({ imdbId, error }) => {
      const reqId = `${this.uid}`
      logger.error(`${reqId} ERROR while fetching imdbId ${imdbId}: ${error.message}`)
    })
  }
}
