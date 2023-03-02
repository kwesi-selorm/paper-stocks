import { apiUrlTest } from "@/utils/constants"
import axios from "axios"

export default async function getAssets(userId: string | null) {
  if (!userId) {
    return
  }
  const axiosConfig = {
    method: "GET",
    url: `${apiUrlTest}/users/get-assets/${userId}`,
    headers: {
      "Content-Type": "application/json"
    }
  }
  return await axios.request(axiosConfig)
}
