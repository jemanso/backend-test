export interface IRemoteMovie {
  title: string
  genre: string
  price: number
  inventory: number
  imageUrl: string
  date: Date
}

export interface IOMDBAPIError {
  context: string
  message: string
  stackError: Error
}

export interface IOMDBAPIResponse {
  page: number
  data?: IRemoteMovie[]
  error?: IOMDBAPIError
}

export interface IOMDBSearchResult {
  movies: any[]
  matchs: number
  result?: any
  error?: string | null
}

export * from "./reader"
export * from "./helpers"
