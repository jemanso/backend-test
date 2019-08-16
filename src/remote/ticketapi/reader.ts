import crypto from "crypto"
import { EventEmitter } from "events"
import got from "got"

import { IRemoteTicket, ITicketAPIError, ITicketAPIResponse } from "."

export class TicketAPIReader extends EventEmitter {
  public readonly uid: string = `ticketapi.reader.${crypto.randomBytes(6).toString("hex")}`
  constructor(private baseUrl: string, public readonly limit: number = 100) {
    super()
  }

  public async read(page: number = 1): Promise<ITicketAPIResponse> {
    const query = {
      skip: (page - 1) * this.limit,
      limit: this.limit,
    }
    let resp
    this.emit("read.start", { reader: this, page })
    try {
      resp = await got(this.baseUrl, { query, json: true })
      this.emit("read.done", { reader: this, page })
    } catch (err) {
      const error: ITicketAPIError = {
        context: "http.read.remoteticket",
        message: err.message,
        stackError: err,
      }
      this.emit("read.error", { reader: this, page, error })
      return { page, error }
    }
    return {
      page,
      data: resp.body as IRemoteTicket[],
    }
  }
}

export default TicketAPIReader
