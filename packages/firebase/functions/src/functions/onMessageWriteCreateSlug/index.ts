
import { firestore } from 'firebase-functions'

import { withCatchAndLogToStackDriver } from '../../utils/withCatchAndLog'

export default firestore
  .document('/messages/{documentId}')
  .onCreate(
    withCatchAndLogToStackDriver(
      async (...args: any[]) => {
        const handler = (await import('./onMessageWriteCreateSlug')).handler
        // @ts-ignore
        return handler(...args)
      }
    )
  )
