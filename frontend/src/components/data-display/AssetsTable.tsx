import { AssetTableRecord, GetAssetsResponse } from "@/utils/types"
import React, { useCallback, useContext } from "react"
import styles from "../../styles/components/AssetsTable.module.css"
import { Table, Button } from "antd"
import { ColumnsType } from "antd/es/table"
import ModalContext from "@/contexts/modal-context/modal-context"
import ReloadButton from "@/components/ReloadButton"
import AssetContext from "@/contexts/asset-context/asset-context"

type Props = {
  assets: GetAssetsResponse[]
  refetch: () => void
  tableData: AssetTableRecord[]
}

const AssetsTable = ({ assets, refetch, tableData }: Props) => {
  const { setModalId, setOpen } = useContext(ModalContext)
  const { setAsset } = useContext(AssetContext)

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
      title: "Average",
      dataIndex: "averagePrice",
      key: "averagePrice"
    },
    { title: "Value", dataIndex: "value", key: "value" },
    {
      title: "Market",
      dataIndex: "marketPrice",
      key: "marketPrice"
    },
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
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            htmlType="button"
            onClick={() => handleOnBuyAsset(record)}
            type="primary"
          >
            Buy
          </Button>
          <Button
            danger
            htmlType="button"
            onClick={() => handleOnSellAsset(record)}
            type="primary"
          >
            Sell
          </Button>
        </div>
      )
    }
  ]

  async function handleOnBuyAsset(record: AssetTableRecord) {
    setAsset(record)
    setOpen(true)
    setModalId("buy-asset")
  }

  async function handleOnSellAsset(record: AssetTableRecord) {
    setAsset(record)
    setOpen(true)
    setModalId("sell-asset")
  }

  async function handleOnBuyNewStock() {
    setOpen(true)
    setModalId("buy-new-stock")
  }

  return (
    <section className={styles["assets-table"]}>
      <Button htmlType="button" onClick={handleOnBuyNewStock} size="large">
        Buy new stock
      </Button>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowKey={(record) => record._id}
        tableLayout="auto"
        title={tableTitle}
      />
    </section>
  )
}

export default AssetsTable
