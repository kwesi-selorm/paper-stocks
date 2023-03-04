import { Asset, LoggedInUser } from "@/utils/types"
import React from "react"
import { formatToCurrencyString } from "@/utils/number-utils"
import styles from "../styles/components/CashDetails.module.css"

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
      <b>{text}</b>: {value}
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
      <RowItem
        text="Net Assets"
        value={formatToCurrencyString(netAssetValue)}
      />
    </section>
  )
}

export default CashDetails
