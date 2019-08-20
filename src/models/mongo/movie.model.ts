import { ObjectId } from "mongodb"
import {
  arrayProp as ArrayProperty,
  instanceMethod as InstanceMethod,
  ModelType,
  prop as Property,
  staticMethod as StaticMethod,
  Typegoose,
} from "typegoose"

import { IMovie, IRating } from "../../entities"

export class MovieSchema extends Typegoose implements IMovie {
  @Property({ required: true })
  public readonly _id: ObjectId

  @Property({ required: true })
  public imdbID: string

  @Property()
  public title: string

  @Property()
  public year: string

  @Property()
  public rated: string

  @Property()
  public released: string

  @Property()
  public runtime: string

  @ArrayProperty({ items: String, default: [] })
  public genre: string

  @Property()
  public director: string

  @Property()
  public writer: string

  @Property()
  public actors: string

  @Property()
  public plot: string

  @Property()
  public language: string

  @Property()
  public country: string

  @Property()
  public awards: string

  @Property()
  public poster: string

  @Property()
  public ratings: IRating[]

  @Property()
  public metascore: string

  @Property()
  public imdbRating: string

  @Property()
  public imdbVotes: string

  @Property()
  public type: string

  @Property()
  public dvd: string

  @Property()
  public boxOffice: string

  @Property()
  public production: string

  @Property()
  public website: string
}

export const MovieModel = new MovieSchema().getModelForClass(MovieSchema)

export default MovieModel
