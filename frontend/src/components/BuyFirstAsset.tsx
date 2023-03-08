import { Button } from "antd"
import React from "react"
import styles from "../styles/components/BuyFirstAsset.module.css"

const BuyFirstAsset: React.FC = () => {
  return (
    <section className={styles["prompt"]}>
      <p>
        No assets to display.
        <br /> Let&apos;s start by buying your first stock!
      </p>
      <Button
        type={"primary"}
        size={"large"}
        onClick={() => alert("show buy stock modal")}
      >
        Buy
      </Button>
    </section>
  )
}

export default BuyFirstAsset
