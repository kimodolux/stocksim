import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { db } from "../../../../firebase"
import admin from "firebase-admin"

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
      console.log(e.message)
      return res.status(503)
    }
  }

  if (req.method === "POST") {
    try {
      const stocksRef = db.collection("stocks")
      const stockDoc = await stocksRef.doc(stockSymbol as string).get()

      if (!stockDoc.exists) {
        return res.status(404)
      }

      const profilesRef = db.collection("profiles")
      const profileRef = profilesRef.doc(session!.user.profileId)
      const profileDoc = await profileRef.get()
      if (!profileDoc) {
        return res.status(403)
      }
      await profileRef.update({
        stocks: admin.firestore.FieldValue.arrayUnion(stockDoc.data()),
      })
      return res.status(200).json({ message: "success" })
    } catch (e) {
      console.log(e.message)
      return res.status(503)
    }
  }

  if (req.method === "DELETE") {
    try {
      const stocksRef = db.collection("stocks")
      const stockDoc = await stocksRef.doc(stockSymbol as string).get()

      if (!stockDoc.exists) {
        return res.status(404)
      }

      const profilesRef = db.collection("profiles")
      const profileRef = profilesRef.doc(session!.user.profileId)
      const profileDoc = await profileRef.get()
      if (!profileDoc) {
        return res.status(403)
      }
      await profileRef.update({
        stocks: admin.firestore.FieldValue.arrayRemove(stockDoc.data()),
      })
      return res.status(200).json({ message: "success" })
    } catch (e) {
      console.log(e.message)
      return res.status(503)
    }
  }
}
