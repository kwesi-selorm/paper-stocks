export interface Asset {
  _id: string
  symbol: string
  name: string
  position: number
  averagePrice: number
  value: number
  userId: string
  __v: number
}

export interface AssetPlotData extends Omit<Asset, "value"> {
  value: string
}

export interface AssetTableRecord
  extends Omit<Asset, "averagePrice" | "value"> {
  averagePrice: string
  value: string
}

export type LoggedInUser = {
  id: string
  username: string
  token: string
  buyingPower: number
}

export type SignInInput = {
  username: string
  password: string
}
