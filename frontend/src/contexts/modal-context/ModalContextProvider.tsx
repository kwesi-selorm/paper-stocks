import React, { useMemo, useState } from "react"
import ModalContext from "@/contexts/modal-context/modal-context"

type ModalProps = {
  children: React.ReactNode
}

const ModalContextProvider: React.FC<ModalProps> = ({ children }) => {
  const [modalId, setModalId] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)

  const value = useMemo(() => {
    return { modalId, setModalId, open, setOpen }
  }, [modalId, open])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalContextProvider
