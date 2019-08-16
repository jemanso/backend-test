import { ObjectId } from "mongodb"
import {
  arrayProp as ArrayProperty,
  instanceMethod as InstanceMethod,
  ModelType,
  prop as Property,
  staticMethod as StaticMethod,
  Typegoose,
} from "typegoose"

export class Movie extends Typegoose {
  public readonly _id: ObjectId

  @Property({ required: true })
  public title: string

  @Property({ required: true })
  public year: string

  @Property({ required: true })
  public rated: string

  @Property({ required: true })
  public released: string

  @Property({ required: true })
  public runtime: string

  @ArrayProperty({ items: String, default: [] })
  public genre: string[]

  @Property({ required: true })
  public country: string
}

export const MovieModel = new Movie().getModelForClass(Movie)

export default MovieModel
