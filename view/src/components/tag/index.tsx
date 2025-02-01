import { Chip } from '@nextui-org/react';

import { drawer } from '../drawer';
import { TagsForm } from '../form/tag-form';

export const Tag = ({ value }: { value: string }) => {
  const openFormDrawer = () => {
    drawer({
      content: <TagsForm />,
    });
  };
  return (
    <Chip
      key={value}
      color="primary"
      variant="flat"
      className="cursor-pointer hover:opacity-90"
      onClick={openFormDrawer}
      onContextMenu={openFormDrawer}
    >
      {value}
    </Chip>
  );
};
