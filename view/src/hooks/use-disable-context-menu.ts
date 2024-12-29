import { useEffect } from 'react';

export const useDisableContextMenu = () => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      event.preventDefault();
    };
    document.addEventListener('contextmenu', handler);
    return () => document.removeEventListener('contextmenu', handler);
  }, []);
};
