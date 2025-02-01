import { ListboxItemProps } from '@nextui-org/react';

import { actions } from '@/store';
import { cx } from '@/utils';

import { drawer } from '../drawer';
import { CodeSetForm } from '../form/code-set-form';
import { contextMenu } from '.';
import { AddNoteIcon, DeleteDocumentIcon, EditDocumentIcon } from './icons';

const iconClasses =
  'text-xl text-default-500 pointer-events-none flex-shrink-0';

export const snippetMenu = (config: {
  snippet: ICodeSet;
  style: React.CSSProperties;
}) => {
  contextMenu({
    style: config.style,
    options: [
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
    onSelect(key: React.Key) {
      switch (key) {
        case 'new':
          actions.snippet.addCodeSet();
          break;
        case 'edit':
          drawer({
            content: <CodeSetForm />,
          });
          break;
        case 'delete':
          actions.snippet.removeCodeSetById(config.snippet.id);
          break;
        default:
          break;
      }
    },
  });
};
