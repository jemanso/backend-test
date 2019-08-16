import { sortByField, trimAllWhitespaces } from "../common"

describe("common helpers", () => {
  describe("sortByField()", () => {
    test("sort titles by variants", () => {
      const list1 = []
      list1.push({ title: "a", keywords: [], ignored: null })
      list1.push({ title: "c", keywords: [], ignored: null })
      list1.push({ title: "b", keywords: [], ignored: null })
      const list2 = []
      list2.push({ title: "a", keywords: [], ignored: null })
      list2.push({ title: "b", keywords: [], ignored: null })
      list2.push({ title: "c", keywords: [], ignored: null })
      expect(list1.sort(sortByField.bind(null, "title"))).toEqual(list2)
    })
  })

  describe("trimAllWhitespaces()", () => {
    const sanitezedText = "a b c d"
    test("trim left", () => {
      expect(trimAllWhitespaces(` \n\n ${sanitezedText}`)).toEqual(sanitezedText)
    })
    test("trim right", () => {
      expect(trimAllWhitespaces(`${sanitezedText} \n\n `)).toEqual(sanitezedText)
    })
    test("trim all whitespaces", () => {
      expect(trimAllWhitespaces(`a   b \tc\n d\n`)).toEqual(sanitezedText)
    })
  })
})
