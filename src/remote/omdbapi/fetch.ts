import got from "got"

import { validatePageNumber } from "../validations"

import { IRemoteMoviesSearch } from "./interfaces"

export function createMoviesQuery(
  queryId: number,
  baseUrl: string,
  apikey: string,
  search: string,
  page: number,
): IRemoteMoviesSearch {
  validatePageNumber(page)
  return {
    queryId,
    baseUrl,
    apikey,
    search,
    page,
  }
}

export async function fetchMoviesForTicket(ticket: ITicket): Promise<any[]> {
  let page = 1
  const movies: any[] = []
  for (const title of ticket.titles) {
    const resp = await omdbSearchForTitleKeywords(title.keywords, page++, OMDB_API_KEY)
    title.movies = resp
    movies.push(resp)
  }
  return movies
}

export async function omdbSearchForTitleKeywords(
  titleKeywords: string[],
  page: number,
  apikey?: string,
): Promise<IOMDBSearchResult> {
  if (!titleKeywords.length) {
    return { movies: [], matchs: 0 }
  }
  const url = `${omdbapiURLWithApiKey(apikey)}&page=${page || "1"}&s=${titleKeywords.join("+")}`
  console.log(url)

  const resp = await got(url, { json: true })
  return {
    movies: resp.body.Search || [],
    matchs: +resp.body.totalResults || 0,
    result: resp.body.Response,
    error: resp.body.error || null,
  }
}
