import './editor.css'

import React, { FC, useState } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror'

import { usePersistenceFn } from '../../hooks/use-persistence-fn'

export const CodeBlock: FC<{
  lang?: 'javascript' | 'typescript' | 'jsx' | 'tsx'
  initValue: string
}> = ({ initValue }) => {
  const [value, setValue] = useState(initValue)
  const onChange = usePersistenceFn((val => {
    console.log('val:', val)
    setValue(val)
  }) satisfies ReactCodeMirrorProps['onChange'])
  return (
    <CodeMirror
      value={value}
      theme="dark"
      className="w-full bg-black"
      height="400px"
      width="800px"
      extensions={[javascript({ jsx: true, typescript: true })]}
      onChange={onChange}
    />
  )
}
