
import { firestore } from 'firebase-functions'

import { withCatchAndLogToStackDriver } from '../../utils/withCatchAndLog'

export default firestore
  .document('/foo/{documentId}')
  .onCreate(
    withCatchAndLogToStackDriver(
      async (...args: any[]) => {
        const handler = (await import('./onFooWriteUpdateTimestamp')).handler
        // @ts-ignore
        return handler(...args)
      }
    )
  )
