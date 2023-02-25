export function findNewPositionAndAverage(
  currentPosition: number,
  currentAverage: number,
  newPosition: number,
  lastPrice: number
) {
  const totalPosition = currentPosition + newPosition
  const newAverage =
    (currentPosition * currentAverage + newPosition * lastPrice) / totalPosition
  return { totalPosition, newAverage }
}
