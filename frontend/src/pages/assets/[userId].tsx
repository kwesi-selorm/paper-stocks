import React, { useEffect, useState } from "react"
import { getAssets } from "@/api/get-assets"
import { Button } from "antd"
import { Asset } from "@/utils/types"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/Assets.module.css"

const AssetsPage: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { userId } = router.query
  const id = userId as string

  useEffect(() => {
    getAssets(id, setIsLoading).then((data) => setAssets(data))
    console.log(assets)
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles["assets"]}>
      <h1>Assets Page</h1>
      <h4>{userId}</h4>
      {assets &&
        assets.map((asset) => (
          <ul key={asset._id}>
            <li key={asset._id}>{asset.name}</li>
          </ul>
        ))}
      <Link href={"/"}>
        <Button htmlType={"button"} type={"primary"}>
          Back to home
        </Button>
      </Link>
    </div>
  )
}

export default AssetsPage
