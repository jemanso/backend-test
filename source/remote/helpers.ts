
export const sortByField = (field: string, a: any, b: any): number => {
  if (a[field] > b[field]) { return 1 }
  if (a[field] < b[field]) { return -1 }
  return 0
}

export const sanitize = (text: string): string => {
  if (!text) { return '' }
  return text.replace(/\s+/g,' ').trim()
}

export interface IComputedTitle {
  titleVariant: string
  keywords: string[]
  ignored: string[] | null
}

export const computeTitle = (movieTitle: string): IComputedTitle[] => {
  return computeTitleVariants(movieTitle)
    .map(titleVariant => {
      const keywords = computeTitleKeywords(titleVariant)
      return { titleVariant, keywords, ignored: null }
    })
}

export const computeTitleVariants = (movieTitle: string): string[] => {
  return movieTitle
    .split('(')
    .map(_ => _.replace(')',''))
    .map(_ => sanitize(_))
    .filter(Boolean)
}

export const computeTitleKeywords = (movieTitle: string): string[] => {
  const keywords = movieTitle
    .replace(/\s[-]/g,' ')
    .replace(/[-]\s/g,' ')
    .replace(/[!?,:&]+/g,'')
    .toLowerCase()
  return sanitize(keywords)
    .replace(/\s+/g,'+')
    .split('+')
}


// function populateTickets (tickets) {
//   tickets.forEach(ticket => {
    
//   })
//   return tickets
// }