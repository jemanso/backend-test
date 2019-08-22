export interface IRating {
  source: string
  value: string
}

export interface IMovie {
  imdbID: string
  imdbRating: string
  imdbVotes: string
  title: string
  year: string
  rated: string
  released: string
  runtime: string
  genre: string
  director: string
  writer: string
  actors: string
  plot: string
  language: string
  country: string
  awards: string
  poster: string
  ratings: IRating[]
  metascore: string
  type: string
  dvd: string
  boxOffice: string
  production: string
  website: string
}
