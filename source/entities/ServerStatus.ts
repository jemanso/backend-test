import { Field, Float, Int, ObjectType } from "type-graphql"

export enum ServiceState {
  stopped,
  starting,
  started,
}

export enum SyncingState {
  notInitialized,
  syncing,
  syncDone,
  syncError,
}

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
