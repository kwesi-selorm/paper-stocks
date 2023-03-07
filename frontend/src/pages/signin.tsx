import React, { useContext, useEffect, useState } from "react"
import { Button, Form, Input, message } from "antd"
import { SignInInput } from "@/utils/types"
import signIn from "../api/signin"
import { useRouter } from "next/router"
import styles from "../styles/pages/SignIn.module.css"
import Link from "next/link"
import ButtonsRow from "@/components/buttons-row"
import UserContext from "@/contexts/user-context/user-context"

const initialState = {
  username: "",
  password: ""
}

export const SignInPage: React.FC = () => {
  const [input, setInput] = useState<SignInInput>(initialState)
  const { user, setUser } = useContext(UserContext)
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (user != null && !isError) {
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      router.push(`/assets/${user.id}`).then()
      message.success("Logged in successfully").then()
    }
  }, [isError, user])

  async function handleSubmit() {
    try {
      const res = await signIn(input)
      const data = await res.data
      setUser(data)
      window.localStorage.setItem("user", JSON.stringify(data))
    } catch (error: any) {
      setIsError(true)
      if (error?.response?.status === 401) {
        return message.error("Invalid username or password")
      }
      return message.error(error?.response?.data?.message)
    }
    setIsError(false)
  }

  if (isError) {
    router.push("/signin").then()
  }

  return (
    <Form className={styles["form"]} colon={false}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please provide your username" }]}
      >
        <Input
          onChange={(e) => setInput({ ...input, username: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please provide your password" },
          {
            type: "string",
            min: 8,
            message: "Password must be at least 8 characters"
          }
        ]}
      >
        <Input.Password
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
      </Form.Item>
      <ButtonsRow>
        <Button htmlType="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Link href="/">
          <Button htmlType="button" type="primary">
            Cancel
          </Button>
        </Link>
      </ButtonsRow>
    </Form>
  )
}

export default SignInPage
