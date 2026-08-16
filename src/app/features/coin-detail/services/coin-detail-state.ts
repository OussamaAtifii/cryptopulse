import { inject, Service, signal } from '@angular/core';
import { ChartDays } from '@core/models/chart-days.model';
import { CoinGeckoApi } from '@core/services/coin-gecko-api';

@Service()
export class CoinDetailState {
  private readonly coinGeckoApi = inject(CoinGeckoApi);

  readonly coindId = signal<string>('');
  readonly chartDays = signal<ChartDays>(ChartDays.OneDay);

  readonly coinDetail = this.coinGeckoApi.getCoinDetail(this.coindId);
  readonly coinPriceChartData = this.coinGeckoApi.getCoinMarketChartData(
    this.coindId,
    this.chartDays
  );

  setCoinId(coinId: string) {
    this.coindId.set(coinId);
  }

  setChartDays(days: ChartDays) {
    this.chartDays.set(days);
  }
}
