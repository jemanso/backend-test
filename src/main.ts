import path from "path"
import "reflect-metadata"

import { CACHE_FOLDER, GQL_PORT, SERVER_ID } from "./constants"
import { createServer } from "./graphql/server"
import { createLogger } from "./logger"
import { createMoviesDatasource, createTicketsDatasource } from "./models"
import services, { createAllServices } from "./services"

const main = async () => {
  const logger = createLogger(SERVER_ID)
  const ticketsDS = createTicketsDatasource(
    `file://${path.join(path.resolve(CACHE_FOLDER), "/tickets_cache.json")}`,
    logger,
  )
  const moviesDS = createMoviesDatasource(
    `file://${path.join(path.resolve(CACHE_FOLDER), "/movies_cache.json")}`,
    logger,
  )

  createAllServices(ticketsDS, moviesDS, logger)

  if (services.tickets) {
    services.tickets.start()
  }

  const gqlServer = await createServer()
  try {
    const { url } = await gqlServer.listen(GQL_PORT)
    logger.info(`Tickets GraphQL API Server running at ${url}`)
  } catch (apolloError) {
    logger.error(apolloError.message)
    process.exit(1)
  }
}

main()
