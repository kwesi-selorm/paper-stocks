import React, { useEffect, useState } from "react"
import { Button, Form, Input, message } from "antd"
import { SignInInput } from "../types"
import signIn from "../api/signin"
import styles from "../styles/signin-page.module.css"
import { useNavigate } from "react-router-dom"

export const SignInPage: React.FC = () => {
  const [input, setInput] = useState<SignInInput>({
    username: "",
    password: ""
  })
  const [user, setUser] = useState<{ name: string; id: string } | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (user != null) {
      navigate(`/assets/${user.id}`)
      message.success("Logged in successfully").then()
      window.localStorage.setItem("userId", user.id)
    }
  }, [user])

  async function handleSubmit() {
    try {
      const res = await signIn(input)
      const data = await res.data
      setUser(data)
    } catch (error: any) {
      if (error.response.status === 401) {
        message.error("Invalid username or password")
      }
      message.error(error.message)
    }
  }

  return (
    <Form className={styles["signin-form"]}>
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
      <Form.Item>
        <Button htmlType="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignInPage
