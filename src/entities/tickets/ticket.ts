import { ITitles } from "./titles"

export interface ITicket {
  remoteId: string
  title: string
  titles: ITitles
  price: number | null
  genres: string[]
  inventory: number
  imageUrl: string
  date: Date
}
