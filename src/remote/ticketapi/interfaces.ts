export interface IRemoteTicket {
  remoteId: string
  title?: string | null
  genre?: string | null
  price?: number | null
  inventory?: number | null
  image?: string | null
  date?: string | null
}

export interface IRemoteTicketsPage {
  page: number
  data?: IRemoteTicket[]
  error?: string
}

export interface IRemoteTicketsQuery {
  queryId: number
  baseUrl: string
  skip: number
  limit: number
}
