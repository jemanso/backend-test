import got from "got"

import { IAPIReader, IAPIReaderQuery, IAPIReaderResponse } from "./reader"

export class TicketAPIReader implements IAPIReader {
  public lastResponse = null
  constructor(public baseUrl: string) {}
  /**
   * name
   */
  public async readMore(): Promise<IAPIReaderResponse> {
    const query: IAPIReaderQuery = { skip: 0, limit: 10 }
    if (this.lastResponse) {
      const lastQuery = this.lastResponse.query
      query.skip = lastQuery.skip + lastQuery.limit
      query.limit = lastQuery.limit
    }

    const apiResp = await got(this.baseUrl, { query, json: true })
    const lastResp: IAPIReaderResponse = {
      url: apiResp.requestUrl,
      query,
      statusCode: apiResp.statusCode,
      statusMessage: apiResp.statusMessage,
      body: apiResp.body,
    }
    return lastResp
  }
}
