import React from "react"
import { Button, Form, Input, message } from "antd"
import { SigninInput } from "../types"
import { useQuery } from "react-query"
import signIn from "../helpers/api-functions/signin-function"
import ErrorPage from "./error-page"
import styles from "../styles/signin-page.module.css"

const initialInputs = { username: "", password: "" }

export const SignInPage: React.FC = () => {
  const [input, setInput] = React.useState<SigninInput>(initialInputs)
  const { isLoading, isError, error, data, refetch } = useQuery(
    ["signin", input],
    () => signIn(input),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: () => {
        message.success("Logged in successfully").then()
      }
    }
  )

  async function handleSubmit() {
    await refetch()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    message.error("Login failed").then()
    return <ErrorPage error={error} />
  }

  return (
    <Form className={styles["signin-form"]} onFinish={handleSubmit}>
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
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignInPage
