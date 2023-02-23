export type NasdaqListedStock = {
  companyName: string
  financialStatus: string
  marketCategory: string
  roundLotSize: number
  securityName: string
  symbol: string
  testIssue: string
}

export type StockPrice = {
  price: string
}

export type Ticker = string
