import { Asset, LoggedInUser } from "@/utils/types"
import React from "react"
import { formatToCurrencyString } from "@/utils/number-utils"
import styles from "../styles/components/CashDetails.module.css"
import { Divider } from "antd"

type RowProps = {
  assets: Asset[]
  user: LoggedInUser
}

type ItemProps = {
  text: string
  value: string
}

const RowItem: React.FC<ItemProps> = ({ text, value }) => {
  return (
    <div>
      {text}: <b className={styles["value"]}>{value}</b>
    </div>
  )
}

const CashDetails: React.FC<RowProps> = ({ assets, user }) => {
  const netAssetValue = assets.reduce((total, asset) => {
    return total + asset.averagePrice * asset.position
  }, 0)

  return (
    <section className={styles["cash-details-row"]}>
      <RowItem
        text="Purchasing Power"
        value={formatToCurrencyString(user.buyingPower)}
      />
      <Divider type="vertical" />
      <RowItem
        text="Net Asset Value"
        value={formatToCurrencyString(netAssetValue)}
      />
    </section>
  )
}

export default CashDetails
