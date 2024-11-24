import React, { useRef } from 'react'

export const useLatest = <T>(val: T): React.MutableRefObject<T> => {
  const ref = useRef(val)
  ref.current = val
  return ref
}
