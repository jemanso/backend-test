import { Field, ObjectType } from "type-graphql"

import { IServerStatus, ServiceState, SyncingState } from "../../services"

@ObjectType({ description: "The server status" })
export class ServerStatus implements IServerStatus {
  @Field()
  public tickets: ServiceState = ServiceState.stopped

  @Field()
  public ticketapi: SyncingState = SyncingState.notInitialized
}
