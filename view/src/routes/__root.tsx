import { lazy, Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Noise } from '@/components';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then(res => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Noise />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});