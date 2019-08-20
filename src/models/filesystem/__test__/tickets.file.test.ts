import { TICKET_CACHE_FILE } from "../../../constants"
import { ITicket } from "../../../entities"
import { TicketsFileIO } from "../tickets.file"

describe("DatasourceIO: Filesystem", () => {
  describe("TicketsIO", () => {
    const ticketSample: ITicket = {
      remoteId: "5b8701a1fc13ae6569000000",
      title: "Long Live Death)",
      titles: [],
      genres: ["Drama", "War"],
      price: 28.704,
      inventory: 4,
      imageUrl: "http://dummyimage.com/1459x751.png/cc0000/ffffff",
      date: new Date("2017-09-27T05:06:56Z"),
    }
    const ticketsFile = new TicketsFileIO()
    test("connect", async () => {
      expect(await ticketsFile.connect(`${TICKET_CACHE_FILE}.test`)).toEqual(true)
    })
    test("write", async () => {
      expect(await ticketsFile.write(ticketSample as ITicket)).toEqual(true)
    })
    test("read", async () => {
      expect(await ticketsFile.read(ticketSample.remoteId)).toEqual(ticketSample)
    })
    test("disconnect", async () => {
      expect(await ticketsFile.disconnect()).toEqual(true)
    })
  })
})
