import { Field, ObjectType } from "type-graphql"

import { ServiceState, SyncingState } from "../../services"

@ObjectType({ description: "The server status" })
export class ServerStatus {
  @Field()
  public graphql: ServiceState = ServiceState.stopped

  @Field()
  public tickets: ServiceState = ServiceState.stopped

  @Field()
  public ticketapi: SyncingState = SyncingState.notInitialized

  @Field()
  public omdbapi: SyncingState = SyncingState.notInitialized
}
