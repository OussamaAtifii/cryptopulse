import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chart-line',
  imports: [],
  templateUrl: './chart-line.html',
})
export class ChartLine {
  class = input<string>('size-5');
}
