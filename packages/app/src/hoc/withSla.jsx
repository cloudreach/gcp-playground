/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect } from 'react'
import { curry } from 'ramda'

export const withSla = curry(
  ({ startTrace }, WrappedComponent) => {
    // * trace started by HoC
    let trace = null
    let hasTraceStopped = false

    return props => {
      const { traceName, ...restProps } = props
  
      useEffect(() => {
        async function wrap () {
          trace = await startTrace(traceName)
        }
        wrap()

        // * Manually stop trace if needed ie. callback is never called in WrappedComponent
        return () => {
          if (!hasTraceStopped) {
            console.warn(`trace.stop() was never called by ${WrappedComponent.displayName || 'WrappedComponent'}. Manually stopping trace.`)
            trace.stop()
          }
          hasTraceStopped = true
        }
      }, []) // * empty array only runs on intial render

      const doStopTrace = useCallback(async () => {
        if (!trace || hasTraceStopped) {
          return
        }
        await trace.stop()
        hasTraceStopped = true
      }, [trace])
    
      return (
        <WrappedComponent
          {...restProps}
          doStopTrace={doStopTrace} // * pass a callback to wrapped component to call when you want to stop the trace
        />
      )
    }
  }
)
