import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { db } from "../../../firebase"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session?.user.profileId) {
    res.status(403)
  }
  try {
    const profilesRef = db.collection("profiles")
    const doc = await profilesRef.doc(session!.user.profileId).get()

    if (!doc.exists) {
      res.status(404)
    }

    return res.status(200).json(doc.data())
  } catch (e: any) {
    console.log(e.message)
    return res.status(503)
  }
}
