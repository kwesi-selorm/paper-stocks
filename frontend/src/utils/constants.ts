export const apiUrl =
  process.env.NODE_ENV == "development"
    ? process.env.NEXT_PUBLIC_LOCALHOST_URL ?? "http://localhost:8000/api"
    : process.env.NEXT_PUBLIC_HEROKU_URL

export const newStockInitialInput = {
  symbol: "",
  name: "",
  position: 0,
  amountInvested: 0
}
