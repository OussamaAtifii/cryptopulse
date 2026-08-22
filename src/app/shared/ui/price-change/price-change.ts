import { PercentPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-price-change',
  imports: [PercentPipe],
  templateUrl: './price-change.html',
})
export class PriceChange {
  percentage = input.required<number>();

  isNegative = computed(() => this.percentage() < 0);
  isZero = computed(() => this.percentage() === 0);

  percentageIcon = computed(() => {
    if (this.percentage() === 0) return '';

    return this.isNegative() ? '↓' : '↑';
  });

  percentageClass = computed(() => {
    if (this.isZero()) {
      return 'text-on-surface-variant bg-surface-container';
    }

    return this.isNegative()
      ? 'text-error bg-error/10'
      : 'text-success bg-success/10';
  });
}
