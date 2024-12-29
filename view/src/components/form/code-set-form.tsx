import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from '@nextui-org/react';

import { actions, useStore } from '@/store';

import { drawer } from '../drawer';
import { Input } from '../input';
import { Form } from './form';

export const CodeSetForm = () => {
  const snippet = useStore().snippet.currentSet();

  const onSubmit: SubmitHandler<FieldValues> = data => {
    actions.snippet.modifyCurrentSet(data);
    onClose();
  };

  const onClose = () => {
    drawer.dismiss();
  };

  return (
    <Form onSubmit={onSubmit}>
      <DrawerHeader className="flex flex-col gap-1">
        Change Snippet
      </DrawerHeader>
      <DrawerBody>
        <Input
          label="Name"
          placeholder="New Name"
          variant="bordered"
          field="name"
          defaultValue={snippet.name}
        />
      </DrawerBody>
      <DrawerFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Close
        </Button>
        <Button type="submit" color="primary">
          Comfirm
        </Button>
      </DrawerFooter>
    </Form>
  );
};
