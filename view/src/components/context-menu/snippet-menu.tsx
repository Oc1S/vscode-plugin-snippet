import { ListboxItemProps } from '@nextui-org/react';

import { cx } from '@/utils';

import { contextMenu } from '.';
import { AddNoteIcon, DeleteDocumentIcon, EditDocumentIcon } from './icons';

const iconClasses =
  'text-xl text-default-500 pointer-events-none flex-shrink-0';

export const snippetMenu = (style: React.CSSProperties) => {
  contextMenu({
    style,
    list: [
      {
        id: 'new',
        children: 'New Snippet',
        startContent: <AddNoteIcon className={iconClasses} />,
      },
      {
        id: 'edit',
        children: 'Edit Snippet',
        startContent: <EditDocumentIcon className={iconClasses} />,
        showDivider: true,
      },
      {
        id: 'delete',
        className: 'text-danger',
        children: 'Delete Snippet',
        color: 'danger',
        startContent: (
          <DeleteDocumentIcon className={cx(iconClasses, 'text-danger')} />
        ),
      },
    ] satisfies ListboxItemProps[],
  });
};
