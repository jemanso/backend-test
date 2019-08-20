import got from "got"

import { IRemoteMovieQuery, IRemoteMoviesSearchQuery } from "./interfaces"
import { validatePageNumber } from "./validations"

export function createMovieQueryByImdbId(
  queryId: number,
  baseUrl: string,
  apikey: string,
  imdbId: string,
): IRemoteMovieQuery {
  return { queryId, baseUrl, apikey, imdbId }
}

export function createMoviesSearchQuery(
  queryId: number,
  baseUrl: string,
  apikey: string,
  search: string,
  page: number,
): IRemoteMoviesSearchQuery {
  validatePageNumber(page)
  return { queryId, baseUrl, apikey, search, page }
}

export async function fetchMovie(movieQuery: IRemoteMovieQuery): Promise<any> {
  const query = {
    apikey: movieQuery.apikey,
    plot: "full",
    i: movieQuery.imdbId,
    t: movieQuery.title,
  }
  const resp = await got(movieQuery.baseUrl, { query, json: true })
  return resp
}

export async function searchMovies(movieQuery: IRemoteMoviesSearchQuery): Promise<any> {
  const query = { apikey: movieQuery.apikey, s: movieQuery.search, page: movieQuery.page }
  const resp = await got(movieQuery.baseUrl, { query, json: true })
  return resp
}
