import React, { useContext, useEffect, useState } from "react"
import { getAssets } from "@/api/get-assets"
import { Button, Divider, message, Spin } from "antd"
import { Asset } from "@/utils/types"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/pages/Assets.module.css"
import AssetsTable from "@/components/assets-table"
import CashDetails from "@/components/cash-details"
import AssetsGraph from "@/components/assets-graph"
import BuyFirstAsset from "@/components/buy-first-asset"
import BuySellAssetModal from "@/components/buy-sell-asset-modal"
import { capitalizeEachWord } from "@/utils/word-utils"
import UserContext from "@/contexts/user-context/user-context"
import { useQuery } from "react-query"
import { AxiosError } from "axios"

const AssetsPage: React.FC = () => {
  const [token, setToken] = useState("")
  const router = useRouter()
  const { userId } = router.query
  const id = userId as string

  const { data, error, isLoading, isError } = useQuery(
    ["assets", id, token],
    () => getAssets(id, token),
    {
      retry: false,
      retryOnMount: false
    }
  )
  const [assets, setAssets] = useState<Asset[]>([])
  const { user, setUser } = useContext(UserContext)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [transactionType, setTransactionType] = React.useState("")

  useEffect(() => {
    const item = window.localStorage.getItem("user") as string
    const storedUser = JSON.parse(item)
    setUser(storedUser)
    setToken(storedUser.token)

    if (!data) return
    setAssets(data)
  }, [data])

  const handleSignOut = async () => {
    message.success("You have been signed out successfully")
    setUser(null)
  }

  if (isError) {
    if (error instanceof AxiosError) {
      message
        .error(error?.response?.data.message)
        .then(() => router.push("/signin"))
    }
    message.error(JSON.stringify(error)).then(() => router.push("/signin"))
  }

  if (isLoading) {
    return <Spin />
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
