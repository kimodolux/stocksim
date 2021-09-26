import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { db } from "../../../../firebase"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403)
  }
  const { stock: stockSymbol } = req.query

  if (req.method === "GET") {
    try {
      const stocksRef = db.collection("stocks")
      const doc = await stocksRef.doc(stockSymbol as string).get()

      if (!doc.exists) {
        return res.status(404)
      }
      res.status(200).json(doc.data())
    } catch (e) {
      console.log((e as Error).message)
      return res.status(503)
    }
  }
}
