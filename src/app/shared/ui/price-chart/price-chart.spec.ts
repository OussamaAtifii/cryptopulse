import { ComponentFixture, TestBed } from '@angular/core/testing';

const chartMocks = vi.hoisted(() => {
  const series = { setData: vi.fn() };
  const chart = {
    addSeries: vi.fn(() => series),
    remove: vi.fn(),
    resize: vi.fn(),
    timeScale: vi.fn(() => ({ fitContent: vi.fn() })),
  };

  return { createChart: vi.fn(() => chart) };
});

vi.mock('lightweight-charts', () => ({
  ColorType: { Solid: 'solid' },
  LineSeries: {},
  LineType: { Curved: 0 },
  createChart: chartMocks.createChart,
}));

import { PriceChart } from './price-chart';

describe('PriceChart', () => {
  let component: PriceChart;
  let fixture: ComponentFixture<PriceChart>;

  beforeEach(async () => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        disconnect = vi.fn();
        observe = vi.fn();
      }
    );

    await TestBed.configureTestingModule({
      imports: [PriceChart],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceChart);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', []);
    fixture.detectChanges();

    await fixture.whenStable();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
