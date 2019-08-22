import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { ITicket } from "../../entities"
import services from "../../services"
import { Ticket } from "../schemas/ticket"
import { AddTicketInput, ListTicketsInput, TicketInput } from "../schemas/ticket.input"

@Resolver(() => Ticket)
export class TicketResolver {
  @Query(() => Ticket, { nullable: true })
  public async ticket(@Arg("remoteId") remoteId: string): Promise<ITicket | null> {
    if (services.tickets) {
      return services.tickets.getTicketByRemoteId(remoteId)
    } else {
      return null
    }
  }

  @Query(() => [Ticket])
  public async listTickets(@Arg("input") filter: ListTicketsInput): Promise<ITicket[]> {
    if (services.tickets) {
      return services.tickets.filterByCursor(filter)
    } else {
      return []
    }
  }

  @Mutation(() => Ticket)
  public async addTicket(@Arg("input") ticketInput: AddTicketInput): Promise<ITicket> {
    // TODO: addTicket
    const ticket = new Ticket()
    return ticket
  }
}
