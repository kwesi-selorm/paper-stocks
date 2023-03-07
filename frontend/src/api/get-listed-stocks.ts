import { apiUrl } from "@/utils/constants"
import axios from "axios"

export default async function getListedStocks() {
  const axiosConfig = {
    method: "GET",
    url: `${apiUrl}/stocks/nasdaq/all`,
    headers: {
      "Content-Type": "application/json"
    }
  }
  const response = await axios.request(axiosConfig)
  return await response.data
}
