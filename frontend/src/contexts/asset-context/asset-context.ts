import { AssetTableRecord } from "@/utils/types"
import React, { Dispatch, SetStateAction } from "react"

interface IAssetContext {
  asset: AssetTableRecord | null
  setAsset: Dispatch<SetStateAction<AssetTableRecord | null>>
  lastPrice: number
  setLastPrice: Dispatch<SetStateAction<number>>
  marketState: string
  setMarketState: Dispatch<SetStateAction<string>>
}

const initialAssetContextValue: IAssetContext = {
  asset: null,
  setAsset: () => {
    console.log("New asset selected")
  },
  lastPrice: 0,
  setLastPrice: () => {
    console.log("New last price selected")
  },
  marketState: "",
  setMarketState: () => {
    console.log("New market status selected")
  }
}

const AssetContext = React.createContext<IAssetContext>(
  initialAssetContextValue
)
export default AssetContext
