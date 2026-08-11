import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinTablePaginationButton } from './coin-table-pagination-button';

describe('CoinTablePaginationButton', () => {
  let component: CoinTablePaginationButton;
  let fixture: ComponentFixture<CoinTablePaginationButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinTablePaginationButton],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinTablePaginationButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
