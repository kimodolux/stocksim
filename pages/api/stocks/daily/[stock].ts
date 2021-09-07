import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { getSession } from "next-auth/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403)
  }

  const { stock: stockSymbol } = req.query
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.AV_API_KEY}`
  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "request" },
    })
    console.log(response)
    if (response) {
      res.status(200).json(response)
    }
  } catch (e: any) {
    console.log(e.message)
  }
}
