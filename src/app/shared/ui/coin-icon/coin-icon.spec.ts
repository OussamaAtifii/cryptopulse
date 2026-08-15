import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinIcon } from './coin-icon';

describe('CoinIcon', () => {
  let component: CoinIcon;
  let fixture: ComponentFixture<CoinIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
