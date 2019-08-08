import { ObjectId } from "mongodb"
import { Field, Float, Int, ObjectType } from "type-graphql"
import {
  arrayProp as ArrayProperty,
  instanceMethod as InstanceMethod,
  InstanceType,
  ModelType,
  prop as Property,
  staticMethod as StaticMethod,
  Typegoose,
} from "typegoose"

@ObjectType()
export class Ticket extends Typegoose {
  @StaticMethod
  public static findById(this: ModelType<Ticket>, id: any) {
    return this.findOne({ _id: id })
  }

  @Field()
  public readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  public title: string

  @Field(() => [String])
  @ArrayProperty({ items: String, default: [] })
  public genre: string[]

  @Field(() => Float)
  @Property({ required: true })
  public price: number

  @Field(() => Int)
  @Property({ required: true })
  public inventory: number

  @Field()
  @Property({ required: true })
  public imageUrl: string

  @Field()
  @Property({ required: true })
  public date: Date

  @InstanceMethod
  public saveFields(this: InstanceType<Ticket>) {
    this.inventory = Math.max(this.inventory || 0, 0)
    return this.save()
  }
}

export const TicketModel = new Ticket().getModelForClass(Ticket)

export default TicketModel
