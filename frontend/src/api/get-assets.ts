import { apiUrlTest } from "../utils/api"
import axios from "axios"

export default async function getAssets(userId: string | null) {
  if (!userId) {
    return
  }
  const axiosConfig = {
    method: "GET",
    url: `${apiUrlTest}/users/get-assets/${userId}`,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "max-age=60*60*1000"
    }
  }
  return await axios.request(axiosConfig)
}
