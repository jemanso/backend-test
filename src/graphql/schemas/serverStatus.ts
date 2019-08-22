import { Field, ObjectType } from "type-graphql"

import { ServiceState, SyncingState } from "../../helpers/states"
import { IServerStatus } from "../../services"

@ObjectType({ description: "The server status" })
export class ServerStatus implements IServerStatus {
  @Field()
  public tickets: ServiceState = ServiceState.stopped

  @Field()
  public ticketapi: SyncingState = SyncingState.notInitialized

  @Field()
  public movies: ServiceState = ServiceState.stopped
}
