import {
  afterNextRender,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { PricePoint } from '@core/models/price-point.model';
import {
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
  LineData,
  LineSeries,
  LineType,
} from 'lightweight-charts';

@Component({
  selector: 'app-price-chart',
  imports: [],
  templateUrl: './price-chart.html',
})
export class PriceChart {
  data = input.required<PricePoint[]>();

  private readonly chartContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('chartContainer');

  private chart: IChartApi | null = null;
  private series: ISeriesApi<'Line'> | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.initChart();
      this.setupResizeObserver();

      this.updateChart(this.data());
    });

    effect(() => {
      const points = this.data();

      if (!this.series || !points.length) {
        return;
      }

      this.updateChart(points);
    });

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.chart?.remove();
    });
  }

  private updateChart(points: PricePoint[]): void {
    if (!this.series) {
      return;
    }

    this.series.setData(points as LineData[]);
    this.chart?.timeScale().fitContent();
  }

  private initChart(): void {
    const container = this.chartContainer().nativeElement;

    this.chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight || 300,

      layout: {
        background: {
          type: ColorType.Solid,
          color: 'transparent',
        },
        textColor: '#94a3b8',
        fontFamily: 'Inter, sans-serif',
        fontSize: 12,
      },

      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },

      crosshair: {
        mode: 1,
        vertLine: {
          color: '#64748b',
          width: 1,
          style: 2,
          labelBackgroundColor: '#1e293b',
        },
        horzLine: {
          color: '#64748b',
          width: 1,
          style: 2,
          labelBackgroundColor: '#1e293b',
        },
      },

      rightPriceScale: {
        borderVisible: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },

      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 5,
        barSpacing: 8,
      },

      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },

      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    this.series = this.chart.addSeries(LineSeries, {
      color: '#58a6ff',
      lineWidth: 2,
      lineType: LineType.Curved,

      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,

      lastValueVisible: false,
      priceLineVisible: false,

      priceFormat: {
        type: 'custom',
        formatter: (price: number) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price),
      },
    });
  }

  private setupResizeObserver(): void {
    const container = this.chartContainer().nativeElement;

    this.resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry || !this.chart) {
        return;
      }

      const { width, height } = entry.contentRect;

      this.chart.resize(width, height);
    });

    this.resizeObserver.observe(container);
  }
}
