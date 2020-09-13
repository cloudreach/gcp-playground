
import { useEffect } from 'react'

export const useStopTrace = async (doStopTrace, fn) => {
  useEffect(() => {
    async function wrap () {
      await fn()
      await doStopTrace()
    }

    wrap()
  }, [])
}
