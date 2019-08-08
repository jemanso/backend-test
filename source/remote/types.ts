export interface IComputedTitle {
  titleVariant: string
  keywords: string[]
  ignored: string[] | null
}

export interface IRemoteTicket {
  _id: {
    $oid: string
  }
  title: string | null
  genre?: string
  price: number
  inventory: number
  image?: string
  date: Date
}
