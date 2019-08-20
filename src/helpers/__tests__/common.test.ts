import { ITicket } from "../../entities"
import { sortTickets, trimAllWhitespaces } from "../common"

describe("common helpers", () => {
  describe("sortTickets()", () => {
    const getList = () =>
      [
        { remoteId: "1", date: new Date("2001-01-01T00:00:00Z") },
        { remoteId: "2", date: new Date("2001-01-01T00:00:00Z") },
        { remoteId: "3", date: new Date("2000-01-01T00:00:00Z") },
      ] as ITicket[]
    test("sort tickets by {date + remoteId}", () => {
      const list1 = getList()
      const list2 = [list1[2], list1[0], list1[1]]
      expect(list1.sort(sortTickets)).toEqual(list2)
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
