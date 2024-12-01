import { useEffect } from 'react'

import { useLatest } from './use-latest'

export const useCleanUp = (cb: VoidFunction) => {
  const latestRef = useLatest(cb)
  useEffect(() => {
    return () => {
      latestRef.current()
    }
  }, [])
}
