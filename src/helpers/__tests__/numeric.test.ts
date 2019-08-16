import { transformInventory, transformPrice } from "../numeric"

describe("numeric fields", () => {
  describe("inventory", () => {
    test("get inventory from float number", () => {
      expect(transformInventory(99.99)).toEqual(99.99)
    })
    test("get inventory from string", () => {
      expect(transformInventory("")).toEqual(0)
      expect(transformInventory("0")).toEqual(0)
      expect(transformInventory("99.99")).toEqual(99.99)
    })
    test("get inventory from undefined", () => {
      expect(transformInventory()).toEqual(0)
    })
    test("get inventory from negative number", () => {
      expect(transformInventory(-1)).toEqual(0)
    })
  })

  describe("price", () => {
    test("get price from float number", () => {
      expect(transformPrice(99.99)).toEqual(99.99)
    })
    test("get price from string", () => {
      expect(transformPrice("99.99")).toEqual(99.99)
    })
    test("get price from undefined", () => {
      expect(transformPrice()).toEqual(null)
    })
  })
})
