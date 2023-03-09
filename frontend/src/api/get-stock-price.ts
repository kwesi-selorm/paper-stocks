import { apiUrl } from "@/utils/constants"
import axios from "axios"

export default async function getStockPrice(
  userId: string,
  token: string | null,
  symbol: string
) {
  if (!token) return

  const axiosConfig = {
    data: { tickers: [symbol] },
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
