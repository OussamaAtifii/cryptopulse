import { Component, computed, effect, inject, input } from '@angular/core';
import { PricePoint } from '@core/models/price-point.model';
import { PriceChart } from '@shared/ui/price-chart/price-chart';
import dayjs from 'dayjs';

import { DetailHeader } from './components/detail-header/detail-header';
import { CoinDetailState } from './services/coin-detail-state';

@Component({
  selector: 'app-coin-detail',
  imports: [DetailHeader, PriceChart],
  templateUrl: './coin-detail.html',
})
export class CoinDetail {
  protected readonly coinDetailState = inject(CoinDetailState);

  id = input.required<string>();

  constructor() {
    effect(() => this.coinDetailState.setCoinId(this.id()));
  }

  chartData = computed<PricePoint[]>(() => {
    const prices = this.coinDetailState.coinPriceChartData.value()?.prices;

    if (!prices) return [];

    return prices.map(price => ({
      time: dayjs(price[0]).unix(),
      value: price[1],
    }));
  });

  private formatChartTime(time: number) {
    const date = new Date(time);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  }
}
