import { useEffect } from 'react';
import { Input } from '@nextui-org/react';
import { createFileRoute } from '@tanstack/react-router';

import { CodeBlock, FileTabs, Sidebar } from '@/components';
import { Drawer, drawer } from '@/components/drawer';
import { useDisableSave } from '@/hooks';
import { actions, useStore } from '@/store';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const codeSetIndex = useStore().snippet.codeSetIndex();
  const fileIndex = useStore().snippet.fileIndex();
  const currentSet = useStore().snippet.currentSet();

  useDisableSave();

  useEffect(() => {
    drawer({
      header: 'Change Filename',
      body: <Input label="Name" placeholder="New Name" variant="bordered" />,
      onComfirm: () => {},
    });
  }, []);

  return (
    <>
      <div className="flex h-screen w-full items-center">
        <Drawer />
        {/* left */}
        <Sidebar />
        {/* right */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-[800px] flex-col">
            <FileTabs />
            <CodeBlock
              value={currentSet.files[fileIndex].code}
              onChange={newVal => {
                actions.snippet.state(draft => {
                  draft.codeSets[codeSetIndex].files[fileIndex].code = newVal;
                });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
