/* eslint-disable import/first */

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { printCache } from './utils/printCache'

// Show cache before importing functions
functions.logger.log(printCache(require.cache))

/**
 * ! These modules are loaded and evaluated on each cold start of _any_ Cloud Function.
 * ! this can impact cold start times, as cold start times will tend towards the sum of
 * ! all Cloud Function cold start times.
 *
 * ! Instead, use global namespace sparingly, loading only dependencies shared by all Cloud Functions.
 * ! Additionally, only load dependencies within each Cloud Function itself.
 * ! See the "lazy import" below
 */
// * depends on `case` which is evaluated for every function
import OnMessageWriteCreateSlug from './onMessageWriteCreateSlug'
// * depends on `moment` which is evaluated for every function
import OnMessageWriteUpdateTimestamp from './onFooWriteUpdateTimestamp'

admin.initializeApp()

functions.logger.log(
  '======= index ======='
)

// Instantiate functions
const onMessageWriteCreateSlugHandler = new OnMessageWriteCreateSlug()
const onMessageWriteUpdateTimestampHandler = new OnMessageWriteUpdateTimestamp()

export const onMessageWriteCreateSlug = functions.firestore
  .document('/messages/{documentId}')
  .onCreate(onMessageWriteCreateSlugHandler.trigger)

export const onFooWriteUpdateTimestamp = functions.firestore
  .document('/foo/{documentId}')
  .onCreate(onMessageWriteUpdateTimestampHandler.trigger)

// lazy import
export const onMessageWriteAddEmoji = functions.firestore
  .document('/messages/{documentId}')
  .onCreate(async (...args) => {
    // * depends on `node-emoji` which is only evaluated for this function
    const Clazz = (await import('./onMessageWriteAddEmoji')).OnBarWriteAddEmoji
    return new Clazz().trigger(...args)
  })
