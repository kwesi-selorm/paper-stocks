import React, { useContext, useState } from "react"
import { Button, Form, Input, message } from "antd"
import { SignInInput } from "@/utils/types"
import signIn from "../api/signin"
import { useRouter } from "next/router"
import styles from "../styles/pages/SignIn.module.css"
import Link from "next/link"
import ButtonsRow from "@/components/ButtonsRow"
import UserContext from "@/contexts/user-context/user-context"
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai"

const initialState: SignInInput = {
  username: "",
  password: ""
}

export const SignInPage: React.FC = () => {
  const [input, setInput] = useState<SignInInput>(initialState)
  const { setUser } = useContext(UserContext)
  const router = useRouter()

  async function handleSubmit() {
    try {
      const data = await signIn(input)
      if (data === undefined) {
        message.error("No user data returned for your provided credentials")
        return
      }
      setUser(data)
      window.localStorage.setItem("user", JSON.stringify(data))
      await router.push(`/assets/${data.id}`)
      await message.success("Logged in successfully")
    } catch (error: any) {
      if (error?.response?.status === 401) {
        return message.error("Invalid username or password")
      }
      return message.error(error?.response?.data?.message)
    }
  }

  return (
    <Form className={styles["form"]} colon={false}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please provide your username" }]}
      >
        <Input
          bordered
          onChange={(e) => setInput({ ...input, username: e.target.value })}
          placeholder="Username"
          prefix={<AiOutlineUser />}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please provide your password" },
          {
            pattern: /.{8,}/,
            message: "Password must be at least 8 characters long"
          },
          {
            pattern: /[A-Z]/,
            message: "Password must contain at least one uppercase letter"
          },
          {
            pattern: /[a-z]/,
            message: "Password must contain at least one lowercase letter"
          },
          {
            pattern: /[0-9]/,
            message: "Password must contain at least one number"
          },
          {
            pattern: /[!@#$%^&*]/,
            message: "Password must contain at least one special character"
          }
        ]}
      >
        <Input.Password
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          placeholder="Password"
          prefix={<AiOutlineLock />}
        />
      </Form.Item>
      <ButtonsRow>
        <Button htmlType="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Link href="/">
          <Button danger htmlType="button" type="primary">
            Cancel
          </Button>
        </Link>
      </ButtonsRow>
    </Form>
  )
}

export default SignInPage
