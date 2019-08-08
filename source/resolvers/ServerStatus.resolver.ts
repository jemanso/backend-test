import { Mutation, Query, Resolver } from "type-graphql"

import { ServerStatus, ServiceState, SyncingState } from "../entities/ServerStatus"

@Resolver(() => ServerStatus)
export class ServerStatusResolver {
  @Query(() => ServerStatus)
  public async getStatus(): Promise<ServerStatus> {
    // TODO: Return server status
    return new ServerStatus()
  }

  @Mutation(() => ServerStatus)
  public async initialize(): Promise<ServerStatus> {
    // TODO: Initiate cleaning and storing of ticket data into MongoDB
    const status = new ServerStatus()
    status.graphql = ServiceState.started
    status.ticketapi = SyncingState.syncing
    return status
  }
}
