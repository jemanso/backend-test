import { Max, Min } from "class-validator"
import { ArgsType, Field, Int } from "type-graphql"

@ArgsType()
export class GetPagesArgs {
  @Field(type => Int)
  @Min(1)
  @Max(50)
  public pages = 5

  @Field(type => Int, { defaultValue: 0 })
  @Min(0)
  public skip: number
}
