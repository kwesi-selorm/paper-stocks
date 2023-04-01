import axios from "axios"
import { apiUrl } from "@/utils/constants"
import { SignInInput } from "@/utils/types"

interface SignInResponse {
  id: string
  username: string
  token: string
  buyingPower: number
}

export default async function signIn(
  input: SignInInput
): Promise<SignInResponse | undefined> {
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
  const response = await axios.request(axiosConfig)
  return await response.data
}
