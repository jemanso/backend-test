export const transformInventory = (rawInventory?: number | string | null): number => {
  return Math.max(Number(rawInventory) || 0, 0)
}

export const transformPrice = (rawPrice?: number | string): number | null => {
  // Be careful not to convert invalid values ​​to 0 (zero)
  // "Price=0" may mean "for free", invalid values may not
  const price = Number(rawPrice)
  return Number.isNaN(price) ? null : price
}
