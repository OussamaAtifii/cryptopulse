import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MarketState } from '@features/market/services/market-state';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';
import { PriceChange } from '@shared/ui/price-change/price-change';

import { CoinFilters } from '../coin-filters/coin-filters';
import { CoinTablePagination } from '../coin-table-pagination/coin-table-pagination';
import { CoinTable } from './coin-table';

@Component({ selector: 'app-coin-filters', template: '' })
class MockCoinFilters {}

@Component({ selector: 'app-coin-table-pagination', template: '' })
class MockCoinTablePagination {}

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

describe('CoinTable', () => {
  let component: CoinTable;
  let fixture: ComponentFixture<CoinTable>;
  let compiled: HTMLElement;
  let mockMarketState: {
    market: {
      isLoading: ReturnType<typeof signal<boolean>>;
      error: ReturnType<typeof signal<unknown>>;
      value: ReturnType<typeof signal<Coin[] | undefined>>;
    };
    filteredCoins: ReturnType<typeof signal<Coin[]>>;
  };

  beforeEach(async () => {
    mockMarketState = {
      market: {
        isLoading: signal(false),
        error: signal(undefined),
        value: signal(undefined),
      },
      filteredCoins: signal([]),
    };

    await TestBed.configureTestingModule({
      imports: [CoinTable],
      providers: [{ provide: MarketState, useValue: mockMarketState }],
    })
      .overrideComponent(CoinTable, {
        remove: { imports: [CoinFilters, CoinTablePagination] },
        add: { imports: [MockCoinFilters, MockCoinTablePagination] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CoinTable);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 skeleton rows when market is loading', () => {
    mockMarketState.market.isLoading.set(true);
    fixture.detectChanges();

    const skeletons = compiled.querySelectorAll('tr[coinTableSkeleton]');

    expect(skeletons.length).toBe(5);
  });

  it('should render error message when market has an error', () => {
    mockMarketState.market.error.set({});
    fixture.detectChanges();

    const errorRow = compiled.querySelector(
      '[data-testid="market-data-error-row"]'
    );

    expect(errorRow).toBeTruthy();
  });

  it('should not render skeleton rows or coin rows when there is an error', () => {
    mockMarketState.market.error.set({});
    fixture.detectChanges();

    const coinRows = compiled.querySelectorAll('[data-testid="coin-row"]');
    const skeletonRows = compiled.querySelectorAll('tr[coinTableSkeleton]');

    expect(coinRows.length).toBe(0);
    expect(skeletonRows.length).toBe(0);
  });

  it('should not render skeleton rows or error message when coins are loaded successfully', () => {
    const mockCoin: Coin = {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image:
        'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 77343,
      price_change_percentage_24h: -0.72455,
      market_cap: 1553306741339,
      total_volume: 18715319967,
    };
    mockMarketState.filteredCoins.set([mockCoin]);
    fixture.detectChanges();

    const skeletonRows = compiled.querySelectorAll('tr[coinTableSkeleton]');
    const errorRow = compiled.querySelector(
      '[data-testid="market-data-error-row"]'
    );

    expect(skeletonRows.length).toBe(0);
    expect(errorRow).toBeNull();
  });

  it('should render a row for each coin in filteredCoins', () => {
    mockMarketState.filteredCoins.set([
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        image:
          'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
        current_price: 77343,
        price_change_percentage_24h: -0.72455,
        market_cap: 1553306741339,
        total_volume: 18715319967,
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'eth',
        image:
          'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
        current_price: 2530.2,
        price_change_percentage_24h: -1.855,
        market_cap: 308851260590,
        total_volume: 11005224843,
      },
    ]);
    fixture.detectChanges();

    const coinRows = compiled.querySelectorAll('[data-testid="coin-row"]');

    expect(coinRows.length).toBe(mockMarketState.filteredCoins().length);
  });

  it('should display coin name and symbol', () => {
    const mockCoin: Coin = {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image:
        'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 77343,
      price_change_percentage_24h: -0.72455,
      market_cap: 1553306741339,
      total_volume: 18715319967,
    };
    mockMarketState.filteredCoins.set([mockCoin]);
    fixture.detectChanges();

    const coinRows = compiled.querySelectorAll('[data-testid="coin-row"]');
    expect(coinRows.length).toBe(1);

    const coinName = coinRows[0].querySelector('[data-testid="coin-name"]');
    const coinSymbol = coinRows[0].querySelector('[data-testid="coin-symbol"]');

    expect(coinName?.textContent.trim()).toBe(mockCoin.name);
    expect(coinSymbol?.textContent.trim()).toBe(mockCoin.symbol);
  });

  it('should format current_price with the currency pipe', () => {
    const currencyPipe = new CurrencyPipe('en-US');

    const mockCoin: Coin = {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image:
        'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 77343,
      price_change_percentage_24h: -0.72455,
      market_cap: 1553306741339,
      total_volume: 18715319967,
    };
    mockMarketState.filteredCoins.set([mockCoin]);
    fixture.detectChanges();

    const currentPriceCell = compiled.querySelector(
      '[data-testid="current-price-cell"]'
    );
    const expected = currencyPipe.transform(mockCoin.current_price);

    expect(currentPriceCell?.textContent.trim()).toBe(expected);
  });

  it('should pass the correct percentage to app-price-change', () => {
    const mockCoin: Coin = {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image:
        'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 77343,
      price_change_percentage_24h: -0.72455,
      market_cap: 1553306741339,
      total_volume: 18715319967,
    };
    mockMarketState.filteredCoins.set([mockCoin]);
    fixture.detectChanges();

    const priceChangeDebugEl = fixture.debugElement.query(
      By.directive(PriceChange)
    );

    expect(priceChangeDebugEl.componentInstance.percentage()).toBe(
      mockCoin.price_change_percentage_24h
    );
  });

  it('should format market_cap and total_volume with shortCurrency', () => {
    const shortCurrencyPipe = new ShortCurrencyPipe();
    const mockCoin: Coin = {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image:
        'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 77343,
      price_change_percentage_24h: -0.72455,
      market_cap: 1553306741339,
      total_volume: 18715319967,
    };
    mockMarketState.filteredCoins.set([mockCoin]);
    fixture.detectChanges();

    const coinRows = compiled.querySelectorAll('[data-testid="coin-row"]');
    const marketCap = coinRows[0].querySelector(
      '[data-testid="market-cap-cell"]'
    );
    const totalVolume = coinRows[0].querySelector(
      '[data-testid="total-volume-cell"]'
    );

    const expectedMarketCap = shortCurrencyPipe.transform(mockCoin.market_cap);
    const expectedTotalVolume = shortCurrencyPipe.transform(
      mockCoin.total_volume
    );

    expect(marketCap?.textContent.trim()).toBe(expectedMarketCap);
    expect(totalVolume?.textContent.trim()).toBe(expectedTotalVolume);
  });

  it('should render an empty table body when filteredCoins is empty', () => {
    mockMarketState.filteredCoins.set([]);
    fixture.detectChanges();

    const table = compiled.querySelector('tbody');

    expect(table?.children.length).toBe(0);
  });

  it('should call navigateToCoinDetail with the coin id when a row is clicked', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate');

    const mockCoin: Coin = {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image:
        'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 77343,
      price_change_percentage_24h: -0.72455,
      market_cap: 1553306741339,
      total_volume: 18715319967,
    };
    mockMarketState.filteredCoins.set([mockCoin]);
    fixture.detectChanges();

    const row = compiled.querySelector(
      '[data-testid="coin-row"]'
    ) as HTMLElement;
    row.click();

    expect(navigateSpy).toHaveBeenCalledWith(['/market', 'coin', mockCoin.id]);
  });
});
