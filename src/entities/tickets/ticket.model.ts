import { ObjectId } from "mongodb"
import {
  arrayProp as ArrayProperty,
  instanceMethod as InstanceMethod,
  ModelType,
  prop as Property,
  staticMethod as StaticMethod,
  Typegoose,
} from "typegoose"

import { ITicket, ITitles } from "."

export class Ticket extends Typegoose implements ITicket {
  @StaticMethod
  public static findById(this: ModelType<Ticket>, id: any) {
    return this.findOne({ _id: id })
  }

  @Property()
  public readonly _id: ObjectId

  @Property()
  public remoteId: string

  @Property({ required: true, default: "" })
  public title: string

  @Property({ required: true, default: [] })
  public titles: ITitles

  @ArrayProperty({ required: true, items: String, default: [] })
  public genres: string[]

  @Property({ required: true, default: null })
  public price: number | null

  @Property({ required: true, default: 0, min: 0 })
  public inventory: number

  @Property()
  public imageUrl: string

  @Property({ required: true })
  public date: Date
}

export const TicketModel = new Ticket().getModelForClass(Ticket)

export default TicketModel
