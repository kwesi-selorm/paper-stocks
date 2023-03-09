import { Form, message, Modal, Select, Spin } from "antd"
import React, { useState } from "react"
import getListedStocks from "@/api/get-listed-stocks"
import { ListedStock } from "@/utils/types"
import { useQuery } from "react-query"
import { AxiosError } from "axios"
import BuyAssetModal from "@/components/modals/BuyAssetModal"
import BuyNewStockModal from "@/components/modals/BuyNewStockModal"

type ModalProps = {
  modalOpen: boolean
  setModalOpen: (modalOpen: boolean) => void
  transactionType: string
}

const BuySellAssetModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  transactionType
}) => {
  const handleCancel = () => {
    setModalOpen(false)
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
    ></Modal>
  )
}

export default BuySellAssetModal
