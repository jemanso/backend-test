import {
  computeTitleKeywords,
  computeTitleVariants,
  IComputedTitle,
  sanitize,
  sortByField
 } from "../helpers"

describe("remote/helpers", () => {
  describe("sortByField", () => {
    test("sort titles by variants", () => {
      const list1: IComputedTitle[] = []
      list1.push({ titleVariant: 'a', keywords: [], ignored: null })
      list1.push({ titleVariant: 'c', keywords: [], ignored: null })
      list1.push({ titleVariant: 'b', keywords: [], ignored: null })
      const list2: IComputedTitle[] = []
      list2.push({ titleVariant: 'a', keywords: [], ignored: null })
      list2.push({ titleVariant: 'b', keywords: [], ignored: null })
      list2.push({ titleVariant: 'c', keywords: [], ignored: null })
      expect(list1.sort(sortByField.bind(null, 'titleVariant'))).toEqual(list2)
    })
  })

  describe("sanitize()", () => {
    const sanitezedText = "a b c d"
    test("trim left", () => {
      expect(sanitize(` \n\n ${sanitezedText}`)).toEqual(sanitezedText)
    })
    test("trim right", () => {
      expect(sanitize(`${sanitezedText} \n\n `)).toEqual(sanitezedText)
    })
    test("sanitize middle", () => {
      expect(sanitize(`a   b \tc\n d\n`)).toEqual(sanitezedText)
    })
  })

  describe("computeTitleVariants()", () => {
    test("title with no variants", () => {
      expect(computeTitleVariants('The Heart')).toEqual(['The Heart'])
    })
    test("title with 2 variants", () => {
      expect(computeTitleVariants('The Heart (O Coração)')).toEqual(['The Heart', 'O Coração'])
      expect(computeTitleVariants('The Heart (O Coração)()')).toEqual(['The Heart', 'O Coração'])
      expect(computeTitleVariants('The Heart ()(O Coração)')).toEqual(['The Heart', 'O Coração'])
    })
    test("title with 3 variants", () => {
      expect(computeTitleVariants('The Heart (O Coração)(την καρδιά)')).toEqual(['The Heart', 'O Coração', 'την καρδιά'])
      expect(computeTitleVariants('The Heart (O Coração)()(την καρδιά)')).toEqual(['The Heart', 'O Coração', 'την καρδιά'])
    })
  })

  describe("computeTitleKeywords()", () => {
    test("title with 2 keywords", () => {
      expect(computeTitleKeywords('Heart, the')).toEqual(['heart', 'the'])
      expect(computeTitleKeywords('Heart?, the')).toEqual(['heart', 'the'])
      expect(computeTitleKeywords('The- Heart!')).toEqual(['the', 'heart'])
    })
  })
})
