import { readFile, writeFile } from "fs"

import { IDatasourceIO } from ".."
import { ITicket } from "../../entities"
import { sortTickets } from "../../helpers/common"
import { IDatasourceLogger } from "../interfaces"

export class TicketsFileIO implements IDatasourceIO {
  public memoryCache: ITicket[] = []

  constructor(public filename: string | null, public logger: IDatasourceLogger) {}

  public async connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.logger.info(`connecting to file ${this.filename}`)
      if (!this.filename) {
        reject("filename not defined")
        return
      }
      readFile(this.filename, { encoding: "utf8" }, (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            this.memoryCache = []
            this.disconnect()
            resolve(true)
          } else {
            this.logger.info(`ERROR while connection to file ${this.filename}, ${err.message}`)
            resolve(false)
          }
        } else {
          this.memoryCache = JSON.parse(data)
          this.memoryCache.forEach(t => (t.date = new Date(t.date)))
          this.logger.info(`file loaded successfully ${this.filename}`)
          resolve(true)
        }
      })
    })
  }

  public async disconnect(): Promise<boolean> {
    return this.saveMemoryCache()
  }

  public async read(remoteId: string): Promise<ITicket | null> {
    return new Promise(resolve => {
      this.logger.info(`reading ticket, remoteId ${remoteId}`)
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
      this.logger.info(`writing ticket, remoteId ${ticket.remoteId}`)
      const newCache = this.memoryCache.filter(
        ticketCache => !(ticketCache.remoteId === ticket.remoteId),
      )
      newCache.push(ticket)
      newCache.sort(sortTickets)
      this.memoryCache = newCache
      this.saveMemoryCache()
      resolve(true)
    })
  }

  public async seek(after: Date, limit: number): Promise<ITicket[]> {
    return new Promise(resolve => {
      this.logger.info(`seeking tickets after ${after} limited by ${limit}`)
      if (!this.memoryCache) {
        resolve([])
      }
      resolve(
        this.memoryCache.filter(ticket => ticket.date.getTime() > after.getTime()).slice(0, limit),
      )
    })
  }

  private saveMemoryCache(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.filename) {
        reject(new Error("filename not defined"))
        return
      }
      const data = JSON.stringify(this.memoryCache)
      writeFile(this.filename, data, { encoding: "utf8" }, err => {
        if (err) {
          reject(err)
        }
        resolve(true)
      })
    })
  }
}
