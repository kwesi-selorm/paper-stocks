import { StockInsight } from "@/utils/types"
import { Button } from "antd"
import React, { useEffect } from "react"
import styles from "../styles/components/InsightsCard.module.css"

const outlooks = [
  { name: "Short-term", id: "7757CC06-1A11-41C0-BAB5-4DC3E70C3387" },
  { name: "Intermediate-term", id: "DA745DCF-5600-4BCF-9A9B-BDC6C6F94681" },
  { name: "Long-term", id: "B8434B5C-53C5-4AE5-9329-7774A89515CB" }
]

type Outlook = {
  score?: number
  scoreDescription?: string
  direction?: string
}

const mockInsightProp: StockInsight = {
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

const lastPriceProp = 194

const InsightsCard = (): JSX.Element => {
  const { companyName, sector, summaries, recommendation } = mockInsightProp

  const [selectedOutlook, setSelectedOutlook] = React.useState<{
    name: string
    id: string
  }>(outlooks[0])
  const [activeOutlook, setActiveOutlook] = React.useState<Outlook | undefined>(
    undefined
  )
  const targetPriceDifference =
    recommendation?.targetPrice !== undefined
      ? ((lastPriceProp - recommendation?.targetPrice) * 100) / lastPriceProp
      : undefined

  useEffect(() => {
    if (mockInsightProp.outlooks === undefined) return
    const { shortTermOutlook, intermediateTermOutlook, longTermOutlook } =
      mockInsightProp.outlooks

    switch (selectedOutlook.name) {
      case "Short-term":
        setActiveOutlook(shortTermOutlook)
        break
      case "Intermediate-term":
        setActiveOutlook(intermediateTermOutlook)
        break
      case "Long-term":
        setActiveOutlook(longTermOutlook)
        break
      default:
        return
    }
  }, [selectedOutlook])

  function onOutlookSelect(outlook: { name: string; id: string }) {
    setSelectedOutlook(outlook)
  }

  function getPercentageDifferenceStyle() {
    if (targetPriceDifference === undefined) {
      return styles[""]
    }
    if (targetPriceDifference >= 0) {
      return styles["positive"]
    }
    return styles["negative"]
  }

  return (
    <section className={styles["container"]}>
      <h2>INSIGHTS</h2>
      <br />

      <p>
        {companyName}
        {sector !== undefined ? ` (${mockInsightProp.sector})` : null}
      </p>
      <br />

      {recommendation !== undefined && <h3>Recommendations</h3>}
      {recommendation?.targetPrice !== undefined && (
        <>
          <p>
            Target price: ${recommendation?.targetPrice} (
            <span className={getPercentageDifferenceStyle()}>
              {targetPriceDifference?.toFixed(1)}%
            </span>
            )
          </p>
        </>
      )}
      {recommendation?.provider !== undefined && (
        <p>Provider: {recommendation?.provider}</p>
      )}
      {recommendation?.rating !== undefined && (
        <p>Rating: {recommendation?.rating}</p>
      )}
      <br />

      {summaries !== undefined && <h3>Summaries</h3>}
      {summaries.bearishSummary !== undefined && (
        <p>Bullish summary: {mockInsightProp.summaries.bullishSummary}</p>
      )}
      {summaries.bearishSummary !== undefined && (
        <p>Bearish summary: {summaries.bearishSummary}</p>
      )}
      <br />

      {mockInsightProp.outlooks !== undefined && <h3>Outlooks</h3>}
      <div className={styles["buttons-row"]}>
        {outlooks.map((outlook) => (
          <Button
            key={outlook.id}
            type={outlook.id === selectedOutlook.id ? "primary" : "text"}
            id={outlook.id}
            onClick={() => onOutlookSelect(outlook)}
          >
            {outlook.name}
          </Button>
        ))}
      </div>
      {activeOutlook !== undefined && (
        <section className={styles["outlook-details"]}>
          <div className={styles["outlook-score"]}>
            Score: {activeOutlook.score}
          </div>
          <div className={styles["outlook-score-description"]}>
            Score description: {activeOutlook?.scoreDescription}
          </div>
          <div className={styles["outlook-direction"]}>
            Direction: {activeOutlook.direction}
          </div>
        </section>
      )}
    </section>
  )
}

export default InsightsCard
