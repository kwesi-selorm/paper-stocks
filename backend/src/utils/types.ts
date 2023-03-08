import { Schema } from 'mongoose'
export type AssetDocument = {
  _id: Schema.Types.ObjectId
  symbol: string
  name: string
  position: number
  averagePrice: number
  userId: string
  _v: number
}

export type EncodePasswordOutput = {
  passwordSalt: string
  passwordHash: string
}

export type GetStockPriceInput = {
  symbol: string
}

export type NasdaqListedStock = {
  companyName: string
  financialStatus: string
  marketCategory: string
  roundLotSize: number
  securityName: string
  symbol: string
  testIssue: string
}

export type UserDocument = {
  _id: Schema.Types.ObjectId
  email: string
  username: string
  passwordHash: string
  passwordSalt: string
  passwordClue: string
  buyingPower: number
}

export type StockPrice = {
  price: string
}
