import crypto from "crypto"
import { EventEmitter } from "events"
import got from "got"

import { IOMDBAPIError, IOMDBAPIResponse, IRemoteMovie } from "."

export class OMDBAPIReader extends EventEmitter {
  public readonly uid: string = `omdbapi.reader.${crypto.randomBytes(6).toString("hex")}`
  constructor(private baseUrl: string, private limit: number, private apikey: string) {
    super()
  }

  public async read(page: number = 1): Promise<IOMDBAPIResponse> {
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
      const error: IOMDBAPIError = {
        context: "http.read.remotemovie",
        message: err.message,
        stackError: err,
      }
      this.emit("read.error", { reader: this, page, error })
      return { page, error }
    }
    return {
      page,
      data: resp.body as IRemoteMovie[],
    }
  }
}

export default OMDBAPIReader
