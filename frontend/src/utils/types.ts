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

export type ListedStock = {
  symbol: string
  name: string
  currency: string
  exchange: string
  mic_code: string
  country: string
  type: string
}

export type SignInInput = {
  username: string
  password: string
}

export type SignUpInput = {
  username: string
  email: string
  password: string
  confirmPassword: string
  passwordClue: string
}
