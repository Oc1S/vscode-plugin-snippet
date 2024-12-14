import mitt from 'mitt';

import type { DrawerState } from '@/components';

export type Events = {
  drawer: DrawerState;
};

export const emitter = mitt<Events>();
export const trigger = emitter.emit;
