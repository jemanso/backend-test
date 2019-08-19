import { IRemoteTicket } from "../ticketapi"
import { ticketFromRemoteData } from "../ticketapi/transformers"

describe("ticket entity", () => {
  describe("ticketFromRemoteData(rawRemoteTicket)", () => {
    const remoteTicket: IRemoteTicket = {
      remoteId: "5b8701a4fc13ae65690003e7",
      title: "Kismet",
      genre: "Adventure|Fantasy",
      price: 23.208,
      inventory: 9,
      image: "http://dummyimage.com/1407x1623.png/5fa2dd/ffffff",
      date: "2017-09-04T17:51:45Z",
    }
    test("remoteId from _id", () => {
      const ticket = ticketFromRemoteData(remoteTicket)
      expect(ticket.remoteId).toEqual("5b8701a4fc13ae65690003e7")
    })
  })
})
