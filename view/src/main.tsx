import './styles/index.css';
import './styles/scrollbar.css';
import './env';

import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <RouterProvider router={router} />
  </NextUIProvider>
);
