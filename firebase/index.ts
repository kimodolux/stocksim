import * as admin from "firebase-admin"
import "firebase/firestore"
import { SA } from "./serviceAccount"

export const firestore = (
  admin.apps[0] ??
  admin.initializeApp({
    credential: admin.credential.cert(SA),
  })
).firestore()

export const db = admin.firestore()
export const storage = admin.storage()

export default admin
