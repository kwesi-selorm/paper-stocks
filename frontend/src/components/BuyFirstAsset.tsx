import { Button } from "antd"
import React, { useContext } from "react"
import styles from "../styles/components/BuyFirstAsset.module.css"
import ModalContext from "@/contexts/modal-context/modal-context"

const BuyFirstAsset: React.FC = () => {
  const { setModalId, setOpen } = useContext(ModalContext)

  function handleBuyFirstAsset() {
    setOpen(true)
    setModalId("buy-first-stock")
  }

  return (
    <section className={styles["prompt"]}>
      <p>
        No assets to display.
        <br /> Let&apos;s start by buying your first stock!
      </p>
      <br />
      <Button
        htmlType="button"
        onClick={handleBuyFirstAsset}
        size="large"
        type="primary"
      >
        Buy
      </Button>
    </section>
  )
}

export default BuyFirstAsset
