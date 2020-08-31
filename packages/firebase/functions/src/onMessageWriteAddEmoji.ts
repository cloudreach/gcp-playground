
import * as functions from 'firebase-functions'
import { EventContext } from 'firebase-functions'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'
import * as emoji from 'node-emoji'

import { printCache } from './utils/printCache'

functions.logger.log(
  '======= OnMessageWriteAddEmoji ======='
)

export class OnBarWriteAddEmoji {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async trigger (snap: DocumentSnapshot, _: EventContext) {
    functions.logger.log('Running ADD EMOJI')
    // * We should see `node-emoji` here
    functions.logger.log(printCache(require.cache))
    // Grab the current value of what was written to Cloud Firestore.
    const original = snap.data()?.text

    const text = `${original} ${emoji.random().emoji}`

    await snap.ref.set({ text }, { merge: true })
  }
}
