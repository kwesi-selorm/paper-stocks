import { Button } from "antd"
import Link from "next/link"
import React from "react"
import styles from "../styles/pages/Home.module.css"

export default function Home() {
  return (
    <div className={styles["main"]}>
      <h1>Paper Stocks</h1>
      <Link href="/signin">
        <Button type={"primary"} size={"large"}>
          Sign in
        </Button>
      </Link>
    </div>
  )
}
