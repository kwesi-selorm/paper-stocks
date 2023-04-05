import React, { useContext, useEffect, useState } from "react"
import { getAssets } from "@/api/get-assets"
import { Button, Divider, message, Spin } from "antd"
import {
  AssetTableRecord,
  GetAssetsResponse,
  LoggedInUser
} from "@/utils/types"
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
import AssetContext from "@/contexts/asset-context/asset-context"
import getMarketState from "@/api/get-market-state"

const AssetsPage: React.FC = () => {
  const router = useRouter()
  const { userId } = router.query
  const id = userId
  const { user, setUser, token, setToken } = useContext(UserContext)
  const { modalId } = useContext(ModalContext)
  const { asset, setMarketState } = useContext(AssetContext)
  const [assets, setAssets] = useState<GetAssetsResponse[]>([])
  const [tableData, setTableData] = useState<AssetTableRecord[]>([])

  // ASSETS
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["assets", id, token],
    async () => {
      if (id === undefined || token == null) return
      return getAssets(id, token)
    },
    {
      retry: 1,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  )

  useEffect(() => {
    if (data === undefined) {
      return
    }
    setAssets(data)
  }, [data])

  //MARKET STATE
  const { data: marketStateData, refetch: refetchMarketState } = useQuery(
    ["market-state", asset],
    () => {
      if (asset == null || asset.symbol === undefined) return
      return getMarketState(asset.symbol)
    },
    {
      retry: 1
    }
  )

  useEffect(() => {
    if (marketStateData === undefined) {
      return
    }
    setMarketState(marketStateData?.marketState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketStateData])

  useEffect(() => {
    const item = window.localStorage.getItem("user")
    if (item == null) return
    const storedUser: LoggedInUser | undefined = JSON.parse(item)
    if (storedUser === undefined) return
    setUser(storedUser)
    setToken(storedUser.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSignOut() {
    await router.push("/")
    message.success("You have been signed out successfully")
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
      case "buy-first-stock":
        return (
          <BuyNewStockModal
            refetch={refetch}
            refetchMarketState={refetchMarketState}
          />
        )
      case "buy-asset":
        return (
          <BuyAssetModal
            refetchAssets={refetch}
            refetchMarketState={refetchMarketState}
          />
        )
      case "sell-asset":
        return (
          <SellAssetModal
            refetchAssets={refetch}
            //refetchMarketState={refetchMarketState}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={styles["assets-page"]}>
      {renderModal()}

      <h1 className={styles["username"]}>
        {user != null && `Welcome, ${capitalizeEachWord(user.username)}`}
      </h1>

      {user != null && (
        <CashDetails assets={assets} user={user} setTableData={setTableData} />
      )}

      <Divider />
      {Boolean(assets) && assets?.length > 0 ? (
        <AssetsGraph assets={assets} />
      ) : null}

      {Boolean(assets) && assets?.length > 0 && (
        <AssetsTable assets={assets} refetch={refetch} tableData={tableData} />
      )}

      {Boolean(assets) && assets?.length == 0 && <BuyFirstAsset />}

      <Button
        htmlType={"button"}
        onClick={handleSignOut}
        size={"large"}
        style={{ marginBottom: "10rem" }}
        type={"primary"}
      >
        Sign out
      </Button>
    </div>
  )
}

export default AssetsPage
