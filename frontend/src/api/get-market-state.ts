import axios, { AxiosRequestConfig } from "axios"
import { apiUrl } from "@/utils/constants"
import { GetMarketStateResponse } from "@/utils/types"

export default async function getMarketState(
  symbol = "AAPL"
): Promise<GetMarketStateResponse | undefined> {
  const data = { symbol }
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const response = await axios.post(
    `${apiUrl}/stocks/market-state`,
    data,
    axiosConfig
  )
  return await response.data
}
