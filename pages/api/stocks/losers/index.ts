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
    const bigBois = await stocksRef
      .orderBy("regularMarketChangePercent", "asc")
      .limit(5)
      .get()
    const stockData = bigBois.docs.map((doc) => {
      return doc.data() as Stock
    })
    return res.status(200).json(stockData)
  } catch (e: any) {
    console.log(e.message)
    return res.status(503)
  }
}
