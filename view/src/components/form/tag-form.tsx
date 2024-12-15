import { useState } from 'react';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Input,
} from '@nextui-org/react';

import { actions, useStore } from '@/store';

import { drawer } from '../drawer';

export const TagsForm = () => {
  const snippetSet = useStore().snippet.currentSet();
  const originTags = snippetSet.tags;
  const [tags, setTags] = useState(originTags);

  const onClose = () => {
    drawer.dismiss();
  };

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={() => {
        drawer.dismiss();
      }}
    >
      <DrawerHeader className="flex flex-col gap-1">Change Tags</DrawerHeader>
      <DrawerBody>
        {tags.map((tag, index) => (
          <Input
            key={index}
            value={tag}
            onValueChange={newVal => {
              setTags(tags.map((t, i) => (i === index ? newVal : t)));
            }}
            classNames={{
              inputWrapper:
                'hover:!bg-default-100 hover:opacity-80 !transition',
            }}
          />
        ))}
        <Button
          color="primary"
          variant="flat"
          onClick={() => {
            setTags([...tags, '']);
          }}
        >
          Add Tag
        </Button>
      </DrawerBody>
      <DrawerFooter>
        <Button color="danger" variant="flat" onClick={onClose}>
          Close
        </Button>
        <Button
          color="primary"
          onClick={() => {
            actions.snippet.modifyCurrentSet({ tags: tags.filter(Boolean) });
            onClose();
          }}
        >
          Comfirm
        </Button>
      </DrawerFooter>
    </form>
  );
};
