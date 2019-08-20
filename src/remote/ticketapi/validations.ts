export function validatePageNumber(page: number): void {
  if (!Number.isInteger(page) || page < 1) {
    throw new Error(`page number should be an integer >= 1, got ${page}`)
  }
}

export function validateResponse(response: any) {
  validateResponseStatusCode(response.statusCode)
  validateResponseBody(response.body)
}

export function validateResponseStatusCode(statusCode: number) {
  if (statusCode !== 200) {
    throw new Error(`http response statusCode should be 200, got ${statusCode}`)
  }
}

export function validateResponseBody(body: any) {
  if (!Array.isArray(body)) {
    throw new Error(`http response body should be an array, got ${typeof body}`)
  }
}
