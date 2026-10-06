import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'feed',
    renderMode: RenderMode.Client
  },
  {
    path: 'profile',
    renderMode: RenderMode.Client
  },
  {
    path: 'profile/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'notifications',
    renderMode: RenderMode.Client
  },
  {
    path: 'change-password',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
