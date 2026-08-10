import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChange } from './price-change';

describe('PriceChange', () => {
  let component: PriceChange;
  let fixture: ComponentFixture<PriceChange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceChange],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceChange);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
