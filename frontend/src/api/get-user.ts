import { apiUrl } from "@/utils/constants"
import axios from "axios"
import { LoggedInUser } from "@/utils/types"

export default async function getUser(
  id: string | string[],
  token: string
): Promise<LoggedInUser | undefined> {
  let userId: string
  if (typeof id === "object") {
    userId = id[0]
  } else {
    userId = id
  }

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }
  if (!userId || !token) return
  const response = await axios.get(
    `${apiUrl}/users/get-user/${userId}`,
    axiosConfig
  )
  return await response.data
}
