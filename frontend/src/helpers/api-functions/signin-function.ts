import axios from "axios"
import { apiUrlTest } from "../../utils/api"
import { SigninInput } from "../../types"

export default async function signIn(input: SigninInput) {
  const axiosConfig = {
    method: "POST",
    url: `${apiUrlTest}/users/signin`,
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
