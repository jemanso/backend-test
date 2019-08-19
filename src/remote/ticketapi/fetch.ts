import got from "got"

import { validatePageNumber } from "../validations"

import { IRemoteTicketsQuery } from "./interfaces"

export function createTicketsQuery(
  queryId: number,
  baseUrl: string,
  page: number,
  limit: number,
): IRemoteTicketsQuery {
  validatePageNumber(page)
  return { queryId, baseUrl, skip: (page - 1) * limit, limit }
}

export async function fetchTicketsPage(remoteQuery: IRemoteTicketsQuery): Promise<any> {
  const query = { skip: remoteQuery.skip, limit: remoteQuery.limit }
  const resp = await got(remoteQuery.baseUrl, { query, json: true })
  return resp
}
