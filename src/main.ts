import { connect } from "mongoose"
import "reflect-metadata"

import { GQL_PORT, MONGODB_URI } from "./constants"
import { createServer } from "./graphql/server"

const main = async () => {
  try {
    await connect(
      MONGODB_URI,
      { useNewUrlParser: true, useCreateIndex: true },
    )
  } catch (mongoConnectError) {
    console.error(mongoConnectError)
    process.exit(1)
  }
  const server = await createServer()

  try {
    const { url } = await server.listen(GQL_PORT)
    console.log(`Tickets GraphQL API Server running at ${url}`)
  } catch (apolloError) {
    console.error(apolloError)
    process.exit(1)
  }
}

main()
