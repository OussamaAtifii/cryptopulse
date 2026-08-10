import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinFilters } from './coin-filters';

describe('CoinFilters', () => {
  let component: CoinFilters;
  let fixture: ComponentFixture<CoinFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
