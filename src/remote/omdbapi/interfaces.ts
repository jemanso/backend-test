export interface IRating {
  Source: string
  Value: string
}

export interface IRemoteMovieShort {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface IRemoteMovieFull {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: IRating
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface IRemoteMovieQuery {
  queryId: number
  baseUrl: string
  apikey: string
  imdbId: string
}

export interface IRemoteMoviesSearch {
  queryId: number
  baseUrl: string
  apikey: string
  search: string
  page: number
}

export interface IRemoteMovieSearchResponse {
  Response: string
  totalResults?: string
  Search?: IRemoteMovieShort[]
  Error?: string
}
