export interface IDatasourceLogger {
  info: (message: string) => void
  error: (message: string) => void
}

export interface IDatasourceIO {
  connect: (...args: any[]) => Promise<any>
  disconnect: (...args: any[]) => Promise<any>
  read: (...args: any[]) => Promise<any>
  write: (...args: any[]) => Promise<any>
  seek: (...args: any[]) => Promise<any[]>
}
