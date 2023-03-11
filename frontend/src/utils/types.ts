export interface Asset {
  _id: string
  symbol: string
  name: string
  position: number
  averagePrice: number
  value: number
  userId: string
  marketPrice: number
  returnBasis?: number
  __v: number
}

export interface AssetPlotData extends Omit<Asset, "value"> {
  value: string
}

export interface AssetTableRecord {
  _id: string
  symbol: string
  name: string
  position: number
  averagePrice: string
  value: string
  userId: string
  marketPrice: string
  __v: number
  returnCurrency: string
  returnPercent: string
}

export type LoggedInUser = {
  id: string
  username: string
  token?: string
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

export type NewStockInitialInputType = {
  symbol: string
  name: string
  position: number
  amountInvested: number
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
