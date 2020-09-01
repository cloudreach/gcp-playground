
import { firestore } from 'firebase-functions'

export default firestore
  .document('/foo/{documentId}')
  .onCreate(async (...args) => {
    const handler = (await import('./onFooWriteUpdateTimestamp')).handler
    // @ts-ignore
    return handler(...args)
  })
