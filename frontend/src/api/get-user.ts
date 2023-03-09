import { apiUrl } from "@/utils/constants"
import axios from "axios"
import { LoggedInUser } from "@/utils/types"

export default async function getUser(
  userId: string | null,
  token: string | null
): Promise<LoggedInUser | undefined> {
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
