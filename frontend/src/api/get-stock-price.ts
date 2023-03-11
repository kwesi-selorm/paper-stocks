import { apiUrl } from "@/utils/constants"
import axios from "axios"

export default async function getStockPrice(
  userId: string,
  token: string | null,
  symbols: string[]
) {
  if (!token) return

  const axiosConfig = {
    data: { symbols },
    url: `${apiUrl}/stocks/stock-price/${userId}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.request(axiosConfig)
  return await response.data
}
