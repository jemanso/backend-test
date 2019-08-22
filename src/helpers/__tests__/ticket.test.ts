import { IRemoteTicket } from "../../remote/ticketapi"
import { ticketFromRemoteData } from "../tickets"

describe("ticket entity", () => {
  describe("ticketFromRemoteData(rawRemoteTicket)", () => {
    const remoteTicket: IRemoteTicket = {
      remoteId: "5b8701a4fc13ae65690003e7",
      title: "one?(two)(three)",
      genre: "Adventure|Fantasy",
      price: 23.208,
      inventory: 9,
      image: "http://dummyimage.com/1407x1623.png/5fa2dd/ffffff",
      date: "2017-09-04T17:51:45Z",
    }
    const ticket = ticketFromRemoteData(remoteTicket)
    test("remoteId from _id", () => {
      expect(ticket.remoteId).toEqual("5b8701a4fc13ae65690003e7")
    })
    test("title", () => {
      expect(ticket.title).toEqual("one?(two)(three)")
    })
    test("titles", () => {
      expect(ticket.titles).toEqual([
        { title: "one?", keywords: ["one"] },
        { title: "two", keywords: ["two"] },
        { title: "three", keywords: ["three"] },
      ])
    })
    test("genres", () => {
      expect(ticket.genres).toEqual(["Adventure", "Fantasy"])
    })
  })
})
