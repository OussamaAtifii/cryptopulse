import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinTablePagination } from './coin-table-pagination';

describe('CoinTablePagination', () => {
  let component: CoinTablePagination;
  let fixture: ComponentFixture<CoinTablePagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinTablePagination],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinTablePagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
