import { Asset, AssetTableRecord } from "@/utils/types"
import React, { useCallback } from "react"
import styles from "../styles/components/AssetsTable.module.css"
import { Table, Space } from "antd"
import { formatToCurrencyString } from "@/utils/number-utils"
import Link from "next/link"
import { ColumnsType } from "antd/es/table"

type Props = {
  assets: Asset[]
  setModalOpen: (modalOpen: boolean) => void
  setTransactionType: (transactionType: string) => void
}

const AssetsTable: React.FC<Props> = ({
  assets,
  setModalOpen,
  setTransactionType
}) => {
  const tableTitle = useCallback(() => <h3>Portfolio</h3>, [])
  const tableData: AssetTableRecord[] = assets.map((a) => ({
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
          <Link href="#" onClick={handleBuy}>
            Buy
          </Link>
          <Link href="#" onClick={handleSell}>
            Sell
          </Link>
        </Space>
      )
    }
  ]

  async function handleBuy() {
    setTransactionType("buy")
    setModalOpen(true)
  }
  function handleSell() {
    setTransactionType("sell")
    setModalOpen(true)
  }

  return (
    <Table
      className={styles["assets-table"]}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      rowKey={(record) => record._id}
      size={"large"}
      title={tableTitle}
    />
  )
}

export default AssetsTable
