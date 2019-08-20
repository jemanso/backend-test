import { ITitles, ITitleVariant } from "../entities"

import { trimAllWhitespaces } from "./common"

export const sanitizeTitle = (rawMovieTitles?: string): string => {
  return trimAllWhitespaces(rawMovieTitles)
}

export const computeTitleVariants = (sanitizedMovieTitles: string): string[] => {
  return sanitizedMovieTitles
    .split("(")
    .map(_ => _.replace(")", ""))
    .map(_ => trimAllWhitespaces(_))
    .filter(Boolean)
}

export const computeTitleKeywords = (movieTitleVariant: string): string[] => {
  const keywords = movieTitleVariant
    .replace(/[|]+/g, " ")
    .replace(/\s[-]/g, " ")
    .replace(/[-]\s/g, " ")
    .replace(/[!?,:&]+/g, "")
    .toLowerCase()
  return trimAllWhitespaces(keywords)
    .replace(/\s+/g, "|")
    .split("|")
}

export const createComputedTitles = (rawMovieTitles?: string): ITitles => {
  const sanitizedMovieTitles = sanitizeTitle(rawMovieTitles)
  return computeTitleVariants(sanitizedMovieTitles).map(
    (title: string): ITitleVariant => {
      return {
        title,
        keywords: computeTitleKeywords(title),
      }
    },
  )
}
