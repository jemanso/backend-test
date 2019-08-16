import { ApolloServer } from "apollo-server"
import { ObjectId } from "mongodb"
import path from "path"
import { buildSchema } from "type-graphql"

import { ProxyResolver } from "./resolvers/proxy.resolver"
import { TicketResolver } from "./resolvers/tickets.resolver"
import { ObjectIdScalar } from "./schemas/objectId.scalar"

export const createServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [ProxyResolver, TicketResolver],
    emitSchemaFile: path.resolve(__dirname, "schemas/schema.gql"),
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  })
  const server = new ApolloServer({ schema, context: {} })
  return server
}
