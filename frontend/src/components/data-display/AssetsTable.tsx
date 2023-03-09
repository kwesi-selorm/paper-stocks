import { Asset, AssetTableRecord } from "@/utils/types"
import React, { useCallback, useContext } from "react"
import styles from "../../styles/components/AssetsTable.module.css"
import { Table, Space, Button } from "antd"
import { formatToCurrencyString } from "@/utils/number-utils"
import Link from "next/link"
import { ColumnsType } from "antd/es/table"
import ModalContext from "@/contexts/modal-context/modal-context"
import ReloadButton from "@/components/ReloadButton"

type Props = {
  assets: Asset[]
  refetch: () => void
}

const AssetsTable: React.FC<Props> = ({ assets, refetch }) => {
  const { setModalId, setOpen } = useContext(ModalContext)

  const tableTitle = useCallback(() => {
    return (
      <div>
        <h2>Portfolio</h2>
        <ReloadButton function={refetch} />
      </div>
    )
  }, [])
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
        size={"large"}
        title={tableTitle}
      />
    </>
  )
}

export default AssetsTable
