import got from "got"

import { IOMDBSearchResult } from "."

export function omdbapiURLWithApiKey(apikey: string = "PlzBanMe") {
  return `http://www.omdbapi.com/?apikey=${apikey}`
}

export async function omdbSearchForTitleKeywords(
  titleKeywords: string[],
  page: number,
): Promise<IOMDBSearchResult> {
  if (!titleKeywords.length) {
    return { movies: [], matchs: 0 }
  }
  const url = `${omdbapiURLWithApiKey()}&page=${page || "1"}&s=${titleKeywords.join("+")}`
  const resp = await got(url, { json: true })
  return {
    movies: resp.body.Search || [],
    matchs: +resp.body.totalResults || 0,
    result: resp.body.Response,
    error: resp.body.error || null,
  }
}
