import React, { useEffect, useState } from "react"
import { Button, Form, Input, message } from "antd"
import { SignInInput } from "@/utils/types"
import signIn from "../api/signin"
import { useRouter } from "next/router"
import styles from "../styles/pages/SignIn.module.css"
import Link from "next/link"
import ButtonsRow from "@/components/buttons-row"

const initialState = {
  username: "",
  password: ""
}

export const SignInPage: React.FC = () => {
  const [input, setInput] = useState<SignInInput>(initialState)
  const [user, setUser] = useState<{ name: string; id: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (user != null) {
      router.push(`/assets/${user.id}`).then()
      message.success("Logged in successfully").then()
    }
  }, [router, user])

  async function handleSubmit() {
    try {
      const res = await signIn(input)
      const data = await res.data
      setUser(data)
      window.localStorage.setItem("user", JSON.stringify(data))
    } catch (error: any) {
      console.log(error)
      if (error?.response?.status === 401) {
        message.error("Invalid username or password")
      }
      if (error?.response?.status === 400) {
        message.error(error?.response?.data?.message)
      }
      message.error(error.message)
    }
  }

  return (
    <Form className={styles["form"]}>
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
