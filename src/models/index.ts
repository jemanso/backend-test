import { TicketsFileIO } from "./filesystem/tickets.file"
import { IDatasourceIO, IDatasourceLogger } from "./interfaces"

export function createDatasource(type: string, logger: IDatasourceLogger): IDatasourceIO {
  if (type === "file") {
    const ds = new TicketsFileIO()
    return ds
  }
  // if (type === "mongo") {}
  return new TicketsFileIO()
}

export * from "./interfaces"
