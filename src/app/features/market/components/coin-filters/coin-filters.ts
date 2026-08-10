import { Component, inject } from '@angular/core';
import { SortFilter } from '@core/models/coin-filters.model';
import { CoinGecko } from '@core/services/coin-gecko';

@Component({
  selector: 'app-coin-filters',
  imports: [],
  templateUrl: './coin-filters.html',
})
export class CoinFilters {
  protected coinGecko = inject(CoinGecko);

  setFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.coinGecko.setFilter(value);
  }

  filterClass(filter: SortFilter) {
    const isActive = this.coinGecko.filters().sort === filter;

    return isActive
      ? 'bg-primary text-black border-primary'
      : 'text-primary border-outline-variant';
  }
}
