import { Asset } from "@/utils/types"
import React from "react"
import styles from "../styles/components/AssetsTable.module.css"
import { Table } from "antd"
import { formatToCurrencyString } from "@/utils/number-utils"

type Props = {
  assets: Asset[]
}

const AssetTable: React.FC<Props> = ({ assets }) => {
  const dataSource = assets.map((a) => ({
    ...a,
    averagePrice: formatToCurrencyString(a.averagePrice),
    value: formatToCurrencyString(a.position * a.averagePrice)
  }))
  const columns = [
    { title: "Stock", dataIndex: "name", key: "name" },
    { title: "Position", dataIndex: "position", key: "position" },
    { title: "Average ($)", dataIndex: "averagePrice", key: "averagePrice" },
    { title: "Value ($)", dataIndex: "value", key: "value" }
  ]

  return (
    <Table
      className={styles["assets-table"]}
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default AssetTable
