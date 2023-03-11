import axios from "axios"
import { apiUrl } from "@/utils/constants"

type Data = {
  symbol: string
  positionsSold: number
  unitPrice: number
}

export default async function sellAsset(
  data: Data,
  userId: string | null,
  token: string | null
) {
  if (!userId || !token) return

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  await axios.post(`${apiUrl}/users/sell-asset/${userId}`, data, axiosConfig)
}
