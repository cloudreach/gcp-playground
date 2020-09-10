
import { Logging } from '@google-cloud/logging'

// Instantiates a client
export const loggingClent = new Logging()

export function reportErrorToStackDriver (err: Error, context = {}) {
  const logName = 'cloud_firestore_function_errors' // must be a valid Stackdriver log stream name
  const log = loggingClent.log(logName)

  return new Promise((resolve, reject) => {
    log.write(
      log.entry({
        resource: {
          type: 'cloud_function',
          labels: { function_name: process.env.FUNCTION_NAME as string } // for filtering by cloud function name
        }
      }, {
        message: err.stack,
        serviceContext: {
          service: process.env.FUNCTION_NAME as string,
          resourceType: 'cloud_function'
        },
        context: context
      }),
      error => error ? reject(error) : resolve()
    )
  })
}
