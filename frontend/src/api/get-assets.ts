import { apiUrl } from "@/utils/constants"
import axios from "axios"
import { GetAssetsResponse } from "@/utils/types"

export async function getAssets(
  id: string | string[],
  token: string
): Promise<GetAssetsResponse[] | undefined> {
  let userId: string
  if (typeof id === "object") {
    userId = id[0]
  } else {
    userId = id
  }
  const axiosConfig = {
    method: "GET",
    url: `${apiUrl}/assets/get-assets/${userId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.request(axiosConfig)
  return await res.data
}
