import { motion, Reorder } from 'framer-motion';

import { actions, store, useStore } from '@/store';
import { cx } from '@/utils';

export const Sidebar = () => {
  const codeSets = useStore().snippet.codeSets();
  const codeSetIndex = useStore().snippet.codeSetIndex();
  return (
    <div className="flex min-w-[200px] flex-col items-center justify-center gap-2">
      <div className="text-xl text-[#e0e055]">Snippets</div>
      <Reorder.Group
        className="flex max-h-[90vh] w-full flex-col items-center overflow-y-scroll"
        axis="y"
        values={codeSets}
        onReorder={newSets => {
          const currentSetId = store.snippet.currentSet().id;
          const newSetIndex = newSets.findIndex(s => s.id === currentSetId);
          actions.snippet.state(draft => {
            draft.codeSets = newSets;
            draft.codeSetIndex = newSetIndex;
          });
        }}
      >
        {codeSets.map((s, index) => {
          const isCurrent = codeSetIndex === index;
          return (
            <Reorder.Item key={s.id} value={s}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1, type: 'spring' }}
                className={cx(
                  'my-0.5 flex cursor-pointer items-center justify-center rounded-md p-4 py-1 text-[#eee] transition hover:bg-white/10 hover:opacity-90',
                  isCurrent && '!bg-primary/20 text-primary-400/70'
                )}
                onClick={() => actions.snippet.changeSelectedCodeSet(index)}
              >
                {s.name}
              </motion.div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
};
