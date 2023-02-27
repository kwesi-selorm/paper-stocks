import React from "react"
import { Button } from "antd"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Paper Stocks application</h1>
      <Link to={"/signin"}>
        <Button type={"primary"} size={"large"}>
          Sign in
        </Button>
      </Link>
    </div>
  )
}

export default HomePage
