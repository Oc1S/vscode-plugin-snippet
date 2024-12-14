import { useForm } from 'react-hook-form';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Input,
} from '@nextui-org/react';

import { actions, store, useStore } from '@/store';
export type FilenameFormProps = {
  fileIndex: number;
  onClose: Fn;
};

export const FilenameForm = ({ fileIndex, onClose }: FilenameFormProps) => {
  const { handleSubmit, register } = useForm();
  const snippetSet = useStore().snippet.currentSet();
  const file = snippetSet.files[fileIndex];
  const { name } = file;
  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={handleSubmit(data => {
        console.log(data, '@');
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
        <Button color="danger" variant="flat" onClick={onClose}>
          Close
        </Button>
        <Button type="submit" color="primary">
          Comfirm
        </Button>
      </DrawerFooter>
    </form>
  );
};
