import { useEffect, useRef } from 'react';
import { Reorder, useInView } from 'framer-motion';

import { actions, store, useStore } from '@/store';
import { cx } from '@/utils';

import { PlusIcon } from '../icons';
import { Close } from '../icons/close';

export const Tabs = () => {
  const firstRef = useRef(null);
  const isFirstInView = useInView(firstRef);
  const lastRef = useRef(null);
  const isLastInView = useInView(lastRef);
  const fileIndex = useStore.fileIndex();
  const currentSet = useStore.currentSet();

  const { files } = currentSet;

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (event: WheelEvent) => {
      const { deltaX, deltaY } = event;
      event.preventDefault();
      const dis = 30;
      if (deltaX > 0 || deltaY > 0) {
        el.scrollLeft += dis;
      } else {
        el.scrollLeft -= dis;
      }
    };
    el.addEventListener('wheel', handler);
    return () => {
      el.removeEventListener('wheel', handler);
    };
  }, []);

  useEffect(() => {
    document.querySelector(`[data-tab-index="${fileIndex}"]`)?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });
  }, [fileIndex]);

  const maskClassName = () => {
    if (!(isFirstInView || isLastInView)) {
      return 'mask-both';
    }
    if (!isFirstInView) {
      return 'mask-left';
    }
    if (!isLastInView) {
      return 'mask-right';
    }
    return '';
  };

  return (
    <div className="flex items-center bg-[#1e1e1e]">
      <div
        ref={containerRef}
        className={cx(
          'no-scrollbar mb-[0.5px] flex w-full overflow-x-scroll pr-1',
          maskClassName()
        )}
      >
        <div ref={firstRef} />
        <Reorder.Group
          key={currentSet.id}
          className="flex"
          axis="x"
          values={files}
          onReorder={newFiles => {
            const currentFileId = store.currentFile().id;
            const newFileIndex = newFiles.findIndex(
              f => f.id === currentFileId
            );
            actions.state(draft => {
              draft.codeSets[draft.codeSetIndex].files = newFiles;
              draft.fileIndex = newFileIndex;
            });
          }}
        >
          {files.map((f, index) => (
            <Reorder.Item key={f.id} value={f}>
              <div
                key={f.id}
                data-tab-index={index}
                className={cx(
                  'group flex min-w-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-t-md border-b border-transparent p-2 py-1 text-sm transition hover:bg-black/30 active:bg-black/40',
                  fileIndex === index && 'border-[#6cc7f6]'
                )}
                onMouseDown={() => {
                  actions.fileIndex(index);
                }}
              >
                <div>{f.name}</div>
                <div
                  className="ml-2 cursor-pointer rounded-lg p-1 opacity-0 transition duration-150 hover:rotate-180 hover:bg-black/70 group-hover:opacity-100"
                  onMouseDown={e => {
                    e.stopPropagation();
                  }}
                  onClick={() => {
                    actions.removeFileById(f.id);
                  }}
                >
                  <Close />
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <div ref={lastRef} />
      </div>
      <div
        className="mx-1 cursor-pointer rounded-lg p-1 transition duration-150 hover:rotate-180 hover:bg-black/70"
        onClick={() => {
          actions.addFile();
        }}
      >
        <PlusIcon color="#fff" className="h-4 w-4" />
      </div>
    </div>
  );
};
