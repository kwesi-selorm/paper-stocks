export function findPositionAndAverageOnBuy(
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

export function findPositionAndAverageOnSell(
  currentPosition: number,
  currentAveragePrice: number,
  positionsSold: number,
  unitPrice: number
) {
  const costBasis = positionsSold * currentAveragePrice
  const netProceeds = positionsSold * unitPrice
  const gainOrLoss = netProceeds - costBasis
  const remainingPosition = currentPosition - positionsSold
  return { remainingPosition, gainOrLoss }
}
