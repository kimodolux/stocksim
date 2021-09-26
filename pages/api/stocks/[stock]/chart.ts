import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import axios, { AxiosRequestConfig } from "axios"

type Price = {
  date: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  adjclose: number
}

const mapChartDate = (prices: Price[]) => {
  const mappedData = prices
    .slice(0)
    .reverse()
    .map((price: any) => {
      const date = new Date(0)
      date.setUTCSeconds(price.date)
      const shortDate = date.toLocaleDateString("en-US")
      return [
        shortDate,
        price.low,
        price.open,
        price.close,
        price.high,
        `<p>Date: ${shortDate}</p><p>Low: ${price.low?.toFixed(
          2
        )}</p><p>Open: ${price.open?.toFixed(
          2
        )}</p><p>Close: ${price.close?.toFixed(
          2
        )}</p><p>High: ${price.high?.toFixed(2)}</p>`,
      ]
    })
  mappedData.unshift([
    "Date",
    "",
    "",
    "",
    "",
    { role: "tooltip", type: "string", p: { html: true } },
  ])
  return mappedData
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403)
  }
  const { stock: stockSymbol } = req.query

  const options = {
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data",
    params: { symbol: stockSymbol, region: "AU" },
    headers: {
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  } as AxiosRequestConfig

  if (req.method === "GET") {
    try {
      const response = await axios.request(options)
      const prices = response.data.prices

      const chartData = mapChartDate(prices)
      return res.json({ data: chartData })
    } catch (e) {
      return res.status(503)
    }
  }
}
