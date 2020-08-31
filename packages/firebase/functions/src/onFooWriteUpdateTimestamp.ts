
import * as functions from 'firebase-functions'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

// Some really big module
import * as moment from 'moment'
import { printCache } from './utils/printCache'

functions.logger.log(
  '======= OnFooWriteUpdateTimestamp ======='
)

export default class OnFooWriteUpdateTimestamp {
  async trigger (snap: DocumentSnapshot) {
    functions.logger.log('Running UPDATE TIMESTAMP')
    functions.logger.log(printCache(require.cache))
    await snap.ref.set({ timestamp: moment.now() }, { merge: true })
  }
}
