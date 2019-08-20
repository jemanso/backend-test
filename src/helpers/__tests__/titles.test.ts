import { computeTitleKeywords, computeTitleVariants, createComputedTitles } from "../titles"

describe("Titles", () => {
  describe("computeTitleVariants()", () => {
    test("title with no variants", () => {
      expect(computeTitleVariants("The Heart")).toEqual(["The Heart"])
    })
    test("title with 2 variants", () => {
      expect(computeTitleVariants("The Heart (O Coração)")).toEqual(["The Heart", "O Coração"])
      expect(computeTitleVariants("The Heart (O Coração)()")).toEqual(["The Heart", "O Coração"])
      expect(computeTitleVariants("The Heart ()(O Coração)")).toEqual(["The Heart", "O Coração"])
    })
    test("title with 3 variants", () => {
      expect(computeTitleVariants("The Heart (O Coração)(την καρδιά)")).toEqual([
        "The Heart",
        "O Coração",
        "την καρδιά",
      ])
      expect(computeTitleVariants("The Heart (O Coração)()(την καρδιά)")).toEqual([
        "The Heart",
        "O Coração",
        "την καρδιά",
      ])
    })
  })

  describe("computeTitleKeywords()", () => {
    test("title with 2 keywords", () => {
      expect(computeTitleKeywords("Heart, the")).toEqual(["heart", "the"])
      expect(computeTitleKeywords("Heart?, the")).toEqual(["heart", "the"])
      expect(computeTitleKeywords("The- Heart!")).toEqual(["the", "heart"])
    })
  })

  describe("createComputedTitles()", () => {
    test("three titles", () => {
      expect(createComputedTitles("one?(two)(three)")).toEqual([
        { title: "one?", keywords: ["one"] },
        { title: "two", keywords: ["two"] },
        { title: "three", keywords: ["three"] },
      ])
    })
  })
})
