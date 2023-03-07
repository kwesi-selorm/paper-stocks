import { LoggedInUser } from "@/utils/types"
import React from "react"

type IUserContext = {
  user: LoggedInUser | null
  setUser: (user: LoggedInUser | null) => void
}

const initialDefaultState: IUserContext = {
  user: null,
  setUser: (user: LoggedInUser | null) => {
    console.log("New user set")
  }
}

const UserContext = React.createContext<IUserContext>(initialDefaultState)
export default UserContext
