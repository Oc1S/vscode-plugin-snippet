import { useState } from 'react';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from '@nextui-org/react';
import { motion } from 'framer-motion';

import { actions, useStore } from '@/store';

import { drawer } from '../drawer';
import { Input } from '../input';

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
      <DrawerBody className="pb-40">
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
        <motion.div layout>
          <Button
            fullWidth
            color="primary"
            variant="flat"
            onPress={() => {
              setTags([...tags, '']);
            }}
          >
            Add Tag
          </Button>
        </motion.div>
      </DrawerBody>
      <DrawerFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Close
        </Button>
        <Button
          color="primary"
          onPress={() => {
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
