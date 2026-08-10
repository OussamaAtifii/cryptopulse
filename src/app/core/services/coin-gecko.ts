import { httpResource } from '@angular/common/http';
import { computed, debounced, Service, signal } from '@angular/core';
import { Coin } from '@core/models/coin.model';
import { CoinFilters } from '@core/models/coin-filters.model';

@Service()
export class CoinGecko {
  private baseUrl = 'https://api.coingecko.com/api/v3';

  readonly filters = signal<CoinFilters>({
    filter: '',
    sort: null,
  });

  private debouncedSearch = debounced(this.filters, 300);

  readonly filteredCoins = computed(() => {
    const coins = this.marketCoins.value() ?? [];

    const { filter } = this.debouncedSearch.value();
    const { sort } = this.filters();

    if (!filter && !sort) return coins;

    const filtered = coins.filter(
      coin =>
        coin.name.toLowerCase().includes(filter) ||
        coin.symbol.toLowerCase().includes(filter)
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

  readonly marketCoins = httpResource<Coin[]>(() => ({
    url: this.baseUrl + '/coins/markets',
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 5,
      sparkline: true,
    },
  }));

  setFilter(filter: CoinFilters['filter']) {
    this.filters.update(value => ({
      ...value,
      filter: filter.toLowerCase().trim(),
    }));
  }

  changeTopGainers() {
    this.filters.update(value => ({
      ...value,
      sort: value.sort === 'gainers' ? null : 'gainers',
    }));
  }

  changeTopLosers() {
    this.filters.update(value => ({
      ...value,
      sort: value.sort === 'losers' ? null : 'losers',
    }));
  }
}
