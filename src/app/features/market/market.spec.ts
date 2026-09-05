import { DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';

import { Market } from './market';

describe('Market', () => {
  let component: Market;
  let fixture: ComponentFixture<Market>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Market],
      providers: [ShortCurrencyPipe, DecimalPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(Market);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
