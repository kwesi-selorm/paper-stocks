import React, { useEffect, useState } from "react"
import getAssets from "../../api/get-assets"
import { Button, message } from "antd"
import { Asset } from "@/utils/types"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/Assets.module.css"

const AssetsPage: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const router = useRouter()
  const { userId } = router.query

  useEffect(() => {
    if (!userId) {
      return
    }
    if (typeof userId === "string") {
      fetchAssets(userId).then()
    }
  }, [userId, assets])

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
    <div className={styles["assets"]}>
      <h1>Assets Page</h1>
      <h2>{userId}</h2>
      {assets &&
        assets.map((asset) => (
          <ul key={asset._id}>
            <li key={asset._id}>{asset.name}</li>
          </ul>
        ))}
      <Link href={"/"}>
        <Button htmlType={"button"}>Back to home</Button>
      </Link>
    </div>
  )
}

export default AssetsPage
