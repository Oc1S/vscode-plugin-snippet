import { createFileRoute } from '@tanstack/react-router';
import { Reorder } from 'framer-motion';

import { CodeBlock, Tabs } from '@/components';
import { useDisableSave } from '@/hooks';
import { actions, store, useStore } from '@/store';
import { cx } from '@/utils';

export const Route = createFileRoute('/')({
  component: Index,
});

const SideBar = () => {
  const codeSets = useStore.codeSets();
  const codeSetIndex = useStore.codeSetIndex();
  return (
    <div className="flex w-[200px] flex-col items-center justify-center gap-2">
      <div className="text-xl text-[#e0e055]">CodeSets</div>
      <Reorder.Group
        className="flex flex-col"
        axis="y"
        values={codeSets}
        onReorder={newSets => {
          const currentSetId = store.currentSet().id;
          const newSetIndex = newSets.findIndex(s => s.id === currentSetId);
          actions.state(draft => {
            draft.codeSets = newSets;
            draft.codeSetIndex = newSetIndex;
          });
        }}
      >
        {codeSets.map((s, index) => {
          const isCurrent = codeSetIndex === index;
          return (
            <Reorder.Item
              key={s.id}
              value={s}
              onClick={() => actions.changeCodeSet(index)}
            >
              <div
                className={cx(
                  'my-0.5 flex cursor-pointer items-center justify-center rounded-md p-4 py-1 text-[#eee] transition hover:bg-white/10 hover:opacity-90',
                  isCurrent && 'bg-white/10'
                )}
              >
                {s.name}
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
};

function Index() {
  const codeSetIndex = useStore.codeSetIndex();
  const fileIndex = useStore.fileIndex();
  const currentSet = useStore.currentSet();

  useDisableSave();

  return (
    <>
      <div className="flex h-screen w-full items-center">
        {/* left */}
        <SideBar />
        {/* right */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-[800px] flex-col">
            <Tabs />
            <CodeBlock
              value={currentSet.files[fileIndex].code}
              onChange={newVal => {
                actions.state(draft => {
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
