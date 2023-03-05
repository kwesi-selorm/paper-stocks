import { Asset, LoggedInUser } from "@/utils/types"
import React, { useEffect } from "react"
import {
  findPercentageReturn,
  formatToCurrencyString
} from "@/utils/number-utils"
import styles from "../styles/components/CashDetails.module.css"
import { Divider } from "antd"

type RowProps = {
  assets: Asset[]
  user: LoggedInUser
}

const CashDetails: React.FC<RowProps> = ({ assets, user }) => {
  const [returnSign, setReturnSign] = React.useState("")

  const netAssetValue = assets.reduce((total, asset) => {
    return total + asset.averagePrice * asset.position
  }, 0)

  const percentageReturn = findPercentageReturn(user.buyingPower, netAssetValue)

  useEffect(() => {
    if (percentageReturn > 0) {
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
          {formatToCurrencyString(netAssetValue)}
        </b>
        (
        <b
          className={
            styles[`${returnSign === "positive" ? "positive" : "negative"}`]
          }
        >
          {`${returnSign === "positive" ? "+" : "-"}${percentageReturn
            .toFixed(1)
            .toString()}`}
          %
        </b>
        )
      </div>
    </section>
  )
}

export default CashDetails
