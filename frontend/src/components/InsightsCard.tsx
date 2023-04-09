import { StockInsights } from "@/utils/types"
import { Button } from "antd"
import React, { useEffect } from "react"
import styles from "../styles/components/InsightsCard.module.css"
import { mockInsight } from "@/components/mock-data"
import { useQuery } from "react-query"
import getStockInsights from "@/api/get-stock-insights"
import { AxiosError } from "axios"
import { isAllEmptyOutlooks } from "@/utils/stock-util"
import SpinningLoader from "@/components/SpinningLoader"

const outlooks = [
  { name: "Short-term", id: "7757CC06-1A11-41C0-BAB5-4DC3E70C3387" },
  { name: "Intermediate-term", id: "DA745DCF-5600-4BCF-9A9B-BDC6C6F94681" },
  { name: "Long-term", id: "B8434B5C-53C5-4AE5-9329-7774A89515CB" }
]

export type Outlook = {
  score?: number
  scoreDescription?: string
  direction?: string
}

interface Props {
  symbol: string
  lastPrice: number
}

const InsightsCard = ({ symbol, lastPrice }: Props): JSX.Element | null => {
  const [selectedOutlook, setSelectedOutlook] = React.useState<{
    name: string
    id: string
  }>(outlooks[0])
  const [activeOutlook, setActiveOutlook] = React.useState<Outlook | undefined>(
    undefined
  )
  const [stockInsights, setStockInsights] =
    React.useState<StockInsights>(mockInsight)

  const { data, isLoading, isError, error } = useQuery(
    ["stock-insights", symbol],
    () => getStockInsights(symbol),
    {
      retry: false,
      refetchOnWindowFocus: false
    }
  )
  const { companyName, sector, summaries, recommendation } = stockInsights

  const targetPriceDifference =
    recommendation?.targetPrice !== undefined
      ? ((recommendation?.targetPrice - lastPrice) * 100) / lastPrice
      : undefined

  // Handling stock insights
  useEffect(() => {
    if (data === undefined) {
      return
    }
    setStockInsights(data)
  }, [data])

  useEffect(() => {
    if (stockInsights?.outlooks === undefined) return
    const { shortTermOutlook, intermediateTermOutlook, longTermOutlook } =
      stockInsights.outlooks

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
  }, [selectedOutlook, stockInsights.outlooks])

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

  if (isLoading) return <SpinningLoader />

  if (isError) {
    if (error instanceof AxiosError) {
      // message.error(error?.response?.data?.message).then()
      return null
    }
  }

  return (
    <section className={styles["container"]}>
      <h2>INSIGHTS</h2>

      <div>
        {companyName}
        {sector !== undefined ? ` (${stockInsights?.sector})` : null}
      </div>

      {recommendation !== undefined && Object.keys(recommendation).length > 0 && (
        <>
          <br />
          <h3>Recommendations</h3>
        </>
      )}
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

      {summaries !== undefined && Object.keys(summaries).length > 0 && (
        <>
          <br />
          <h3>Summaries</h3>
        </>
      )}
      {summaries.bearishSummary !== undefined && (
        <p>
          <b>Bullish summary</b>: {stockInsights?.summaries?.bullishSummary}
        </p>
      )}
      <br />
      {summaries.bearishSummary !== undefined && (
        <p>
          <b>Bearish summary</b>: {summaries?.bearishSummary}
        </p>
      )}

      {stockInsights?.outlooks !== undefined &&
        !isAllEmptyOutlooks(stockInsights?.outlooks) && (
          <>
            <h3>Outlooks</h3>
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

            {activeOutlook !== undefined &&
              Object.keys(activeOutlook).length > 0 && (
                <section className={styles["outlook-details"]}>
                  <div className={styles["outlook-score"]}>
                    Score: {activeOutlook?.score}
                  </div>
                  <div className={styles["outlook-score-description"]}>
                    Score description: {activeOutlook?.scoreDescription}
                  </div>
                  <div className={styles["outlook-direction"]}>
                    Direction: {activeOutlook?.direction}
                  </div>
                </section>
              )}
          </>
        )}
    </section>
  )
}

export default InsightsCard
