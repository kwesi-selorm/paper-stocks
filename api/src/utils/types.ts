import { Schema } from 'mongoose'

export interface AssetRecord {
  id: Schema.Types.ObjectId
  position: number
  returnNumber: number
  returnPercent: number
  lastPrice: number
  users: [UserRecord]
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

export type SaveUserInput = {
  email: string
  username: string
  passwordHash: string
  passwordSalt: string
  passwordClue: string
  assets: AssetRecord[]
  buyingPower: number
}

export interface UserRecord {
  _id: Schema.Types.ObjectId
  email: string
  username: string
  passwordHash: string
  passwordSalt: string
  passwordClue: string
  assets: AssetRecord[]
  buyingPower: number
}

export type UserSignInInput = {
  email: string
  password: string
}

export type UserSignUpInput = {
  email: string
  username: string
  password: string
  passwordClue: string
}

export type StockPrice = {
  price: string
}

export type Ticker = string
