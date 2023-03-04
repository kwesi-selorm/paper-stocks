export type SignInInput = {
  username: string
  password: string
}

export type UserParam = {
  userId: string
}

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

export interface AssetTableRecord
  extends Omit<Asset, "averagePrice" | "value"> {
  averagePrice: string
  value: string
}

export type LoggedInUser = {
  id: string
  username: string
  token: string
}
