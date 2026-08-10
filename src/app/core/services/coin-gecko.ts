import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Coin } from '@core/models/coin.model';

@Service()
export class CoinGecko {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.coingecko.com/api/v3';

  getMarketCoins() {
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('per_page', 5)
      .set('sparkline', true);

    return this.http.get<Coin[]>(this.baseUrl + '/coins/markets', {
      params,
    });
  }
}
