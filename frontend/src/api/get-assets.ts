import { apiUrlTest } from "@/utils/constants"
import axios from "axios"
import { message } from "antd"

export async function getAssets(userId: string, token: string) {
  if (!userId) {
    return
  }
  const axiosConfig = {
    method: "GET",
    url: `${apiUrlTest}/users/get-assets/${userId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const res = await axios.request(axiosConfig)
    if (res !== undefined) {
      return await res.data
    }
  } catch (error: any) {
    if (error.response) {
      message.error("Error fetching assets: " + error.response.data.message)
    }
    message.error(error.message)
  }
}
