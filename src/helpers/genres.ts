import { DEFAULT_GENRE_DELIMITER, DEFAULT_GENRE_STRING } from "../constants"

export const createComputedGenres = (
  rawGenresString?: string | null,
  delimiter = DEFAULT_GENRE_DELIMITER,
): string[] => {
  return (rawGenresString || DEFAULT_GENRE_STRING).split(delimiter).filter(Boolean)
}
