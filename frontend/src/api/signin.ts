import axios from "axios"
import { apiUrl } from "@/utils/constants"
import { SignInInput } from "@/utils/types"

export default async function signIn(input: SignInInput) {
  const axiosConfig = {
    method: "POST",
    url: `${apiUrl}/users/signin`,
    data: {
      username: input.username,
      password: input.password
    },
    headers: {
      "Content-Type": "application/json"
    }
  }
  return await axios.request(axiosConfig)
}
