export const sortByField = (field: string, a: any, b: any): number => {
  if (a[field] > b[field]) {
    return 1
  }
  if (a[field] < b[field]) {
    return -1
  }
  return 0
}

export const trimAllWhitespaces = (text?: string): string => {
  if (!text) {
    return ""
  }
  return text.replace(/\s+/g, " ").trim()
}
