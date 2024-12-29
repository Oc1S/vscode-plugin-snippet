import { useState } from 'react';
import { Drawer as NextUIDrawer, DrawerContent } from '@nextui-org/react';

import { useEventListener } from '@/hooks';
import { trigger } from '@/lib/mitt';

export type DrawerState = {
  isOpen?: boolean;
  content?: React.ReactNode | ((onClose: Fn) => React.ReactNode);
  // onComfirm?: React.MouseEventHandler<HTMLButtonElement>;
  // onCancel?: React.MouseEventHandler<HTMLButtonElement>;
};

const key = 'drawer';

const drawerFunc = (data: { content: DrawerState['content'] }) => {
  trigger(key, { isOpen: true, ...data });
};

export const drawer = Object.assign(drawerFunc, {
  dismiss: () => {
    trigger(key, { isOpen: false });
  },
});

export const Drawer = () => {
  const [drawerState, setDrawerState] = useState<DrawerState>({
    isOpen: false,
    content: () => null,
    // title: null,
    // onComfirm: undefined,
    // onCancel: undefined,
  });

  const { content, ...rest } = drawerState;

  useEventListener(key, (data: DrawerState) => {
    setDrawerState(prev => ({ ...prev, ...data }));
  });

  return (
    <NextUIDrawer
      isOpen={drawerState.isOpen}
      onOpenChange={e => {
        setDrawerState(prev => ({ ...prev, isOpen: e }));
      }}
      backdrop="blur"
      {...rest}
    >
      <DrawerContent>
        {onClose => (
          <>{typeof content === 'function' ? content(onClose) : content}</>
        )}
      </DrawerContent>
    </NextUIDrawer>
  );
};
