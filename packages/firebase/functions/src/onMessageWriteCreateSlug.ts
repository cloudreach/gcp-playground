
import * as functions from 'firebase-functions'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

import { snake } from 'case'
import { printCache } from './utils/printCache'

functions.logger.log(
  '======= OnMessageWriteCreateSlug======='
)

export default class OnMessageWriteCreateSlug {
  async trigger (snap: DocumentSnapshot) {
    functions.logger.log('Running CREATE SLUG')
    functions.logger.log(printCache(require.cache))
    // Grab the current value of what was written to Cloud Firestore.
    const original = snap.data()?.text

    const slug = snake(original)

    await snap.ref.set({ slug }, { merge: true })
  }
}
