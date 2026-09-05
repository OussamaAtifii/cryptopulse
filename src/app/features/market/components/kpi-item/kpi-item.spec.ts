import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketKpi } from '@features/market/models/market-kpi.model';

import { KpiItem } from './kpi-item';

describe('KpiItem', () => {
  let component: KpiItem;
  let fixture: ComponentFixture<KpiItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiItem],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiItem);
    component = fixture.componentInstance;
  });

  function setKpi(kpi: MarketKpi) {
    fixture.componentRef.setInput('kpi', kpi);
    fixture.detectChanges();
  }

  it('should create', () => {
    setKpi({ title: 'KPI Test', value: 45, hasPercentage: false });
    expect(component).toBeTruthy();
  });

  it('should show title and KPI value', () => {
    const mockKpi: MarketKpi = {
      title: 'KPI Test',
      value: 45,
      hasPercentage: false,
    };

    setKpi(mockKpi);

    const compiled = fixture.nativeElement as HTMLElement;

    const title = compiled.querySelector('[data-testid="kpi-title"]');
    const value = compiled.querySelector('[data-testid="kpi-value"]');

    expect(title?.textContent.trim()).toBe(mockKpi.title);
    expect(value?.textContent).toContain(mockKpi.value);
  });

  it('should render unit when it exists', () => {
    const mockKpi: MarketKpi = {
      title: 'KPI Test',
      value: 45,
      hasPercentage: false,
      unit: '%',
    };

    setKpi(mockKpi);

    const compiled = fixture.nativeElement as HTMLElement;

    const unit = compiled.querySelector('[data-testid="kpi-unit"]');

    expect(unit?.textContent.trim()).toBe(mockKpi.unit);
  });

  it('should not render unit span when there is no unit', () => {
    const mockKpi: MarketKpi = {
      title: 'KPI Test',
      value: 45,
      hasPercentage: false,
    };

    setKpi(mockKpi);

    const compiled = fixture.nativeElement as HTMLElement;

    const unit = compiled.querySelector('[data-testid="kpi-unit"]');

    expect(unit).toBeNull();
  });

  it('should render app-price-change when hasPercentage and percentage are provided', () => {
    const mockKpi: MarketKpi = {
      title: 'KPI Test',
      value: 45,
      hasPercentage: true,
      percentage: 50,
    };

    setKpi(mockKpi);

    const compiled = fixture.nativeElement as HTMLElement;

    const priceChange = compiled.querySelector('app-price-change');

    expect(priceChange).toBeTruthy();
    expect(priceChange?.textContent).contain('50.00%');
  });

  it('should not render app-price-change when hasPercentage is false', () => {
    const mockKpi: MarketKpi = {
      title: 'KPI Test',
      value: 45,
      hasPercentage: false,
    };

    setKpi(mockKpi);

    const compiled = fixture.nativeElement as HTMLElement;

    const priceChange = compiled.querySelector('app-price-change');

    expect(priceChange).toBeNull();
  });

  it('should not render app-price-change when hasPercentage is true and there is no percentage value', () => {
    const mockKpi: MarketKpi = {
      title: 'KPI Test',
      value: 45,
      hasPercentage: true,
    };

    setKpi(mockKpi);

    const compiled = fixture.nativeElement as HTMLElement;

    const priceChange = compiled.querySelector('app-price-change');

    expect(priceChange).toBeNull();
  });
});
