import { createFileRoute } from '@tanstack/react-router';

import { CodeBlock, FileTabs, Sidebar } from '@/components';
import { Drawer } from '@/components/drawer';
import { useDisableSave } from '@/hooks';
import { actions, useStore } from '@/store';

const tags = ['1', '2', '3'];

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const codeSetIndex = useStore().snippet.codeSetIndex();
  const fileIndex = useStore().snippet.fileIndex();
  const currentSet = useStore().snippet.currentSet();

  useDisableSave();

  return (
    <>
      <div className="flex h-screen w-full items-center">
        <Drawer />
        {/* left */}
        <Sidebar />
        {/* right */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="flex gap-2">
            {tags.map(tag => (
              <div className="bg-green rounded p-1">{tag}</div>
            ))}
          </div>
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
