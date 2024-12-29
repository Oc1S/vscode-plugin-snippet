import React, { useEffect, useState } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { AnimatePresence, motion, transform } from 'framer-motion';

import { useEventListener } from '@/hooks';
import { trigger } from '@/lib/mitt';
import { cx } from '@/utils';

import {
  AddNoteIcon,
  CopyDocumentIcon,
  DeleteDocumentIcon,
  EditDocumentIcon,
} from './icons';

export type ContextMenuState = {
  isOpen?: boolean;
  content?: React.ReactNode | ((onClose: Fn) => React.ReactNode);
  style?: React.CSSProperties;
};

const menuVariants = {
  open: {
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.3,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
  closed: {
    scale: 0,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.2,
    },
  },
};

const key = 'context-menu';

const contextMenuFunc = (data: ContextMenuState) => {
  trigger(key, { isOpen: true, ...data });
};

export const contextMenu = Object.assign(contextMenuFunc, {
  dismiss: () => {
    trigger(key, { isOpen: false });
  },
});

export const ContextMenu = () => {
  const [contextMenuState, setContextMenuState] = useState<
    Required<ContextMenuState>
  >({
    isOpen: false,
    style: {},
    content: () => null,
    // title: null,
    // content: null,
    // onComfirm: undefined,
    // onCancel: undefined,
  });

  const { isOpen, style, ...rest } = contextMenuState;

  useEventListener(key, (data: ContextMenuState) => {
    setContextMenuState(prev => ({ ...prev, ...data }));
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setContextMenuState(prev => ({ ...prev, isOpen: false }));
    };
    window.addEventListener('click', handler, true);
    return () => window.removeEventListener('click', handler, true);
  }, [isOpen]);

  const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0';

  const position = `${style.top}_${style.height}`;

  const onSelect = (key: React.Key) => {
    console.log('action', key);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div key={position} className="fixed" style={style}>
          <motion.div
            className="border-small rounded-small border-default-100 bg-dark-deeper w-full max-w-[260px] origin-top-left px-1 py-2 backdrop-blur"
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 0.3,
                delayChildren: 0.2,
                staggerChildren: 0.05,
              },
            }}
            exit={{
              scale: 0,
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.2,
              },
            }}
          >
            <Listbox
              aria-label="Listbox menu with descriptions"
              variant="flat"
              onAction={onSelect}
            >
              <ListboxItem
                key="new"
                description="Create a new file"
                startContent={<AddNoteIcon className={iconClasses} />}
              >
                New file
              </ListboxItem>
              <ListboxItem
                key="copy"
                description="Copy the file link"
                startContent={<CopyDocumentIcon className={iconClasses} />}
              >
                Copy link
              </ListboxItem>
              {/* <ListboxItem
                key="edit"
                showDivider
                description="Allows you to edit the file"
                startContent={<EditDocumentIcon className={iconClasses} />}
              >
                Edit file
              </ListboxItem> */}
              <ListboxItem
                key="delete"
                className="text-danger"
                color="danger"
                description="Permanently delete the file"
                startContent={
                  <DeleteDocumentIcon
                    className={cx(iconClasses, 'text-danger')}
                  />
                }
              >
                Delete file
              </ListboxItem>
            </Listbox>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
