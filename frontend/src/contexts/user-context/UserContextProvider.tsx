import UserContext from "@/contexts/user-context/user-context"
import React from "react"
import { LoggedInUser } from "@/utils/types"

type Props = {
  children: React.ReactNode
}

const UserContextProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = React.useState<LoggedInUser | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
