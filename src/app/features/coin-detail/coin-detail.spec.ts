import { Component, input, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PricePoint } from '@core/models/price-point.model';
import { CoinGeckoApi } from '@core/services/coin-gecko-api';
import { PriceChart } from '@shared/ui/price-chart/price-chart';

import { CoinDetail } from './coin-detail';

@Component({
  selector: 'app-price-chart',
  template: '',
})
class MockPriceChart {
  data = input<PricePoint[]>([]);
}

const mockCoinDetailResource = {
  isLoading: signal(false),
  value: signal(undefined),
};

const mockCoinPriceChartResource = {
  isLoading: signal(false),
  value: signal(undefined),
};

const mockCoinGeckoApi = {
  getCoinDetail: vi.fn(() => mockCoinDetailResource),
  getCoinMarketChartData: vi.fn(() => mockCoinPriceChartResource),
};

describe('CoinDetail', () => {
  let component: CoinDetail;
  let fixture: ComponentFixture<CoinDetail>;

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [CoinDetail],
      providers: [{ provide: CoinGeckoApi, useValue: mockCoinGeckoApi }],
    })
      .overrideComponent(CoinDetail, {
        remove: { imports: [PriceChart] },
        add: { imports: [MockPriceChart] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CoinDetail);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('id', 'Bitcoin');
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
