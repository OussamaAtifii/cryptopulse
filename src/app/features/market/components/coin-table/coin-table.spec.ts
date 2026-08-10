import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinTable } from './coin-table';

describe('CoinTable', () => {
  let component: CoinTable;
  let fixture: ComponentFixture<CoinTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
