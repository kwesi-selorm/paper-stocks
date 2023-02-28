import axios from "axios"
import { apiUrlTest } from "../utils/api"
import { SignInInput } from "../types"

export default async function signIn(input: SignInInput) {
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
  return await axios.request(axiosConfig)
}
