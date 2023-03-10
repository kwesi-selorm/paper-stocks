import { AssetTableRecord } from "@/utils/types"
import React, { Dispatch, SetStateAction } from "react"

interface IAssetContext {
  asset: AssetTableRecord | null
  setAsset: Dispatch<SetStateAction<AssetTableRecord | null>>
  lastPrice: number
  setLastPrice: Dispatch<SetStateAction<number>>
}

const initialAssetContextValue: IAssetContext = {
  asset: null,
  setAsset: () => {
    console.log("New asset selected")
  },
  lastPrice: 0,
  setLastPrice: () => {
    console.log("New last price selected")
  }
}

const AssetContext = React.createContext<IAssetContext>(
  initialAssetContextValue
)
export default AssetContext
