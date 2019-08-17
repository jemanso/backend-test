import { connect } from "mongoose"
import "reflect-metadata"

import { GQL_PORT, MONGODB_URI, SERVER_ID } from "./constants"
import { createServer } from "./graphql/server"
import { createLogger } from "./logger"

const logger = createLogger(SERVER_ID)

const main = async () => {
  try {
    await connect(
      MONGODB_URI,
      { useNewUrlParser: true, useCreateIndex: true },
    )
  } catch (mongoConnectError) {
    logger.error(mongoConnectError)
    process.exit(1)
  }
  const server = await createServer()

  try {
    const { url } = await server.listen(GQL_PORT)
    logger.info(`Tickets GraphQL API Server running at ${url}`)
  } catch (apolloError) {
    logger.error(apolloError)
    process.exit(1)
  }
}

main()
