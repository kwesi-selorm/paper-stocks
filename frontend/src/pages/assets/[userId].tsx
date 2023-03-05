import React, { useEffect, useState } from "react"
import { getAssets } from "@/api/get-assets"
import { Button, Divider, message, Spin } from "antd"
import { Asset, LoggedInUser } from "@/utils/types"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/pages/Assets.module.css"
import AssetsTable from "@/components/assets-table"
import CashDetails from "@/components/cash-details"
import AssetsGraph from "@/components/assets-graph"
import BuyFirstAsset from "@/components/buy-first-asset"
import BuySellAssetModal from "@/components/buy-sell-asset-modal"
import { capitalizeEachWord } from "@/utils/word-utils"

type Props = {
  user: LoggedInUser
  setUser: (user: LoggedInUser) => void
}
let user: LoggedInUser

const AssetsPage: React.FC<Props> = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [transactionType, setTransactionType] = React.useState("")
  const router = useRouter()
  const { userId } = router.query
  const id = userId as string

  useEffect(() => {
    const userStr = window.localStorage.getItem("user") as string
    user = JSON.parse(userStr)
    if (user) {
      setIsLoading(true)
      handleFetchAssets().then()
      setIsLoading(false)
    }
  }, [id])

  async function handleFetchAssets() {
    try {
      const response = await getAssets(id, user.token)
      if (response === undefined) {
        return
      }
      const data = await response.data
      setAssets(data)
    } catch (e: any) {
      setIsError(true)
      message.error(e?.response?.data?.message)
      setIsError(false)
    }
  }

  const handleSignOut = async () => {
    window.localStorage.removeItem("user")
    message.success("You have been signed out successfully")
  }

  if (isLoading) {
    return <Spin size={"large"} />
  }

  if (isError) {
    router.push("/signin").then()
  }

  return (
    <div className={styles["assets-page"]}>
      <BuySellAssetModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        transactionType={transactionType}
      />
      <h1 className={styles["username"]}>
        {user && capitalizeEachWord(user.username)}
      </h1>
      {assets && user && <CashDetails assets={assets} user={user} />}
      <Divider />
      {assets ? <AssetsGraph assets={assets} /> : null}
      {assets ? (
        <AssetsTable
          assets={assets}
          setModalOpen={setModalOpen}
          setTransactionType={setTransactionType}
        />
      ) : (
        <BuyFirstAsset />
      )}
      <Link href={"/signin"} onClick={handleSignOut}>
        <Button htmlType={"button"} type={"primary"} size={"large"}>
          Sign out
        </Button>
      </Link>
    </div>
  )
}

export default AssetsPage
