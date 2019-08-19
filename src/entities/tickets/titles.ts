export interface ITitleVariant {
  title: string
  keywords: string[]
  ignored: string[] | null
  movies?: any
}

export type ITitles = ITitleVariant[]
