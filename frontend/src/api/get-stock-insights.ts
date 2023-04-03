import axios, { AxiosRequestConfig } from "axios"
import { apiUrl } from "@/utils/constants"
import { StockInsights } from "@/utils/types"

export default async function getStockInsights(
  symbol: string
): Promise<StockInsights | undefined> {
  const axiosConfig: AxiosRequestConfig = {
    data: { symbol },
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    url: `${apiUrl}/stocks/insights`
  }

  const response = await axios.request(axiosConfig)
  return await response.data
}
