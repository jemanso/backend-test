import { IMovie, IRating } from "../entities"
import { IRemoteMovieFull, IRemoteRating } from "../remote/omdbapi/interfaces"

import { trimAllWhitespaces } from "./common"

export function movieFromRemoteData(rawRemoteMovie: IRemoteMovieFull): IMovie {
  return {
    imdbID: trimAllWhitespaces(rawRemoteMovie.imdbID || ""),
    title: trimAllWhitespaces(rawRemoteMovie.Title || ""),
    year: trimAllWhitespaces(rawRemoteMovie.Year || ""),
    rated: trimAllWhitespaces(rawRemoteMovie.Rated || ""),
    released: trimAllWhitespaces(rawRemoteMovie.Released || ""),
    runtime: trimAllWhitespaces(rawRemoteMovie.Runtime || ""),
    genre: trimAllWhitespaces(rawRemoteMovie.Genre || ""),
    director: trimAllWhitespaces(rawRemoteMovie.Director || ""),
    writer: trimAllWhitespaces(rawRemoteMovie.Writer || ""),
    actors: trimAllWhitespaces(rawRemoteMovie.Actors || ""),
    plot: (rawRemoteMovie.Plot || "").trim(),
    language: trimAllWhitespaces(rawRemoteMovie.Language || ""),
    country: trimAllWhitespaces(rawRemoteMovie.Country || ""),
    awards: trimAllWhitespaces(rawRemoteMovie.Awards || ""),
    poster: trimAllWhitespaces(rawRemoteMovie.Poster || ""),
    ratings: [],
    metascore: trimAllWhitespaces(rawRemoteMovie.Metascore || ""),
    imdbRating: trimAllWhitespaces(rawRemoteMovie.imdbRating || ""),
    imdbVotes: trimAllWhitespaces(rawRemoteMovie.imdbVotes || ""),
    type: trimAllWhitespaces(rawRemoteMovie.Type || ""),
    dvd: trimAllWhitespaces(rawRemoteMovie.DVD || ""),
    boxOffice: trimAllWhitespaces(rawRemoteMovie.BoxOffice || ""),
    production: trimAllWhitespaces(rawRemoteMovie.Production || ""),
    website: trimAllWhitespaces(rawRemoteMovie.Website || ""),
  }
}

export function ratingsFromRemoteMovie(rawRemoteMovie: IRemoteMovieFull): IRating[] {
  if (rawRemoteMovie.Ratings) {
    return rawRemoteMovie.Ratings.map((rawRating: IRemoteRating) => {
      return {
        source: trimAllWhitespaces(rawRating.Source || ""),
        value: trimAllWhitespaces(rawRating.Value || ""),
      }
    })
  }
  return []
}
