import { useEffect } from 'react';
import { Tab, Tabs } from '@nextui-org/react';
import { motion } from 'framer-motion';

import { actions, useStore } from '@/store';
import { cx } from '@/utils';

import { snippetMenu } from '../context-menu/snippet-menu';

export const Sidebar = () => {
  const codeSets = useStore().snippet.codeSets();
  const setId = useStore().snippet.currentSet().id;

  const idBuilder = (setId: string) => `code-set-tabs-${setId}`;

  useEffect(() => {
    if (!setId) {
      return;
    }
    document
      .getElementById(idBuilder(setId))
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [setId]);

  return (
    <div className="flex h-screen min-w-[200px] flex-col items-center gap-2 pb-4 pt-12">
      <motion.div
        className="mb-2 text-xl text-[#e0e055]"
        whileHover={{
          scale: 1.2,
        }}
      >
        Snippets
      </motion.div>

      <div className="flex max-h-[90vh] w-full flex-col items-center overflow-y-scroll">
        <Tabs
          variant="light"
          color="default"
          isVertical
          classNames={{
            cursor: 'rounded',
          }}
          selectedKey={useStore().snippet.currentSet().id}
          onSelectionChange={id => {
            const index = codeSets.findIndex(s => s.id === id);
            actions.snippet.changeSelectedCodeSet(index);
          }}
        >
          {codeSets.map((s, index) => {
            return (
              <Tab
                key={s.id}
                id={idBuilder(s.id)}
                title={<span className="truncate">{s.name}</span>}
                className={cx(
                  'flex min-w-32 max-w-[180px] cursor-pointer items-center justify-center rounded px-4 text-[#eee] transition hover:bg-white/10 hover:opacity-90'
                )}
                onClick={() => actions.snippet.changeSelectedCodeSet(index)}
                onContextMenu={e => {
                  e.preventDefault();
                  snippetMenu({
                    snippet: s,
                    style: {
                      left: e.clientX,
                      top: e.clientY,
                    },
                  });
                }}
              />
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};
