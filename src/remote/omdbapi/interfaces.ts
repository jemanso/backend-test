export interface IRemoteRating {
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
  Ratings: IRemoteRating[]
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
  imdbId?: string
  title?: string
}

export interface IRemoteMoviesSearchQuery {
  queryId: number
  baseUrl: string
  apikey: string
  search: string
  year?: string
  page: number
}

export interface IRemoteMoviesSearchResponse {
  Response: string
  totalResults?: string
  Search?: IRemoteMovieShort[]
  Error?: string
}

export interface IRemoteMoviesPage {
  page: number
  data?: IRemoteMovieShort[]
  error?: string
}
