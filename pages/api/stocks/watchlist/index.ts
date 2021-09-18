import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { Stock } from "../../../../types/stocks"
import { db } from "../../../../firebase"
import { Profile } from "../../../../types/profile"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session?.user.profileId) {
    res.status(403)
  }
  try {
    const stocksRef = db.collection("profiles")
    const doc = await stocksRef.doc(session!.user.profileId).get()
    const profile = doc.data() as Profile

    return res.status(200).json(profile.stocks)
  } catch (e: any) {
    console.log(e.message)
    return res.status(503)
  }
}
