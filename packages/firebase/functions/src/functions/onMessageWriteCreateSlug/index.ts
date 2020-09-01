
import { firestore } from 'firebase-functions'

export default firestore
  .document('/messages/{documentId}')
  .onCreate(async (...args) => {
    const handler = (await import('./onMessageWriteCreateSlug')).handler
    // @ts-ignore
    return handler(...args)
  })
