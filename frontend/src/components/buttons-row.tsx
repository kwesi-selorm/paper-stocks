import React from "react"
import styles from "../styles/components/ButtonsRow.module.css"

type Props = {
  children: React.ReactNode
}
const ButtonsRow: React.FC<Props> = ({ children }) => {
  return <div className={styles["row"]}>{children}</div>
}

export default ButtonsRow
