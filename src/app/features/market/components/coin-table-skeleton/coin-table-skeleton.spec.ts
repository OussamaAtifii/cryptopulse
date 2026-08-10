import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinTableSkeleton } from './coin-table-skeleton';

describe('CoinTableSkeleton', () => {
  let component: CoinTableSkeleton;
  let fixture: ComponentFixture<CoinTableSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinTableSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinTableSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
