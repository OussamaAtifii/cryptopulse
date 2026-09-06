import { DecimalPipe } from '@angular/common';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoinGeckoApi } from '@core/services/coin-gecko-api';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';

import { Market } from './market';

const mockMarketResource = {
  error: signal(undefined),
  isLoading: signal(false),
  value: signal([]),
};

const mockGeckoGlobalResource = {
  error: signal(undefined),
  isLoading: signal(false),
  value: signal(undefined),
};

const mockCoinGeckoApi = {
  getGlobal: vi.fn(() => mockGeckoGlobalResource),
  getMarkets: vi.fn(() => mockMarketResource),
};

describe('Market', () => {
  let component: Market;
  let fixture: ComponentFixture<Market>;

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Market],
      providers: [
        ShortCurrencyPipe,
        DecimalPipe,
        { provide: CoinGeckoApi, useValue: mockCoinGeckoApi },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Market);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
