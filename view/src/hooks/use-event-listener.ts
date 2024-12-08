import React, { useEffect } from 'react';
import { Handler } from 'mitt';

import { emitter, Events } from '@/lib/mitt';

export const useEventListener = <Key extends keyof Events>(
  eventname: Key,
  handler: Handler<Events[Key]>,
  deps: React.DependencyList = []
) => {
  useEffect(() => {
    emitter.on(eventname, handler);
    return () => emitter.off(eventname, handler);
  }, deps);
};
