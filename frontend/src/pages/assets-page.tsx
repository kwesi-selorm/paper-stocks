import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import getAssets from "../api/get-assets"
import { Button, message } from "antd"
import { Asset } from "../types"

const AssetsPage: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const { userId } = useParams()

  useEffect(() => {
    if (userId !== undefined) {
      fetchAssets(userId).then()
      return
    }
  }, [userId])

  async function fetchAssets(id: string) {
    try {
      const res = await getAssets(id)
      if (res !== undefined) {
        const data = await res.data
        setAssets(data)
      }
    } catch (error: any) {
      if (error.response) {
        message.error("Error fetching assets: " + error.response.data.message)
      }
      message.error(error.message)
    }
  }

  return (
    <div>
      <h1>Assets Page</h1>
      <h2>{userId}</h2>
      {assets.map((asset) => (
        <ul key={asset._id}>
          <li key={asset._id}>{asset.name}</li>
        </ul>
      ))}
      <Link to={"/"}>
        <Button htmlType={"button"}>Back to home</Button>
      </Link>
    </div>
  )
}

export default AssetsPage
