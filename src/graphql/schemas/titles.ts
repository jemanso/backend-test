import "reflect-metadata"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class TitleVariant {
  @Field()
  public title: string

  @Field(() => [String])
  public keywords: string[]

  @Field(() => [String])
  public ignored: string[] | null
}

export type Titles = TitleVariant[]

export default Titles
