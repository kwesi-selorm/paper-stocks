import { Asset, AssetTableRecord } from "@/utils/types"
import React, { useCallback } from "react"
import styles from "../styles/components/AssetsTable.module.css"
import { Table, Space } from "antd"
import { formatToCurrencyString } from "@/utils/number-utils"
import Link from "next/link"
import { ColumnsType } from "antd/es/table"

type Props = {
  assets: Asset[]
}

const AssetsTable: React.FC<Props> = ({ assets }) => {
  const tableTitle = useCallback(() => <h1>Portfolio</h1>, [])

  const data: AssetTableRecord[] = assets.map((a) => ({
    ...a,
    averagePrice: formatToCurrencyString(a.averagePrice),
    value: formatToCurrencyString(a.position * a.averagePrice)
  }))

  const columns: ColumnsType<AssetTableRecord> = [
    {
      title: `Assets (${assets.length})`,
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      sorter: (a, b) => a.position - b.position
    },
    { title: "Average ($)", dataIndex: "averagePrice", key: "averagePrice" },
    { title: "Value ($)", dataIndex: "value", key: "value" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Link href="">Buy</Link>
          <Link href="">Sell</Link>
        </Space>
      )
    }
  ]

  return (
    <Table
      className={styles["assets-table"]}
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey={(record) => record._id}
      size={"large"}
      title={tableTitle}
    />
  )
}

export default AssetsTable
