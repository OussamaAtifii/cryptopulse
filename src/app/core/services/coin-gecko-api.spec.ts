import { TestBed } from '@angular/core/testing';

import { CoinGeckoApi } from './coin-gecko-api';

describe('CoinGecko', () => {
  let service: CoinGeckoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinGeckoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
