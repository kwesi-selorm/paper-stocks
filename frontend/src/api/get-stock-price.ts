import { apiUrl } from "@/utils/constants"
import axios from "axios"
import { GetStockPriceResponse } from "@/utils/types"
import { symbol } from "prop-types"

export default async function getStockPrice(
  id: string | string[],
  token: string,
  symbols: string[]
): Promise<GetStockPriceResponse[] | undefined> {
  let userId: string
  if (typeof id === "object") {
    userId = id[0]
  } else {
    userId = id
  }

  if (symbols.length === 1 && (symbols[0] === "" || symbols[0] == null)) return

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
