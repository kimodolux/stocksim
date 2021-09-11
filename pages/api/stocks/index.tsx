import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { db } from "../../../firebase"

// paganate this later
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    res.status(401)
  }

  const page = parseInt(req.query.page as string)
  const limit = parseInt(req.query.limit as string)

  if (limit > 51) {
    res.status(418).end()
  }

  try {
    const stocksRef = db
      .collection("stocks")
      .orderBy("marketCap")
      .startAt(page * limit)

    const stockRecords = await stocksRef.limit(limit).get()
    const stockData = stockRecords.docs.map((doc) => {
      return doc.data()
    })
    return res.status(200).json(stockData)
  } catch (e: any) {
    console.log(e.message)
    return res.status(503).end()
  }
}
