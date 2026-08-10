import { Routes } from '@angular/router';

export const marketRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../market').then(m => m.Market),
  },
];
