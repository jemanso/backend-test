export interface IAPIReader {
  baseUrl: string
  apikey: string | null
  lastQuery: IAPIReaderQuery | null
  readMore: () => Promise<IAPIReaderResponse>
}

export interface IAPIReaderQuery {
  skip: number
  limit: number
}

export interface IAPIReaderResponse {
  query: IAPIReaderQuery
  url: string
  statusCode: number
  statusMessage: string
  body: string
}
