import { TestBed } from '@angular/core/testing';

import { CoinGecko } from './coin-gecko';

describe('CoinGecko', () => {
  let service: CoinGecko;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinGecko);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
