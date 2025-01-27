export const PRICE_QUANTITY = 5

export const priceFields = new Array(PRICE_QUANTITY).fill(undefined).map((_, index) => {
  const value = index + 1

  return {
    value,
    label: '$'.repeat(value)
  }
})
