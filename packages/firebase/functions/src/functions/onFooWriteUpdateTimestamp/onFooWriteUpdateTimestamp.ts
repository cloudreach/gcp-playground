
import { logger } from 'firebase-functions'
import { QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

// Some really big module
import * as moment from 'moment'
import { printCache } from '../../utils/printCache'
// initialize firebase admin
import '../../utils/admin'

logger.log(
  '======= OnFooWriteUpdateTimestamp ======='
)

export const handler = async (snap: QueryDocumentSnapshot) => {
  logger.log('Running UPDATE TIMESTAMP')
  logger.log(printCache(require.cache))
  await snap.ref.set({ timestamp: moment.now() }, { merge: true })
}
