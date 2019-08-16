export interface ITitleVariant {
  title: string
  keywords: string[]
  ignored: string[] | null
}

export type ITitles = ITitleVariant[]
export type IGenres = string[]

export interface ITicket {
  remoteId: string
  title: string
  titles: ITitles
  price: number | null
  genres: IGenres
  inventory: number
  imageUrl: string
  date: Date
}

export * from "./ticket.model"
