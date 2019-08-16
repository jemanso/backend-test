export interface IRemoteTicketID {
  $oid: string
}

export interface IRemoteTicket {
  _id: IRemoteTicketID
  title: string
  genre: string
  price: number
  inventory: number
  imageUrl: string
  date: Date
}

export interface ITicketAPIError {
  context: string
  message: string
  stackError: Error
}

export interface ITicketAPIResponse {
  page: number
  data?: IRemoteTicket[]
  error?: ITicketAPIError
}

export * from "./reader"
