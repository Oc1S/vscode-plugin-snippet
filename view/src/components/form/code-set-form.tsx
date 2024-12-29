import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from '@nextui-org/react';

import { actions, useStore } from '@/store';

import { drawer } from '../drawer';
import { Input } from '../input';
// import { Input } from '../input';

export const CodeSetForm = () => {
  const { handleSubmit, register } = useForm();
  const snippet = useStore().snippet.currentSet();

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(data, '2@@');
    actions.snippet.modifyCurrentSet(data);
    // onClose();
  };

  const onClose = () => {
    drawer.dismiss();
  };

  return (
    <form className="flex flex-1 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <DrawerHeader className="flex flex-col gap-1">
        Change Snippet
      </DrawerHeader>
      <DrawerBody>
        <Input
          label="Name"
          placeholder="New Name"
          variant="bordered"
          // defaultValue={snippet.name}
          {...register('name1')}
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
    </form>
  );
};
