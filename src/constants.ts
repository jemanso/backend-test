import crypto from "crypto"
import dotenv from "dotenv"
import os from "os"

dotenv.config()

// Logger
export const SERVER_ID = process.env.SERVER_ID || `${os.hostname()}.${process.pid}`
export const SERVER_ID_MD5 = crypto
  .createHash("md5")
  .update(SERVER_ID)
  .digest()
  .toString("hex")

// Genres
export const DEFAULT_GENRE_DELIMITER = process.env.DEFAULT_GENRE_DELIMITER || "|"
export const DEFAULT_GENRE_STRING = process.env.DEFAULT_GENRE_STRING || "N/A"

// Cache
export const TICKET_CACHE_FILE = process.env.TICKET_CACHE_FILE || "./cache/tickets_cache.json"

// Ticket API
export const TICKET_API_URL =
  process.env.TICKET_API_URL ||
  "https://us-central1-bonsai-interview-endpoints.cloudfunctions.net/movieTickets"

export const TICKET_API_PAGELIMIT = 100

// OMDB API
export const OMDB_API_URL = process.env.OMDB_API_URL || "http://www.omdbapi.com"
export const OMDB_API_KEY = process.env.OMDB_API_KEY || "PlzBanME"

// MongoDB Dev
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/bonsai-backend-test"

// GraphQL Server
export const GQL_PORT = process.env.GQL_PORT || 4000
