import React, { useContext, useEffect, useState } from "react"
import { getAssets } from "@/api/get-assets"
import { Button, Divider, message, Spin } from "antd"
import { Asset, AssetTableRecord } from "@/utils/types"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/pages/Assets.module.css"
import AssetsTable from "@/components/data-display/AssetsTable"
import CashDetails from "@/components/CashDetails"
import AssetsGraph from "@/components/data-display/AssetsGraph"
import BuyFirstAsset from "@/components/BuyFirstAsset"
import { capitalizeEachWord } from "@/utils/word-utils"
import UserContext from "@/contexts/user-context/user-context"
import { useQuery } from "react-query"
import { AxiosError } from "axios"
import BuyNewStockModal from "@/components/modals/BuyNewStockModal"
import BuyAssetModal from "@/components/modals/BuyAssetModal"
import SellAssetModal from "@/components/modals/SellAssetModal"
import ModalContext from "@/contexts/modal-context/modal-context"

const AssetsPage: React.FC = () => {
  const router = useRouter()
  const { userId } = router.query
  const id = userId as string
  const { user, setUser, token, setToken } = useContext(UserContext)
  const { modalId } = useContext(ModalContext)

  // Assets
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["assets", id, token],
    async () => {
      if (!token) return
      getAssets(id, token).then((data) => setAssets(data))
    },
    {
      retry: 1,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  )
  const [assets, setAssets] = useState<Asset[]>([])
  const [tableData, setTableData] = useState<AssetTableRecord[]>([])

  useEffect(() => {
    const item = window.localStorage.getItem("user") as string
    const storedUser = JSON.parse(item)
    setUser(storedUser)
    setToken(storedUser.token)

    if (!data) return
    setAssets(data)
  }, [data])

  const handleSignOut = async () => {
    setTimeout(
      () => message.success("You have been signed out successfully"),
      1000
    )
    setUser(null)
  }

  if (isError) {
    if (error instanceof AxiosError) {
      message
        .error(error?.response?.data.message)
        .then(() => router.push("/signin"))
      return null
    }
    message.error(JSON.stringify(error)).then(() => router.push("/signin"))
    return null
  }

  if (isLoading) {
    return <Spin />
  }

  function renderModal() {
    switch (modalId) {
      case "buy-new-stock":
        return <BuyNewStockModal refetch={refetch} />
      case "buy-first-stock":
        return <BuyNewStockModal refetch={refetch} />
      case "buy-asset":
        return <BuyAssetModal refetchAssets={refetch} />
      case "sell-asset":
        return <SellAssetModal refetchAssets={refetch} />
      default:
        return null
    }
  }

  return (
    <div className={styles["assets-page"]}>
      {renderModal()}

      <h1 className={styles["username"]}>
        {user && `Welcome, ${capitalizeEachWord(user.username)}`}
      </h1>

      {assets && user && (
        <CashDetails assets={assets} user={user} setTableData={setTableData} />
      )}

      <Divider />
      {assets && assets.length > 0 ? <AssetsGraph assets={assets} /> : null}

      {assets && (
        <AssetsTable assets={assets} refetch={refetch} tableData={tableData} />
      )}

      {assets && assets.length == 0 && <BuyFirstAsset />}

      <Link href={"/SignIn"} onClick={handleSignOut}>
        <Button
          htmlType={"button"}
          size={"large"}
          style={{ marginBottom: "10rem" }}
          type={"primary"}
        >
          Sign out
        </Button>
      </Link>
    </div>
  )
}

export default AssetsPage
