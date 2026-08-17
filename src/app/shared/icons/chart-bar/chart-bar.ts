import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chart-bar',
  imports: [],
  templateUrl: './chart-bar.html',
})
export class ChartBar {
  class = input<string>('size-5');
}
