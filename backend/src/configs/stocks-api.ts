export function createGetStockPriceRequestConfig(ticker: string) {
  return {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/price',
    params: { symbol: `${ticker}`, format: 'json', outputsize: '30' },
    headers: {
      'X-RapidAPI-Key': 'ecd42ec1c7msh80bb4b4926400a4p154ee7jsn653b14a0cdfb',
      'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
  }
}
