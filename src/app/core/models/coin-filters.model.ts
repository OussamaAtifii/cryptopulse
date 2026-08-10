export type SortFilter = 'gainers' | 'losers' | null;

export interface CoinFilters {
  filter: string;
  sort: SortFilter;
}
