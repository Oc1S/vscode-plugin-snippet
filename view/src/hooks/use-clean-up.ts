import { useEffect } from 'react'

import { useLatest } from './use-latest'

export const useCleanUp = (cb: Fn) => {
  const latestRef = useLatest(cb)
  useEffect(() => {
    return () => {
      latestRef.current()
    }
  }, [])
}
