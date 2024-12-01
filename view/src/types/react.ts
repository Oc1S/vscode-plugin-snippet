import { FC, ReactNode } from 'react'

export type ParentComponent<P = object> = FC<P & { children?: ReactNode }>
export type FCWithChildren<P = object> = ParentComponent<P>
