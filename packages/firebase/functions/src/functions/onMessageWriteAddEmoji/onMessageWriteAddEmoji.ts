
import { logger } from 'firebase-functions'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'
import { random } from 'node-emoji'

import { printCache } from '../../utils/printCache'
// initialize firebase admin
import '../../utils/admin'

logger.log(
  '======= OnMessageWriteAddEmoji ======='
)

export const handler = async (snap: DocumentSnapshot) => {
  logger.log('Running ADD EMOJI')
  // * We should see `node-emoji` here
  logger.log(printCache(require.cache))
  // Grab the current value of what was written to Cloud Firestore.
  const original = snap.data()?.text

  const text = `${original} ${random().emoji}`

  await snap.ref.set({ text }, { merge: true })
}
