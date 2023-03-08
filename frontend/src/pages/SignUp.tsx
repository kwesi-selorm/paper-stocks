import React, { useState } from "react"
import { SignUpInput } from "@/utils/types"
import { Button, Form, Input, message } from "antd"
import ButtonsRow from "@/components/ButtonsRow"
import Link from "next/link"
import styles from "../styles/pages/SignUp.module.css"
import signUp from "@/api/signup"
import { useRouter } from "next/router"

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  passwordClue: ""
}

const SignUp: React.FC = () => {
  const [values, setValues] = useState<SignUpInput>(initialValues)
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  async function handleSubmit(
    e: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    try {
      await signUp(values)
      message.success("Sign up successful, redirecting now to the signin page")
      router.push("/SignIn").then()
    } catch (error: any) {
      console.error(error)
      setIsError(true)
      if (error?.response?.status === 400) {
        return message.error(error?.response?.data?.message)
      }
      return message.error(error.message)
    } finally {
      setIsError(false)
    }
  }

  if (isError) {
    router.push("/signin").then()
  }

  return (
    <Form
      className={styles["form"]}
      colon={false}
      layout="vertical"
      requiredMark
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please provide a username" }]}
      >
        <Input
          onChange={(e) => setValues({ ...values, username: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please provide a password" },
          {
            type: "string",
            min: 8,
            message: "Password must be at least 8 characters"
          }
        ]}
      >
        <Input.Password
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: "Please confirm your password" }]}
      >
        <Input
          onChange={(e) =>
            setValues({ ...values, confirmPassword: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Password Clue" name="passwordClue">
        <Input
          onChange={(e) =>
            setValues({ ...values, passwordClue: e.target.value })
          }
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

export default SignUp
