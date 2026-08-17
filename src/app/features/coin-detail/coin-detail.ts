import { KeyValue, KeyValuePipe } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { ChartDays, ChartDaysLabel } from '@core/models/chart-days.model';
import { PricePoint } from '@core/models/price-point.model';
import { ChartBar } from '@icons/chart-bar/chart-bar';
import { Coins } from '@icons/coins/coins';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';
import { Button } from '@shared/ui/button/button';
import { PriceChart } from '@shared/ui/price-chart/price-chart';
import dayjs from 'dayjs';

import { DetailHeader } from './components/detail-header/detail-header';
import { DetailHeaderSkeleton } from './components/detail-header-skeleton/detail-header-skeleton';
import { StatisticItem } from './components/statistic-item/statistic-item';
import { CoinDetailState } from './services/coin-detail-state';

@Component({
  selector: 'app-coin-detail',
  imports: [
    DetailHeader,
    PriceChart,
    Button,
    DetailHeaderSkeleton,
    KeyValuePipe,
    ShortCurrencyPipe,
    StatisticItem,
    Coins,
    ChartBar,
  ],
  templateUrl: './coin-detail.html',
})
export class CoinDetail {
  protected readonly coinDetailState = inject(CoinDetailState);

  protected readonly ChartDays = ChartDays;
  protected readonly ChartDaysLabel = ChartDaysLabel;

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

  originalOrder = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    a: KeyValue<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    b: KeyValue<string, string>
  ): number => {
    return 0;
  };
}
