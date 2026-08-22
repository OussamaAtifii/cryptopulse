import { Routes } from '@angular/router';

import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: '/market',
        pathMatch: 'full',
      },
      {
        path: 'market',
        loadChildren: () =>
          import('@features/market/routes/market.routes').then(
            m => m.marketRoutes
          ),
      },
    ],
  },
];
