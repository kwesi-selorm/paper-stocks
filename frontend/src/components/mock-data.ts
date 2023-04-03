import { StockInsights } from "@/utils/types"

export const mockInsight: StockInsights = {
  companyName: "Mock Company",
  sector: "Technology",
  summaries: {
    bearishSummary: "Bearish Summary",
    bullishSummary: "Bullish Summary"
  },
  outlooks: {
    shortTermOutlook: {
      score: 1,
      scoreDescription: "Low",
      direction: "Up"
    },
    intermediateTermOutlook: {
      score: 3,
      scoreDescription: "Pathway",
      direction: "Down"
    },
    longTermOutlook: {
      score: 2,
      scoreDescription: "Medium",
      direction: "Down"
    }
  },
  recommendation: {
    targetPrice: 180,
    provider: "Top Holdings",
    rating: 1
  }
}

export const lastPriceProp = 194
