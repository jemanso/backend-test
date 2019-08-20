import { readFile, writeFile } from "fs"

import { IDatasourceIO } from ".."
import { ITicket } from "../../entities"
import { sortTickets } from "../../helpers/common"

export class TicketsFileIO implements IDatasourceIO {
  public filename: string | null = null
  public memoryCache: ITicket[] = []

  public async connect(filename: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.filename = filename
      readFile(filename, { encoding: "utf8" }, (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            this.memoryCache = []
            this.disconnect()
            resolve(true)
          } else {
            resolve(false)
          }
        } else {
          this.memoryCache = JSON.parse(data)
          this.memoryCache.forEach(t => (t.date = new Date(t.date)))
          resolve(true)
        }
      })
    })
  }

  public async disconnect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.filename) {
        return false
      }
      const data = JSON.stringify(this.memoryCache)
      writeFile(this.filename, data, { encoding: "utf8" }, err => {
        if (err) {
          reject(err)
        }
        this.memoryCache = []
        resolve(true)
      })
    })
  }

  public async read(remoteId: string): Promise<ITicket | null> {
    return new Promise(resolve => {
      for (const ticket of this.memoryCache) {
        if (ticket.remoteId === remoteId) {
          resolve(ticket)
        }
      }
      resolve(null)
    })
  }

  public async write(ticket: ITicket): Promise<boolean> {
    return new Promise(resolve => {
      const newCache = this.memoryCache.filter(
        ticketCache => !(ticketCache.remoteId === ticket.remoteId),
      )
      newCache.push(ticket)
      newCache.sort(sortTickets)
      this.memoryCache = newCache
      resolve(true)
    })
  }

  public async seek(after: Date, limit: number): Promise<ITicket[]> {
    return new Promise(resolve => {
      if (!this.memoryCache) {
        resolve([])
      }
      resolve(
        this.memoryCache.filter(ticket => ticket.date.getTime() > after.getTime()).slice(0, limit),
      )
    })
  }
}
