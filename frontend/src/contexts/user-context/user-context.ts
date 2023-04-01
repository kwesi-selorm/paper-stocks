import { LoggedInUser } from "@/utils/types"
import React, { Dispatch, SetStateAction } from "react"

type IUserContext = {
  user: LoggedInUser | null
  setUser: Dispatch<SetStateAction<LoggedInUser | null>>
  token: string | undefined
  setToken: Dispatch<SetStateAction<string | undefined>>
}

const initialDefaultState: IUserContext = {
  user: null,
  setUser: () => {
    console.log("New user set")
  },
  token: "",
  setToken: () => {
    console.log("New token set")
  }
}

const UserContext = React.createContext<IUserContext>(initialDefaultState)
export default UserContext
