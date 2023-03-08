import listedStocks from '../../assets/stocks-list'

export default function verifySymbol(symbol: string): boolean {
  const validSymbol = listedStocks.find((stock) => stock.symbol === symbol)
  return validSymbol !== undefined
}
