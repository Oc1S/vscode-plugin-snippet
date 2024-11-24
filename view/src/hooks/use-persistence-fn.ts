import { useRef } from 'react'

import { useLatest } from './use-latest'

export const usePersistenceFn = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useLatest(fn)

  const outRef = useRef(function (this: any, ...args: any[]) {
    return fnRef.current.call(this, ...args)
  } as T)
  return outRef.current
}
