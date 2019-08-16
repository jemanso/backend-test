import { DEFAULT_GENRE_STRING } from "../../constants"
import { createComputedGenres } from "../genres"

describe("createComputedGenres()", () => {
  describe("returns default genres when provided with", () => {
    const defaultGenres = [DEFAULT_GENRE_STRING]
    test("empty string", () => expect(createComputedGenres("")).toEqual(defaultGenres))
    test("undefined", () => expect(createComputedGenres()).toEqual(defaultGenres))
    test("null", () => expect(createComputedGenres(null)).toEqual(defaultGenres))
  })
  describe("properly splits with", () => {
    test("single genre", () => {
      expect(createComputedGenres("one")).toEqual(["one"])
    })
    test("two genres", () => {
      expect(createComputedGenres("one|two")).toEqual(["one", "two"])
    })
    test("three genres", () => {
      expect(createComputedGenres("one|two|three")).toEqual(["one", "two", "three"])
    })
    test("leading delimiter", () => {
      expect(createComputedGenres("|one|two|three")).toEqual(["one", "two", "three"])
    })
    test("trailing delimiter", () => {
      expect(createComputedGenres("one|two|three|")).toEqual(["one", "two", "three"])
    })
    test("double delimiter", () => {
      expect(createComputedGenres("one||two||three")).toEqual(["one", "two", "three"])
    })
    test("custom delimiter", () => {
      expect(createComputedGenres("one,two,three", ",")).toEqual(["one", "two", "three"])
    })
  })
})
