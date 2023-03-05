import { Modal } from "antd"
import React from "react"

type Props = {
  modalOpen: boolean
  setModalOpen: (modalOpen: boolean) => void
  transactionType: string
}

const BuySellAssetModal: React.FC<Props> = ({
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
    >
      Buy/sell asset contents here
    </Modal>
  )
}

export default BuySellAssetModal
