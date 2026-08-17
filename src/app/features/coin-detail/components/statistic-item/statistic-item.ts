import { Component, input } from '@angular/core';

@Component({
  selector: 'app-statistic-item',
  imports: [],
  templateUrl: './statistic-item.html',
})
export class StatisticItem {
  title = input.required<string>();
  value = input.required<string | number>();
}
