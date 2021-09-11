import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { db } from "../../../../firebase"
import { Stock } from "../../../../types/stocks"

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
      .orderBy("regularMarketChangePercent", "desc")
      .limit(5)
      .get()
    const stockData = bigBois.docs.map((doc) => {
      return doc.data() as Stock
    })
    return res.status(200).json(stockData)

    // const stocksRef = db.collection("stocks")
    // const stockRecords = (await stocksRef.get()).docs

    // const stockData = stockRecords.map((doc) => {
    //   return doc.data() as Stock
    // })
    // stockData.sort(
    //   (a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent
    // )

    // return res.status(200).json(stockData.slice(0, 5))
  } catch (e: any) {
    console.log(e.message)
    return res.status(503).end()
  }
}
