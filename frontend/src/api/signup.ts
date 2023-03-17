import axios from "axios"
import { apiUrl } from "@/utils/constants"
import { SignUpInput } from "@/utils/types"

export default async function signUp(input: SignUpInput) {
  const axiosConfig = {
    method: "POST",
    url: `${apiUrl}/users/signup`,
    data: {
      username: input.username,
      email: input.email,
      password: input.password,
      confirmPassword: input.confirmPassword,
      passwordClue: input.passwordClue
    } as SignUpInput,
    headers: {
      "Content-Type": "application/json"
    }
  }
  return await axios.request(axiosConfig)
}
