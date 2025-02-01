import React, { useEffect, useState } from 'react';
import { Listbox, ListboxItem, ListboxItemProps } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';

import { useEventListener } from '@/hooks';
import { trigger } from '@/lib/mitt';

export type ContextMenuState = {
  isOpen?: boolean;
  style?: React.CSSProperties;
  options?: ListboxItemProps[];
  onSelect?: (key: React.Key) => void;
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

const contextMenuFunc = (
  data: ContextMenuState & Required<Omit<ContextMenuState, 'isOpen'>>
) => {
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
    options: [],
    onSelect: () => {},
  });

  const { isOpen, style, options, onSelect } = contextMenuState;

  useEventListener(key, (data: ContextMenuState) => {
    setContextMenuState(prev => ({ ...prev, ...data }));
  });

  useEffect(() => {
    const handler = () => {
      setContextMenuState(prev => ({ ...prev, isOpen: false }));
    };
    window.addEventListener('click', handler, true);
    return () => window.removeEventListener('click', handler, true);
  }, []);

  const position = `${style.top ?? ''}_${style.right ?? ''}_${style.bottom ?? ''}_${style.left ?? ''}`;

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
              onAction={key => onSelect(key)}
            >
              {options.map(item => {
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
