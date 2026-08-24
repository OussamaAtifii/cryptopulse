import { Routes } from '@angular/router';
import { MainLayout } from '@layout/main-layout/main-layout';

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
        data: { breadcrumb: 'market' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@features/market/market').then(m => m.Market),
          },
          {
            path: 'coin/:id',
            loadComponent: () =>
              import('@features/coin-detail/coin-detail').then(
                m => m.CoinDetail
              ),
            data: {
              breadcrumb: (params: Record<string, string>) => params['id'],
            },
          },
        ],
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('@features/portfolio/portfolio').then(m => m.Portfolio),
        data: { breadcrumb: 'portfolio' },
      },
    ],
  },
];
