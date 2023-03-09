import axios from "axios"
import { apiUrl } from "@/utils/constants"

type Data = {
  symbol: string
  name: string
  position: number
  amountInvested: number
}

export default async function buyAsset(
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

  await axios.post(`${apiUrl}/users/buy-asset/${userId}`, data, axiosConfig)
}
