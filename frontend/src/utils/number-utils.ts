export function formatToCurrencyString(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export function findPercentageReturn(
  purchasingPower: number,
  netAssetValue: number
) {
  const cashSpent = 100000 - purchasingPower
  if (cashSpent === netAssetValue) {
    return 0
  }
  return ((netAssetValue - cashSpent) / cashSpent) * 100
}
