import { Schema, model } from 'mongoose'

const NasdaqStockSchema = new Schema({
  id: Schema.Types.ObjectId,
  companyName: String,
  financialStatus: String,
  marketCategory: String,
  roundLotSize: Number,
  securityName: String,
  symbol: String,
  testIssue: String
})

export default model('NasdaqStock', NasdaqStockSchema, 'nasdaqStocks')
