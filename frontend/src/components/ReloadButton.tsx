import { TfiReload } from "react-icons/tfi"
import React from "react"
import styles from "../styles/components/ReloadButton.module.css"

type ReloadButtonProps = {
  function: () => void
}

const ReloadButton: React.FC<ReloadButtonProps> = (props) => {
  return (
    <TfiReload
      className={styles["reload-button"]}
      fill="green"
      onClick={async () => props.function()}
    />
  )
}
export default ReloadButton
