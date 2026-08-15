import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CoinGecko } from '@core/services/coin-gecko';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';
import { CoinIcon } from '@shared/ui/coin-icon/coin-icon';
import { PriceChange } from '@shared/ui/price-change/price-change';

import { CoinFilters } from '../coin-filters/coin-filters';
import { CoinTablePagination } from '../coin-table-pagination/coin-table-pagination';
import { CoinTableSkeleton } from '../coin-table-skeleton/coin-table-skeleton';

@Component({
  selector: 'app-coin-table',
  imports: [
    CoinTableSkeleton,
    CoinFilters,
    CurrencyPipe,
    ShortCurrencyPipe,
    PriceChange,
    CoinTablePagination,
    CoinIcon,
  ],
  templateUrl: './coin-table.html',
})
export class CoinTable {
  coinGecko = inject(CoinGecko);
}
