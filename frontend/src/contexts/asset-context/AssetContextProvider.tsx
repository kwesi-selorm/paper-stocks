import React, { useMemo } from "react"
import AssetContext from "@/contexts/asset-context/asset-context"
import { AssetTableRecord } from "@/utils/types"

interface Props {
  children: React.ReactNode
}

const AssetContextProvider: React.FC<Props> = ({ children }) => {
  const [asset, setAsset] = React.useState<AssetTableRecord | null>(null)
  const [lastPrice, setLastPrice] = React.useState<number>(0)
  const [marketState, setMarketState] = React.useState<string>("")

  const value = useMemo(() => {
    return {
      asset,
      setAsset,
      lastPrice,
      setLastPrice,
      marketState,
      setMarketState
    }
  }, [asset, lastPrice, marketState])

  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
}

export default AssetContextProvider
