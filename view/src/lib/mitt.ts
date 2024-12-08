import mitt from 'mitt';

import type { DrawerProps } from '@/components';

export type Events = {
  drawer: DrawerProps;
};

export const emitter = mitt<Events>();
export const trigger = emitter.emit;
