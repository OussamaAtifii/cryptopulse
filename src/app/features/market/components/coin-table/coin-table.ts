import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CoinGecko } from '@core/services/coin-gecko';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';
import { PriceChange } from '@shared/ui/price-change/price-change';

import { CoinTableSkeleton } from '../coin-table-skeleton/coin-table-skeleton';

@Component({
  selector: 'app-coin-table',
  imports: [CoinTableSkeleton, CurrencyPipe, ShortCurrencyPipe, PriceChange],
  templateUrl: './coin-table.html',
})
export class CoinTable {
  coinGecko = inject(CoinGecko);
}
