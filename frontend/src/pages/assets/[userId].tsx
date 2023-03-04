import React, { useEffect, useState } from "react"
import { getAssets } from "@/api/get-assets"
import { Button, Spin } from "antd"
import { Asset, LoggedInUser } from "@/utils/types"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/pages/Assets.module.css"
import AssetsTable from "@/components/assets-table"
import CashDetails from "@/components/cash-details"

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
    return <Spin size={"large"} />
  }

  return (
    <div className={styles["assets-page"]}>
      <h1 className={styles["username"]}>{user?.username}</h1>
      {assets && user && <CashDetails assets={assets} user={user} />}
      {assets && <AssetsTable assets={assets} />}
      <Link href={"/"}>
        <Button htmlType={"button"} type={"primary"}>
          Back to home
        </Button>
      </Link>
    </div>
  )
}

export default AssetsPage
