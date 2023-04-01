import {
  AssetTableRecord,
  GetAssetsResponse,
  LoggedInUser
} from "@/utils/types"
import React, { useEffect } from "react"
import { formatToCurrencyString } from "@/utils/number-utils"
import styles from "../styles/components/CashDetails.module.css"
import { Divider } from "antd"

type RowProps = {
  assets: GetAssetsResponse[]
  user: LoggedInUser
  setTableData: (tableData: AssetTableRecord[]) => void
}

const CashDetails: React.FC<RowProps> = ({ assets, user, setTableData }) => {
  const [returnSign, setReturnSign] = React.useState("")
  const [portfolioValue, setPortfolioValue] = React.useState<number>(0)
  const [percentageReturn, setPercentageReturn] = React.useState<number>(0)

  useEffect(() => {
    if (!assets) return
    const marketValue = assets.reduce((total, asset) => {
      if (!asset.marketPrice) {
        return 0
      } else {
        return total + asset.position * asset.marketPrice
      }
    }, 0)

    const portfolioValueInput = assets.reduce((total, asset) => {
      return total + asset.averagePrice * asset.position
    }, 0)
    setPortfolioValue(portfolioValueInput)

    const cashSpent = 100000 - user.buyingPower
    setPercentageReturn(((marketValue - cashSpent) / cashSpent) * 100)

    const tableDataInput = assets.map((a) => {
      return {
        ...a,
        averagePrice: formatToCurrencyString(a.averagePrice),
        marketPrice: formatToCurrencyString(a.marketPrice),
        value: formatToCurrencyString(a.position * a.averagePrice),
        returnCurrency: (a.position * (a.marketPrice - a.averagePrice)).toFixed(
          2
        ),
        returnPercent: (
          ((a.marketPrice - a.averagePrice) / a.averagePrice) *
          100
        ).toFixed(2)
      }
    })
    setTableData(tableDataInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets])

  useEffect(() => {
    if (percentageReturn >= 0) {
      setReturnSign("positive")
    } else if (percentageReturn < 0) {
      setReturnSign("negative")
    }
  }, [assets, percentageReturn, user])

  return (
    <section className={styles["cash-details-row"]}>
      <div>
        Purchasing Power:{" "}
        <b className={styles["value"]}>
          {formatToCurrencyString(user.buyingPower)}
        </b>
      </div>
      <Divider type="vertical" />
      <div>
        Net Asset Value:{" "}
        <b className={styles["value"]}>
          {formatToCurrencyString(portfolioValue)}
        </b>{" "}
        <b
          className={
            styles[`${returnSign === "positive" ? "positive" : "negative"}`]
          }
        >
          {Boolean(assets) && assets.length === 0
            ? 0
            : percentageReturn.toFixed(2)}
          %
        </b>
      </div>
    </section>
  )
}

export default CashDetails
