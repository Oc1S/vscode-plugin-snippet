import './styles/index.css';
import './styles/scrollbar.css';

import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { createRouter, RouterProvider } from '@tanstack/react-router';

window.process = window.process || {};

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

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
