import { profile } from "console"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { db } from "../../../../firebase"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session?.user.profileId) {
    res.status(403)
  }
  const symbols = (req.query.ids as string).split(",")
  if (symbols[0] === "") {
    return res.status(200).json([])
  }
  try {
    const stocksRef = db.collection("stocks")
    const portfolioData = []
    for (const symbol of symbols) {
      const doc = await stocksRef.doc(symbol).get()
      if (!doc.exists) {
        res.status(404)
        return
      }
      const stockData = doc.data()
      portfolioData.push(stockData)
    }

    return res.status(200).json(portfolioData)
  } catch (e: any) {
    console.log(e.message)
    return res.status(503)
  }
}
