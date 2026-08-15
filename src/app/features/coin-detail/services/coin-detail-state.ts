import { inject, Service, signal } from '@angular/core';
import { CoinGeckoApi } from '@core/services/coin-gecko-api';

@Service()
export class CoinDetailState {
  private readonly coinGeckoApi = inject(CoinGeckoApi);

  readonly coindId = signal<string>('');

  readonly coinDetail = this.coinGeckoApi.getCoinDetail(this.coindId);
}
