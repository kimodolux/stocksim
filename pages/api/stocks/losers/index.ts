import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { Stock } from "../../../../types/stocks"
import { db } from "../../../../firebase"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403)
  }
  try {
    const stocksRef = db.collection("stocks")
    const stockRecords = (await stocksRef.get()).docs
    const stockData = stockRecords.map((doc) => {
      return doc.data() as Stock
    })
    stockData.sort(
      (a, b) => a.regularMarketChangePercent - b.regularMarketChangePercent
    )

    return res.status(200).json(stockData.slice(0, 5))
  } catch (e: any) {
    console.log(e.message)
    return res.status(503).end()
  }
}
