import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';

import { CoinTable } from './components/coin-table/coin-table';
import { KpiItem } from './components/kpi-item/kpi-item';
import { KpiItemSkeleton } from './components/kpi-item-skeleton/kpi-item-skeleton';
import { MarketKpi } from './models/market-kpi.model';
import { MarketState } from './services/market-state';

@Component({
  selector: 'app-market',
  imports: [CoinTable, KpiItem, KpiItemSkeleton],
  templateUrl: './market.html',
})
export class Market {
  protected readonly marketState = inject(MarketState);

  private readonly shortCurrencyPipe = inject(ShortCurrencyPipe);
  private readonly decimalPipe = inject(DecimalPipe);

  kpis = computed<MarketKpi[]>(() => {
    const geckoGlobal = this.marketState.geckoGlobal.value()?.data;

    if (!geckoGlobal) return [];

    return [
      {
        title: 'Total Market Cap',
        value: this.shortCurrencyPipe.transform(
          geckoGlobal.total_market_cap?.['usd']
        ),
        hasPercentage: true,
        percentage: geckoGlobal.market_cap_change_percentage_24h_usd,
      },
      {
        title: ' 24h Trading Volume',
        value: this.shortCurrencyPipe.transform(
          geckoGlobal.total_volume?.['usd']
        ),
        hasPercentage: true,
        percentage: geckoGlobal.volume_change_percentage_24h_usd,
      },
      {
        title: 'Bitcoin Dominance',
        value:
          this.decimalPipe.transform(
            geckoGlobal.market_cap_percentage?.['btc'],
            '1.2-2'
          ) ?? 0,
        hasPercentage: false,
        unit: '%',
      },
    ];
  });
}
