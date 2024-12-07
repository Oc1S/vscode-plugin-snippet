import './editor.css';

import { FC } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';

import { usePersistenceFn } from '@/hooks';

import { Copy } from '../copy';

const theme = vscodeDarkInit();

export const CodeBlock: FC<{
  lang?: 'javascript' | 'typescript' | 'jsx' | 'tsx';
  value: string;
  onChange?: (value: string) => void;
}> = ({ value, onChange: onChangeFromProps }) => {
  const onChange = usePersistenceFn((val => {
    onChangeFromProps?.(val);
  }) satisfies ReactCodeMirrorProps['onChange']);

  return (
    <div className="group relative">
      <Copy
        className={
          'absolute right-4 top-2 z-10 opacity-0 group-hover:opacity-100 data-[copying=true]:opacity-100'
        }
        content={value}
      />
      <CodeMirror
        value={value}
        theme={theme}
        className="w-full"
        height="500px"
        width="800px"
        placeholder="// Paste your code here..."
        basicSetup={{
          foldGutter: false,
          lineNumbers: false,
          // highlightActiveLine: false,
        }}
        extensions={[javascript({ jsx: true, typescript: true })]}
        onChange={onChange}
      />
    </div>
  );
};
