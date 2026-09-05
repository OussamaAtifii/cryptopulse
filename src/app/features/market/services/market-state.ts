import { computed, debounced, inject, Service, signal } from '@angular/core';
import { CoinGeckoApi } from '@core/services/coin-gecko-api';

import { FIRST_PAGE, LAST_PAGE } from '../market.constants';

@Service()
export class MarketState {
  private readonly coinGeckoApi = inject(CoinGeckoApi);

  readonly searchText = signal<string>('');
  readonly page = signal<number>(FIRST_PAGE);
  readonly sort = signal<'gainers' | 'losers' | null>(null);
  readonly debouncedSearch = debounced(this.searchText, 300);

  readonly market = this.coinGeckoApi.getMarkets({ page: this.page });
  readonly geckoGlobal = this.coinGeckoApi.getGlobal();

  readonly filteredCoins = computed(() => {
    const coins = this.market.value() ?? [];

    const searchText = this.debouncedSearch.value();
    const sort = this.sort();

    if (!searchText && !sort) return coins;

    const filtered = coins.filter(
      coin =>
        coin.name.toLowerCase().includes(searchText) ||
        coin.symbol.toLowerCase().includes(searchText)
    );

    if (sort === 'gainers') {
      return filtered.sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );
    }

    if (sort === 'losers') {
      return filtered.sort(
        (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
      );
    }

    return filtered;
  });

  // Filters
  setSearchText(searchText: string) {
    this.searchText.set(searchText);
  }

  changeTopGainers() {
    if (this.sort() === 'gainers') {
      this.sort.set(null);
      return;
    }

    this.sort.set('gainers');
  }

  changeTopLosers() {
    if (this.sort() === 'losers') {
      this.sort.set(null);
      return;
    }

    this.sort.set('losers');
  }

  // Pagination
  changePage(page: number): void {
    if (page < 0) {
      return this.page.set(0);
    }

    this.page.set(page);
  }

  nextPage() {
    if (this.page() === LAST_PAGE) return;
    this.page.update(page => page + 1);
  }

  previousPage() {
    if (this.page() === FIRST_PAGE) return;
    this.page.update(page => page - 1);
  }
}
