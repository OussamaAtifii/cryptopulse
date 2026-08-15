import { TestBed } from '@angular/core/testing';

import { CoinDetailState } from './coin-detail-state';

describe('CoinDetailState', () => {
  let service: CoinDetailState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinDetailState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
