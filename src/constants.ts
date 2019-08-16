import * as dotenv from "dotenv"

dotenv.config()

export const DEFAULT_GENRE_DELIMITER = "|"
export const DEFAULT_GENRE_STRING = "N/A"

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
