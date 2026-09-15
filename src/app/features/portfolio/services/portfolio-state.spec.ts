import { TestBed } from '@angular/core/testing';

import { PortfolioState } from './portfolio-state';

describe('PortfolioState', () => {
  let service: PortfolioState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
