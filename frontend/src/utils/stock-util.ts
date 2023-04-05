import { Outlook } from "@/components/InsightsCard"

export function isMarketClosed(marketState: string): boolean {
  return (
    marketState === "PREPRE" ||
    marketState === "PRE" ||
    marketState === "CLOSED" ||
    marketState === "POST"
  )
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
