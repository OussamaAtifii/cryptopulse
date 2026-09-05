import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinIcon } from './coin-icon';

describe('CoinIcon', () => {
  let component: CoinIcon;
  let fixture: ComponentFixture<CoinIcon>;

  const mockCoinImage = 'https://image.com';
  const mockCoinName = 'Bitcoin';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinIcon);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('coinImage', mockCoinImage);
    fixture.componentRef.setInput('coinName', mockCoinName);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
