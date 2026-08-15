import { Component, inject } from '@angular/core';
import { SortFilter } from '@core/models/coin-filters.model';
import { MarketState } from '@features/market/services/market-state';

@Component({
  selector: 'app-coin-filters',
  imports: [],
  templateUrl: './coin-filters.html',
})
export class CoinFilters {
  protected marketState = inject(MarketState);

  setFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.marketState.setSearchText(value);
  }

  filterClass(filter: SortFilter) {
    const isActive = this.marketState.sort() === filter;

    return isActive
      ? 'bg-primary text-black border-primary'
      : 'text-primary border-outline-variant';
  }
}
