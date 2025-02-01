import { lazy, Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Drawer, Noise } from '@/components';
import { ContextMenu } from '@/components/context-menu';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then(res => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <>
        <ContextMenu />
        <Drawer />
      </>
      <Noise />
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
    </>
  ),
});
