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
    res.status(403)
  }

  try {
    const stocksRef = db.collection("stocks")
    const stockRecords = (await stocksRef.get()).docs
    const stockData = stockRecords.map((doc) => {
      return doc.data()
    })
    return res.status(200).json(stockData)
  } catch (e: any) {
    console.log(e.message)
  }
}
