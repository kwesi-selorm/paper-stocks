import React, { useEffect, useState } from "react"
import { getAssets } from "@/api/get-assets"
import { Button } from "antd"
import { Asset, LoggedInUser } from "@/utils/types"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/pages/Assets.module.css"
import AssetTable from "@/components/asset-table"

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
    <div className={styles["assets-page"]}>
      <h1>{user?.username}</h1>
      {assets && <AssetTable assets={assets} />}
      <Link href={"/"}>
        <Button htmlType={"button"} type={"primary"}>
          Back to home
        </Button>
      </Link>
    </div>
  )
}

export default AssetsPage
