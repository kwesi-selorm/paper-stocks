import React from "react"
import { AxiosError } from "axios"
import { Button } from "antd"
import { Link } from "react-router-dom"

interface ErrorPageProps {
  error: any
}
const ErrorPage = ({ error }: ErrorPageProps) => {
  function getErrorMessage(error: any) {
    if (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          return "Invalid username or password, please try again"
        }
        return JSON.stringify(error.message)
      }
      return error.message
    }
  }
  return (
    <div>
      <h1>Oops! Something went wrong</h1>
      <h4>{getErrorMessage(error)}</h4>
      <Link to="/">
        <Button type="primary">Back to Home</Button>
      </Link>
    </div>
  )
}

export default ErrorPage
