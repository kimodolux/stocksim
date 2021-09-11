import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { db } from "../../../firebase"
import { Profile } from "../../../types/profile"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session?.user.profileId) {
    res.status(403).end()
  }
  try {
    const stocksRef = db.collection("profiles")
    const doc = await stocksRef.doc(session!.user.profileId).get()

    if (!doc.exists) {
      res.status(404).end()
    }

    return res.status(200).json(doc.data())
  } catch (e: any) {
    console.log(e.message)
    return res.status(503).end()
  }
}
