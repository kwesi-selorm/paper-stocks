import { Form, message, Modal, Select, Spin } from "antd"
import React, { useState } from "react"
import getListedStocks from "@/api/get-listed-stocks"
import { ListedStock } from "@/utils/types"
import { useQuery } from "react-query"
import { AxiosError } from "axios"

type ModalProps = {
  modalOpen: boolean
  setModalOpen: (modalOpen: boolean) => void
  transactionType: string
}

type ContentProps = {
  listedStocks: Array<ListedStock>
}

const BuySellAssetModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  transactionType
}) => {
  const [listedStocks, setListedStocks] = useState<Array<ListedStock>>([])
  const { error, isLoading, isError } = useQuery(
    ["listedStocks"],
    getListedStocks,
    {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onSuccess: (data) => {
        if (data) {
          setListedStocks(data.listedStocks)
        }
      }
    }
  )

  const handleCancel = () => {
    setModalOpen(false)
  }

  if (isLoading) {
    return <Spin />
  }

  if (isError) {
    if (error instanceof AxiosError) {
      message.error(error?.response?.data.message).then()
    }
    message.error(JSON.stringify(error)).then()
  }

  return (
    <Modal
      centered={true}
      keyboard={true}
      mask={true}
      maskClosable={true}
      okButtonProps={{
        danger: transactionType === "sell",
        htmlType: "submit"
      }}
      okText={transactionType === "buy" ? "Buy" : "Sell"}
      open={modalOpen}
      onCancel={handleCancel}
    >
      <ModalContent listedStocks={listedStocks} />
    </Modal>
  )
}

const ModalContent: React.FC<ContentProps> = ({ listedStocks }) => {
  const stockOptions = listedStocks.map((listedStock) => {
    return {
      value: listedStock.symbol,
      label: listedStock.name
    }
  })

  return (
    <Form>
      <Select
        allowClear
        bordered
        placeholder="Select a stock"
        options={stockOptions}
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
        }
        showSearch
        style={{ width: 250 }}
      />
    </Form>
  )
}

export default BuySellAssetModal
