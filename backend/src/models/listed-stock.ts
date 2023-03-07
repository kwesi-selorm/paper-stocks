import { Schema, model } from 'mongoose'

export interface IListedStock {
  symbol: string
  name: string
  currency: string
  exchange: string
  mic_code: string
  country: string
  type: string
}

const NasdaqStockSchema = new Schema<IListedStock>({
  symbol: String,
  name: String,
  currency: String,
  exchange: String,
  mic_code: String,
  country: String,
  type: String
})

export default model<IListedStock>(
  'NasdaqStock',
  NasdaqStockSchema,
  'listed-stocks'
)
