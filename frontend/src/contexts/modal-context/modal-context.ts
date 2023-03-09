import React, { Dispatch, SetStateAction } from "react"

type IModalContext = {
  modalId: string
  setModalId: Dispatch<SetStateAction<string>>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const initialDefaultState: IModalContext = {
  modalId: "",
  setModalId: () => console.log("setModalId"),
  open: false,
  setOpen: () => console.log("setOpen")
}

const ModalContext = React.createContext<IModalContext>(initialDefaultState)

export default ModalContext
