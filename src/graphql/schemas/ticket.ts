import { Field, Float, Int, ObjectType } from "type-graphql"

import { ITicket } from "../../entities"

import { Titles, TitleVariant } from "./titles"

@ObjectType()
export class Ticket implements ITicket {
  @Field()
  public remoteId: string

  @Field()
  public title: string

  @Field(() => [TitleVariant])
  public titles: Titles

  @Field(() => [String])
  public genres: string[]

  @Field(() => Float)
  public price: number | null

  @Field(() => Int)
  public inventory: number

  @Field()
  public imageUrl: string

  @Field()
  public date: Date
}
