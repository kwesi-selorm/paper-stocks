import { MarketState } from "@/utils/types"

export function checkMarketOpen(marketState: string): boolean {
  return !(
    marketState === MarketState.PREPRE ||
    marketState === MarketState.PRE ||
    marketState === MarketState.CLOSED ||
    marketState === MarketState.POST
  )
}
