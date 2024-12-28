import { useEffect } from 'react';

export const useBlockScroll = (shouldBlock: boolean) => {
  useEffect(() => {
    if (shouldBlock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [shouldBlock]);
};
