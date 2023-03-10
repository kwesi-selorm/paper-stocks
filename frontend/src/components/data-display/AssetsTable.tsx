import { Asset, AssetTableRecord } from "@/utils/types"
import React, { useCallback, useContext } from "react"
import styles from "../../styles/components/AssetsTable.module.css"
import { Table, Space, Button } from "antd"
import Link from "next/link"
import { ColumnsType } from "antd/es/table"
import ModalContext from "@/contexts/modal-context/modal-context"
import ReloadButton from "@/components/ReloadButton"

type Props = {
  assets: Asset[]
  refetch: () => void
  tableData: AssetTableRecord[]
}

const AssetsTable: React.FC<Props> = ({ assets, refetch, tableData }) => {
  const { setModalId, setOpen } = useContext(ModalContext)

  const tableTitle = useCallback(() => {
    return (
      <div>
        <h2>Portfolio</h2>
        <ReloadButton function={refetch} />
      </div>
    )
  }, [refetch])

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
    {
      title: "Average price ($)",
      dataIndex: "averagePrice",
      key: "averagePrice"
    },
    { title: "Value ($)", dataIndex: "value", key: "value" },
    { title: "Market price ($)", dataIndex: "marketPrice", key: "marketPrice" },
    {
      title: "Return",
      children: [
        {
          title: "$",
          dataIndex: "returnCurrency",
          key: "returnCurrency",
          render: (text, record) => (
            <span
              style={{
                color: Number(record.returnCurrency) >= 0 ? "green" : "red"
              }}
            >
              {record.returnCurrency}
            </span>
          ),
          sorter: (a, b) => Number(a.returnCurrency) - Number(b.returnCurrency)
        },
        {
          title: "%",
          dataIndex: "returnPercent",
          key: "returnPercent",
          render: (text, record) => (
            <span
              style={{
                color: Number(record.returnPercent) >= 0 ? "green" : "red"
              }}
            >
              {record.returnPercent}
            </span>
          ),
          sorter: (a, b) => Number(a.returnPercent) - Number(b.returnPercent)
        }
      ]
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Link href="#">Buy</Link>
          <Link href="#">Sell</Link>
        </Space>
      )
    }
  ]

  async function handleBuy() {
    setOpen(true)
    setModalId("buy-new-stock")
  }

  return (
    <>
      <Button htmlType="button" onClick={handleBuy} size="large">
        Buy new stock
      </Button>
      <Table
        className={styles["assets-table"]}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowKey={(record) => record._id}
        // size={"large"}
        title={tableTitle}
      />
    </>
  )
}

export default AssetsTable
