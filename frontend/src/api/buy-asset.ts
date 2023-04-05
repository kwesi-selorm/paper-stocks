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
  id: string | string[],
  token: string
): Promise<{ symbol: string; position: number } | undefined> {
  let userId: string
  if (typeof id === "object") {
    userId = id[0]
  } else {
    userId = id
  }

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(
    `${apiUrl}/users/buy-asset/${userId}`,
    data,
    axiosConfig
  )
  return await response.data
}
