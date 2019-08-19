import { ITicket } from "../../entities"
import { sortByField, sortTickets, trimAllWhitespaces } from "../common"

describe("common helpers", () => {
  describe("sortByField()", () => {
    test("sort field name", () => {
      const getList = () => [
        { title: "c", rates: 1 },
        { title: "a", rates: 3 },
        { title: "b", rates: 2 },
      ]
      let list1 = getList()
      let list2 = [list1[1], list1[2], list1[0]]
      expect(list1.sort(sortByField.bind(null, "title"))).toEqual(list2)
      list1 = getList()
      list2 = [list1[0], list1[2], list1[1]]
      expect(list1.sort(sortByField.bind(null, "rates"))).toEqual(list2)
    })
  })

  describe("sortTickets()", () => {
    test("sort tickets by {date + remoteId}", () => {
      const list1: ITicket[] = []
      list1.push({ remoteId: "1", date: new Date("2001-01-01T00:00:00Z") } as ITicket)
      list1.push({ remoteId: "2", date: new Date("2001-01-01T00:00:00Z") } as ITicket)
      list1.push({ remoteId: "3", date: new Date("2000-01-01T00:00:00Z") } as ITicket)
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
