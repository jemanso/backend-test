import "reflect-metadata"

import { GQL_PORT, MONGODB_URI, SERVER_ID } from "./constants"
import { createServer } from "./graphql/server"
import { createLogger } from "./logger"
import services, { createAllServices } from "./services"

const main = async () => {
  const logger = createLogger(SERVER_ID)
  createAllServices(logger)

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
