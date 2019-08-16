import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { ticketsSvc } from "../../services"
import { ServerStatus } from "../schemas/status"
import { Ticket } from "../schemas/ticket"
import { AddTicketInput, ListTicketsInput, TicketInput } from "../schemas/ticket.input"

@Resolver(() => Ticket)
export class TicketResolver {
  @Query(() => Ticket, { nullable: true })
  public async ticket(@Arg("input") ticketInput: TicketInput): Promise<Ticket> {
    // const ticket = await TicketModel.findById(ticketInput.id)
    // if (!ticket) {
    //   throw new Error("No ticket found!")
    // }
    const ticket = new Ticket()
    return ticket
  }

  @Query(() => [Ticket])
  public async listTickets(@Arg("input") input: ListTicketsInput): Promise<Ticket[]> {
    const ticket1 = new Ticket()
    const ticket2 = new Ticket()
    return [ticket1, ticket2]
    // const tickets = await TicketModel.find({})
    // const result = tickets
    //   .filter(ticket => ticket.date.getTime() < input.cursor.getTime())
    //   .sort((a, b) => b.date.getTime() - a.date.getTime())
    //   .slice(0, input.limit)
    // return result
  }

  @Mutation(() => Ticket)
  public async addTicket(@Arg("input") ticketInput: AddTicketInput): Promise<Ticket> {
    // TODO: addTicket
    const ticket = new Ticket()
    return ticket
  }

  @Mutation(() => ServerStatus)
  public async initialize(): Promise<ServerStatus> {
    // TODO: Initiate cleaning and storing of ticket data into MongoDB
    await ticketsSvc.start()
    const status = new ServerStatus()
    // status.graphql = ServiceState.started
    // status.ticketapi = SyncingState.syncing
    return status
  }
}
