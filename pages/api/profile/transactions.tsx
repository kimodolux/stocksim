import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { db } from "../../../firebase"
import { Transaction } from "../../../types/transactions"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  console.log(session)
  if (!session?.user.profileId) {
    res.status(403)
  }
  try {
    const profilesRef = db.collection("transactions")
    const snapshot = await profilesRef
      .where("profileId", "==", session!.user.profileId)
      .get()

    if (snapshot.empty) {
      return res.status(200).json([])
    }
    const myTransactions: Transaction[] = []
    snapshot.forEach((doc) => {
      let data = doc.data()
      data.timestamp = data.timestamp.toDate()
      myTransactions.push(data as Transaction)
    })

    return res.status(200).json(myTransactions)
  } catch (e: any) {
    console.log(e.message)
    return res.status(503)
  }
}
