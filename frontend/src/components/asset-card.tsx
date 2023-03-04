import { Asset } from "@/utils/types"
import React from "react"
import styles from "../styles/components/AssetCard.module.css"

type Props = {
  asset: Asset
}

const AssetCard: React.FC<Props> = ({ asset }) => {
  return (
    <div className={styles["asset-card"]}>
      <div>{asset.name}</div>
      <div>{asset.position}</div>
      <div>{asset.averagePrice}</div>
      <div>{asset.position * asset.averagePrice}</div>
    </div>
  )
}

export default AssetCard
