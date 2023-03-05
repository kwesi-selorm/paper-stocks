import { apiUrl } from "@/utils/constants"
import axios from "axios"

export async function getAssets(userId: string, token: string) {
  if (!userId) {
    return
  }
  const axiosConfig = {
    method: "GET",
    url: `${apiUrl}/users/get-assets/${userId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  return await axios.request(axiosConfig)
}
