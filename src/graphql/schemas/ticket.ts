import { ObjectId } from "mongodb"
import { Field, Float, Int, ObjectType } from "type-graphql"

import { Titles, TitleVariant } from "./titles"

@ObjectType()
export class Ticket {
  @Field()
  public readonly _id: ObjectId

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
