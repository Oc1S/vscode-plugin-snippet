import { useForm } from 'react-hook-form';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Input,
} from '@nextui-org/react';

import { actions, store, useStore } from '@/store';

import { drawer } from '../drawer';

export type FilenameFormProps = {
  fileIndex: number;
};

export const FilenameForm = ({ fileIndex }: FilenameFormProps) => {
  const { handleSubmit, register } = useForm();
  const snippetSet = useStore().snippet.currentSet();
  const file = snippetSet.files[fileIndex];
  const { name } = file;

  const onClose = () => {
    drawer.dismiss();
  };
  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={handleSubmit(data => {
        actions.snippet.changeFilename(
          data.filename,
          store.snippet.codeSetIndex(),
          fileIndex
        );
        onClose();
      })}
    >
      <DrawerHeader className="flex flex-col gap-1">
        Change Filename
      </DrawerHeader>
      <DrawerBody>
        <Input
          label="Name"
          placeholder="New Name"
          variant="bordered"
          defaultValue={name}
          {...register('filename')}
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
