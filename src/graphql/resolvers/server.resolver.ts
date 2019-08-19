import { Mutation, Query, Resolver } from "type-graphql"

import services from "../../services"
import { ServerStatus } from "../schemas/serverStatus"

@Resolver()
export class ServerResolver {
  @Query(() => ServerStatus)
  public async serverStatus(): Promise<ServerStatus> {
    return services.getServerStatus()
  }

  @Mutation(() => ServerStatus)
  public async initialize(): Promise<ServerStatus> {
    // TODO: Initiate cleaning and storing of ticket data into MongoDB
    if (services.tickets) {
      services.tickets.syncTickets()
    }
    return services.getServerStatus()
  }
}
