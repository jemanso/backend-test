import { Arg, Mutation, Query, Resolver } from "type-graphql"

import services from "../../services"
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
  public async listTickets(@Arg("input") filter: ListTicketsInput): Promise<Ticket[]> {
    if (services.tickets) {
      return services.tickets.filterByCursor(filter) as Ticket[]
    } else {
      return []
    }
  }

  @Mutation(() => Ticket)
  public async addTicket(@Arg("input") ticketInput: AddTicketInput): Promise<Ticket> {
    // TODO: addTicket
    const ticket = new Ticket()
    return ticket
  }
}
