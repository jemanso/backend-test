import { validateMovieResponseStatusCode, validatePageNumber } from "../validations"

describe("validations", () => {
  describe("validatePageNumber", () => {
    test("not integer", () => {
      expect(() => validatePageNumber(99.99)).toThrowError(/should be an integer/)
    })
    test("less than 1", () => {
      expect(() => validatePageNumber(0)).toThrowError(/should be an integer/)
    })
    test("with a valid value", () => {
      expect(() => validatePageNumber(10)).not.toThrow()
    })
  })

  describe("validateMovieResponseStatusCode", () => {
    test("http statusCode 200", () => {
      expect(() => validateMovieResponseStatusCode(200)).not.toThrow()
    })
    test("http statusCode not 200", () => {
      expect(() => validateMovieResponseStatusCode(201)).toThrowError(/should be/)
      expect(() => validateMovieResponseStatusCode(403)).toThrowError(/should be/)
      expect(() => validateMovieResponseStatusCode(404)).toThrowError(/should be/)
    })
  })
})
