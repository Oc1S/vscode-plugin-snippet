import React, { useEffect, useState } from 'react';
import { Listbox, ListboxItem, ListboxItemProps } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';

import { useEventListener } from '@/hooks';
import { trigger } from '@/lib/mitt';
import { actions } from '@/store';
import { cx } from '@/utils';

import { drawer } from '../drawer';
import { CodeSetForm } from '../form/code-set-form';
import { AddNoteIcon, DeleteDocumentIcon, EditDocumentIcon } from './icons';

export type ContextMenuState = {
  isOpen?: boolean;
  list?: ListboxItemProps[];
  style?: React.CSSProperties;
};

const menuVariant = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.3,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
  exit: {
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

const iconClasses =
  'text-xl text-default-500 pointer-events-none flex-shrink-0';
const list: ListboxItemProps[] = [
  {
    id: 'new',
    children: 'New Snippet',
    startContent: <AddNoteIcon className={iconClasses} />,
  },
  {
    id: 'edit',
    children: 'Edit Snippet',
    startContent: <EditDocumentIcon className={iconClasses} />,
    showDivider: true,
  },
  {
    id: 'delete',
    className: 'text-danger',
    children: 'Delete Snippet',
    color: 'danger',
    startContent: (
      <DeleteDocumentIcon className={cx(iconClasses, 'text-danger')} />
    ),
  },
];

export const ContextMenu = () => {
  const [contextMenuState, setContextMenuState] = useState<
    Required<ContextMenuState>
  >({
    isOpen: false,
    style: {},
    list: [],
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

  const position = `${style.top}_${style.height}`;

  const onSelect = (key: React.Key) => {
    console.log('action', key);
    switch (key) {
      case 'new':
        actions.snippet.addCodeSet();
        break;
      case 'edit':
        drawer({
          content: <CodeSetForm />,
        });
        break;
      case 'delete':
      default:
        break;
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div key={position} className="fixed" style={style}>
          <motion.div
            className="border-small rounded-small border-default-100 bg-dark-deeper w-full max-w-[260px] origin-top-left px-1 py-2 backdrop-blur"
            {...menuVariant}
          >
            <Listbox
              aria-label="context-menu"
              variant="flat"
              onAction={onSelect}
            >
              {list.map(item => {
                const { id, ...rest } = item;
                return <ListboxItem key={id} {...rest} />;
              })}
            </Listbox>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
