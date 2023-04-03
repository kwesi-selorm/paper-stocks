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
  score: number
  scoreDescription: string
  direction: string
}

const mockInsight: StockInsight = {
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
  }
}

const Outlooks = (): JSX.Element => {
  const [selectedActiveOutlook, setSelectedActiveOutlook] = React.useState<{
    name: string
    id: string
  }>(outlooks[0])
  const [activeOutlook, setActiveOutlook] = React.useState<Outlook | null>(null)

  useEffect(() => {
    if (mockInsight.outlooks === undefined) return
    const stockOutlooks = mockInsight.outlooks
    // const activeOutlookInput = outlooks.find(o=> mo)
    // setActiveOutlook(mockInsight.outlooks[selectedActiveOutlook.name])
  }, [selectedActiveOutlook])

  function onOutlookSelect(outlook: { name: string; id: string }) {
    setSelectedActiveOutlook(outlook)
  }

  return (
    <section>
      <div className={styles["buttons-row"]}>
        {outlooks.map((outlook) => (
          <Button
            key={outlook.id}
            type={outlook.id === selectedActiveOutlook.id ? "primary" : "text"}
            id={outlook.id}
            onClick={() => onOutlookSelect(outlook)}
          >
            {outlook.name}
          </Button>
        ))}
      </div>
      <div className={styles["outlook-details"]}>
        {/*<p>Score: {selectedActiveOutlook}</p>*/}
      </div>
    </section>
  )
}

const InsightsCard = (): JSX.Element => {
  return (
    <section className={styles["container"]}>
      <h3>Insights</h3>
      <h4>{mockInsight.companyName}</h4>
      <br />
      <p>Industry: {mockInsight.sector}</p>
      <Outlooks />
    </section>
  )
}

export default InsightsCard
