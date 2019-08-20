export function validatePageNumber(page: number): void {
  if (!Number.isInteger(page) || page < 1) {
    throw new Error(`page number should be an integer >= 1, got ${page}`)
  }
}

export function validateMovieResponse(response: any) {
  validateMovieResponseStatusCode(response.statusCode)
  validateMovieResponsesBody(response.body)
}

export function validateMovieResponseStatusCode(statusCode: number) {
  if (statusCode !== 200) {
    throw new Error(`http response statusCode should be 200, got ${statusCode}`)
  }
}

export function validateMovieResponsesBody(body: any): void {
  if (body && body.Response && body.Response.toLowerCase() === "true") {
    return
  } else {
    throw new Error(`http response body should have Response="True", got ${body.Response}`)
  }
}
