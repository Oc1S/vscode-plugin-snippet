import mitt from 'mitt';

import type { DrawerState } from '@/components';
import type { ContextMenuState } from '@/components/context-menu';

export type Events = {
  dropdown: boolean;
  drawer: DrawerState;
  'context-menu': ContextMenuState;
  'delete-file-comfirm': Fn;
};

export const emitter = mitt<Events>();
export const trigger = emitter.emit;
