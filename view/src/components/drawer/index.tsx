import { useState } from 'react';
import {
  Button,
  Drawer as NextUIDrawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerProps as NextUIDrawerProps,
} from '@nextui-org/react';

import { useEventListener } from '@/hooks/use-event-listener';
import { trigger } from '@/lib/mitt';

export type DrawerProps = Omit<NextUIDrawerProps, 'children'> & {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode | ((onClose: Fn) => React.ReactNode);
  onComfirm?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
};

const key = 'drawer';

const drawerFunc = (data: DrawerProps) => {
  trigger(key, { isOpen: true, ...data });
};

export const drawer = Object.assign(drawerFunc, {
  dismiss: () => {
    trigger(key, { isOpen: false });
  },
});

export const Drawer = () => {
  const [drawerState, setDrawerState] = useState<DrawerProps>({
    isOpen: false,
    header: null,
    body: null,
    footer: null,
    onComfirm: undefined,
    onCancel: undefined,
  });

  const { header, body, footer, onComfirm, onCancel, ...rest } = drawerState;

  useEventListener(key, (data: DrawerProps) => {
    setDrawerState(prev => ({ ...prev, ...data }));
  });

  const defaultFooter = (onClose: Fn) => (
    <>
      <Button
        color="danger"
        variant="flat"
        onClick={e => {
          onCancel?.(e);
          onClose();
        }}
      >
        Close
      </Button>
      <Button
        color="primary"
        onClick={e => {
          onComfirm?.(e);
          onClose();
        }}
      >
        Comfirm
      </Button>
    </>
  );

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
          <>
            {header && (
              <DrawerHeader className="flex flex-col gap-1">
                {header}
              </DrawerHeader>
            )}
            {body && <DrawerBody>{body}</DrawerBody>}
            <DrawerFooter>
              {typeof footer === 'function'
                ? footer(onClose)
                : footer || defaultFooter(onClose)}
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </NextUIDrawer>
  );
};
