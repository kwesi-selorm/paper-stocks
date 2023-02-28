export type SignInInput = {
  username: string
  password: string
}

export type UserParam = {
  userId: string
}

export type Asset = {
  _id: string
  symbol: string
  name: string
  position: number
  averagePrice: number
  userId: string
  __v: number
}
