/* eslint-disable import/first */

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { printCache } from './utils/printCache'

// Show cache before importing functions
functions.logger.log(printCache(require.cache))

import OnMessageWriteCreateSlug from './onMessageWriteCreateSlug'
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
