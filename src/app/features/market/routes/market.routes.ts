import { Routes } from '@angular/router';

export const marketRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/market/market').then(m => m.Market),
  },
  {
    path: 'coin/:id',
    loadComponent: () =>
      import('@features/coin-detail/coin-detail').then(m => m.CoinDetail),
  },
];
