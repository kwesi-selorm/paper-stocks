export function calculatePositionAndAverage(
  currentPosition: number,
  currentAmountInvested: number,
  newPosition: number,
  newAmountInvested: number
) {
  const totalPosition = currentPosition + newPosition
  const totalAmountInvested = currentAmountInvested + newAmountInvested
  const averagePrice = totalAmountInvested / totalPosition
  return { totalPosition, averagePrice }
}
