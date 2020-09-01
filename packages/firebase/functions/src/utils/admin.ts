
import * as firebaseAdmin from 'firebase-admin'

firebaseAdmin.initializeApp()

export const admin = {
  ...firebaseAdmin,
  fs: firebaseAdmin.firestore()
}
