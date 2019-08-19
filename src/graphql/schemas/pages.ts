import { Field, Int, ObjectType } from "type-graphql"

import { IPageResponse } from "../../remote/ticketapi"

import { RemoteTicket } from "./remoteticket"

@ObjectType()
export class PageResponse implements IPageResponse {
  @Field(() => Int)
  public page: number

  @Field(() => [RemoteTicket], { nullable: "itemsAndList" })
  public data?: RemoteTicket[]

  @Field({ nullable: true })
  public error?: string
}
