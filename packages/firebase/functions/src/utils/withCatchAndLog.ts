
import { curry } from 'ramda'

import { reportErrorToStackDriver } from './reportError'

export const withCatchAndLog = curry(
  (errHandler, fn: Function) =>
    async (...args: any[]) => {
      try {
        const result = await fn(...args)
        return result
      } catch (err) {
        // @ts-ignore
        await errHandler(err, { arguments: args })
      }
    }
)

export const withCatchAndLogToStackDriver = withCatchAndLog(reportErrorToStackDriver)
export const withCatchAndLogToStdOut = withCatchAndLog(console.error)
