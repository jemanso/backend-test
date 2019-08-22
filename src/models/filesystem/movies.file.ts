import { readFile, writeFile } from "fs"

import { IDatasourceIO } from ".."
import { IMovie } from "../../entities"
import { sortMovies } from "../../helpers/common"
import { IDatasourceLogger } from "../interfaces"

export class MoviesFileIO implements IDatasourceIO {
  public memoryCache: IMovie[] = []

  constructor(public filename: string | null, public logger: IDatasourceLogger) {}

  public async connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.logger.info(`connecting to file ${this.filename}`)
      if (!this.filename) {
        reject("filename not defined")
        return
      }
      readFile(this.filename, { encoding: "utf8" }, (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            this.memoryCache = []
            this.disconnect()
            resolve(true)
          } else {
            this.logger.info(`ERROR while connection to file ${this.filename}, ${err.message}`)
            resolve(false)
          }
        } else {
          this.memoryCache = JSON.parse(data)
          this.logger.info(`file loaded successfully ${this.filename}`)
          resolve(true)
        }
      })
    })
  }

  public async disconnect(): Promise<boolean> {
    return this.saveMemoryCache()
  }

  public async read(imdbID: string): Promise<IMovie | null> {
    return new Promise(resolve => {
      this.logger.info(`reading Movie, imdbID ${imdbID}`)
      for (const Movie of this.memoryCache) {
        if (Movie.imdbID === imdbID) {
          resolve(Movie)
        }
      }
      resolve(null)
    })
  }

  public async write(Movie: IMovie): Promise<boolean> {
    return new Promise(resolve => {
      this.logger.info(`writing Movie, imdbID ${Movie.imdbID}`)
      const newCache = this.memoryCache.filter(MovieCache => !(MovieCache.imdbID === Movie.imdbID))
      newCache.push(Movie)
      newCache.sort(sortMovies)
      this.memoryCache = newCache
      this.saveMemoryCache()
      resolve(true)
    })
  }

  public async seek(after: string, limit: number): Promise<IMovie[]> {
    return new Promise(resolve => {
      this.logger.info(`seeking Movies after ${after} limited by ${limit}`)
      if (!this.memoryCache) {
        resolve([])
      }
      resolve(this.memoryCache.filter(Movie => Movie.imdbID > after).slice(0, limit))
    })
  }

  private saveMemoryCache(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.filename) {
        reject(new Error("filename not defined"))
        return
      }
      const data = JSON.stringify(this.memoryCache)
      writeFile(this.filename, data, { encoding: "utf8" }, err => {
        if (err) {
          reject(err)
        }
        resolve(true)
      })
    })
  }
}
