import { Outlook } from "@/components/InsightsCard"

export function checkMarketOpen(marketState: string): boolean {
  if (
    marketState === "PREPRE" ||
    marketState === "PRE" ||
    marketState === "CLOSED" ||
    marketState === "POST"
  ) {
    return false
  } else return marketState === "OPEN" || marketState === "REGULAR"
}

function isEmpty(object: Outlook | undefined) {
  if (object === undefined) return true
  return Object.keys(object).length === 0
}

export function isAllEmptyOutlooks(
  outlooks:
    | {
        shortTermOutlook?: Outlook
        intermediateTermOutlook?: Outlook
        longTermOutlook?: Outlook
      }
    | undefined
): boolean {
  if (outlooks === undefined) return true
  const { shortTermOutlook, intermediateTermOutlook, longTermOutlook } =
    outlooks
  return (
    isEmpty(shortTermOutlook) &&
    isEmpty(intermediateTermOutlook) &&
    isEmpty(longTermOutlook)
  )
}
