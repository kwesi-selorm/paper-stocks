import UserContext from "@/contexts/user-context/user-context"
import React, { useMemo } from "react"
import { LoggedInUser } from "@/utils/types"

type Props = {
  children: React.ReactNode
}

const UserContextProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = React.useState<LoggedInUser | null>(null)
  const [token, setToken] = React.useState<string | null>(null)

  const value = useMemo(
    () => ({ user, setUser, token, setToken }),
    [token, user]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContextProvider
