import { Chip } from '@nextui-org/react';
import { createFileRoute } from '@tanstack/react-router';

import { CodeBlock, drawer, FileTabs, Input, Sidebar } from '@/components';
import { TagsForm } from '@/components/form/tag-form';
import { Search } from '@/components/search';
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

  return (
    <>
      <div className="flex h-screen w-full select-none items-center">
        {/* left */}
        <Sidebar />
        {/* right */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <Search />

          <div className="flex gap-4">
            <div>Tags:</div>
            <div className="flex gap-2">
              {currentSet.tags.map(tag => (
                <Chip
                  key={tag}
                  color="primary"
                  variant="flat"
                  className="cursor-pointer hover:opacity-90"
                  onDoubleClick={() => {
                    drawer({
                      content: <TagsForm />,
                    });
                  }}
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex w-[800px] flex-col justify-center">
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
