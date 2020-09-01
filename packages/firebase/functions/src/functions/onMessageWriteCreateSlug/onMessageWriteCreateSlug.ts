
import { logger } from 'firebase-functions'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

import { snake } from 'case'
import { printCache } from '../../utils/printCache'
// initialize firebase admin
import '../../utils/admin'

logger.log(
  '======= OnMessageWriteCreateSlug======='
)

export const handler = async (snap: DocumentSnapshot) => {
  logger.log('Running CREATE SLUG')
  logger.log(printCache(require.cache))
  // Grab the current value of what was written to Cloud Firestore.
  const original = snap.data()?.text

  const slug = snake(original)

  await snap.ref.set({ slug }, { merge: true })
}
