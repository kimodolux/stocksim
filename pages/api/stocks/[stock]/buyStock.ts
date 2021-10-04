import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { db } from "../../../../firebase"
import admin from "firebase-admin"
import { Stock, StockRef } from "../../../../types/stocks"
import { Profile } from "../../../../types/profile"
import { TransactionType } from "../../../../types/transactions"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403)
  }
  const { stock: stockSymbol, amount } = req.query
  const askAmmount = parseInt(amount as string)
  if (req.method === "POST") {
    try {
      const profilesRef = db.collection("profiles")
      const profileRef = profilesRef.doc(session!.user.profileId)
      const profileDoc = await profileRef.get()
      if (!profileDoc) {
        return res.status(403)
      }
      const profile = profileDoc.data() as Profile
      const stocksRef = db.collection("stocks")
      const doc = await stocksRef.doc(stockSymbol as string).get()

      if (!doc.exists) {
        return res.status(404)
      }
      const stock = doc.data() as Stock
      if (stock.ask * askAmmount > profile.money) {
        return res.status(403).json("Not enough money")
      }
      let stockExists = false
      const newStocks = profile.stocks
      for (const i of newStocks) {
        if (i.symbol === stockSymbol) {
          i.amount += askAmmount
          stockExists = true
          break
        }
      }
      if (stockExists) {
        await profileRef.update({
          money: admin.firestore.FieldValue.increment(
            stock.ask * askAmmount * -1
          ),
          stocks: newStocks,
        })
      } else {
        const stockRef: StockRef = {
          symbol: stockSymbol as string,
          amount: askAmmount,
        }
        await profileRef.update({
          money: admin.firestore.FieldValue.increment(
            stock.ask * askAmmount * -1
          ),
          stocks: admin.firestore.FieldValue.arrayUnion(stockRef),
        })
      }
      const transactionsRef = db.collection("transactions")
      await transactionsRef.add({
        profileId: session!.user.profileId,
        transactionType: TransactionType.BuyStock,
        stock: stockSymbol,
        amount: askAmmount,
        cost: stock.ask * askAmmount,
        timestamp: admin.firestore.Timestamp.fromDate(new Date()),
      })
      return res.status(200).json({ message: "success" })
    } catch (e) {
      console.log((e as Error).message)
      return res.status(503)
    }
  }
}
