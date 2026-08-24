import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chevron-right',
  imports: [],
  templateUrl: './chevron-right.html',
})
export class ChevronRight {
  class = input<string>('size-5');
}
