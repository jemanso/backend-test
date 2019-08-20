import { connect } from "mongoose"

import { IDatasourceIO } from ".."
import { ITicket } from "../../entities"

export class TicketsMongoIO implements IDatasourceIO {
  public mongoURI: string | null = null
  public memoryCache: ITicket[] = []

  public async connect(mongoURI: string): Promise<boolean> {
    try {
      this.mongoURI = mongoURI
      await connect(
        mongoURI,
        { useNewUrlParser: true, useCreateIndex: true },
      )
      return true
    } catch (mongoConnectError) {
      logger.error(mongoConnectError.message)
    }
  }
  public async disconnect(): Promise<boolean> {}
  public async read(remoteId: string): Promise<ITicket | null> {}
  public async write(ticket: ITicket): Promise<boolean> {}
  public async seek(after: Date, limit: number): Promise<ITicket[]> {}
}
