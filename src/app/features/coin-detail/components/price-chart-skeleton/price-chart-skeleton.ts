import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ChartDays } from '@core/models/chart-days.model';

@Component({
  selector: 'app-price-chart-skeleton',
  imports: [KeyValuePipe],
  templateUrl: './price-chart-skeleton.html',
})
export class DetailSkeleton {
  protected readonly ChartDays = ChartDays;
}
