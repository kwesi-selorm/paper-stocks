import React, { useEffect, useState } from "react"
import { getAssets } from "@/api/get-assets"
import { Button } from "antd"
import { Asset, LoggedInUser } from "@/utils/types"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/Assets.module.css"

type Props = {
  user: LoggedInUser
  setUser: (user: LoggedInUser) => void
}
let user: LoggedInUser

const AssetsPage: React.FC<Props> = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { userId } = router.query
  const id = userId as string

  useEffect(() => {
    const userStr = window.localStorage.getItem("user") as string
    user = JSON.parse(userStr)
    if (user) {
      setIsLoading(true)
      getAssets(id, user.token).then((data) => setAssets(data))
      setIsLoading(false)
    }
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles["assets"]}>
      <h1>{user?.username}</h1>
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
