import { Routes } from '@angular/router';

export const marketRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/market/market').then(m => m.Market),
    data: { breadcrumb: 'market' },
  },
  {
    path: 'coin/:id',
    loadComponent: () =>
      import('@features/coin-detail/coin-detail').then(m => m.CoinDetail),
    data: {
      breadcrumb: (params: Record<string, string>) => params['id'],
    },
  },
];
