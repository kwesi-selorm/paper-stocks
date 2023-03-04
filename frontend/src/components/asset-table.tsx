import { Asset, AssetTableRecord } from "@/utils/types"
import React from "react"
import styles from "../styles/components/AssetsTable.module.css"
import { Table, Space } from "antd"
import { formatToCurrencyString } from "@/utils/number-utils"
import Link from "next/link"
import { ColumnsType } from "antd/es/table"

type Props = {
  assets: Asset[]
}

const AssetTable: React.FC<Props> = ({ assets }) => {
  const data: AssetTableRecord[] = assets.map((a) => ({
    ...a,
    averagePrice: formatToCurrencyString(a.averagePrice),
    value: formatToCurrencyString(a.position * a.averagePrice)
  }))

  const columns: ColumnsType<AssetTableRecord> = [
    {
      title: "Stock",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <b>{text}</b>
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
      dataSource={data}
      columns={columns}
      size={"middle"}
      pagination={false}
      rowKey={(record) => record._id}
      footer={() => "Footer"}
    />
  )
}

export default AssetTable
