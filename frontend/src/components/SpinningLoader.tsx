import React from "react"
import { AiOutlineLoading } from "react-icons/ai"
import styles from "../styles/components/SpinningLoader.module.css"

const SpinningLoader = (): JSX.Element => {
  return (
    <div className={styles["container"]}>
      <AiOutlineLoading className={styles["spinner"]} />
      <p>Loading...</p>
    </div>
  )
}

export default SpinningLoader
