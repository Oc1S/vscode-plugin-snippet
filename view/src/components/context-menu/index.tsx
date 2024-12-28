import { useState } from 'react';
import {} from '@nextui-org/react';

import { useEventListener } from '@/hooks';
import { trigger } from '@/lib/mitt';

export type ContextMenuState = {
  isOpen?: boolean;
  content?: React.ReactNode | ((onClose: Fn) => React.ReactNode);
  // onComfirm?: React.MouseEventHandler<HTMLButtonElement>;
  // onCancel?: React.MouseEventHandler<HTMLButtonElement>;
};

const key = 'contextmenu';

const contextMenuFunc = (data: { content: ContextMenuState['content'] }) => {
  trigger(key, { isOpen: true, ...data });
};

export const contextMenu = Object.assign(contextMenuFunc, {
  dismiss: () => {
    trigger(key, { isOpen: false });
  },
});

export const ContextMenu = () => {
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState>({
    isOpen: false,
    content: () => null,
    // title: null,
    // content: null,
    // onComfirm: undefined,
    // onCancel: undefined,
  });

  const { content, ...rest } = contextMenuState;

  useEventListener(key, (data: ContextMenuState) => {
    setContextMenuState(prev => ({ ...prev, ...data }));
  });

  return <div>1</div>;
};
