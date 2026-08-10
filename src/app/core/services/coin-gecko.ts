import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Coin } from '@core/models/coin.model';

@Service()
export class CoinGecko {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.coingecko.com/api/v3';

  marketCoins = httpResource<Coin[]>(() => ({
    url: this.baseUrl + '/coins/markets',
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 5,
      sparkline: true,
    },
  }));
}
