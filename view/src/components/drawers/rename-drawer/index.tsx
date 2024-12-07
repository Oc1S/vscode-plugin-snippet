import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
} from '@nextui-org/react';

import { actions, useStore } from '@/store';

export function RenameDrawer() {
  const visible = useStore().drawer.rename();

  return (
    <>
      <Drawer isOpen={visible} onOpenChange={actions.drawer.rename}>
        <DrawerContent>
          {onClose => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Change Filename
              </DrawerHeader>
              <DrawerBody>
                <Input label="Name" placeholder="New Name" variant="bordered" />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Comfirm
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
