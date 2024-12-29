import { Tab, Tabs } from '@nextui-org/react';
import { motion } from 'framer-motion';

import { actions, useStore } from '@/store';
import { cx } from '@/utils';

import { contextMenu } from '../context-menu';

export const Sidebar = () => {
  const codeSets = useStore().snippet.codeSets();

  return (
    <div className="flex min-w-[200px] flex-col items-center justify-center gap-2">
      <motion.div
        className="text-xl text-[#e0e055]"
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
            actions.snippet.changeCodeSet(index);
          }}
        >
          {codeSets.map((s, index) => {
            return (
              <Tab
                key={s.id}
                title={s.name}
                className={cx(
                  'flex min-w-32 max-w-[180px] cursor-pointer items-center justify-center truncate rounded px-4 text-[#eee] transition hover:bg-white/10 hover:opacity-90'
                )}
                onClick={() => actions.snippet.changeCodeSet(index)}
                onContextMenu={e => {
                  e.preventDefault();
                  contextMenu({
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
