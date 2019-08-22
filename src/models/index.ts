import { MoviesFileIO } from "./filesystem/movies.file"
import { TicketsFileIO } from "./filesystem/tickets.file"
import { IDatasourceIO, IDatasourceLogger } from "./interfaces"

export function createTicketsDatasource(uri: string, logger: IDatasourceLogger): IDatasourceIO {
  if (uri.match(/^file\:\/\//)) {
    return new TicketsFileIO(uri.replace("file://", ""), logger)
  }
  // if (type === "mongo") {
  // }
  throw new Error(`invalid datasource URI ${uri}`)
}

export function createMoviesDatasource(uri: string, logger: IDatasourceLogger): IDatasourceIO {
  if (uri.match(/^file\:\/\//)) {
    return new MoviesFileIO(uri.replace("file://", ""), logger)
  }
  throw new Error(`invalid datasource URI ${uri}`)
}

export * from "./interfaces"
