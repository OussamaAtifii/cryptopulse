import { Component, input } from '@angular/core';

@Component({
  selector: 'app-arrow-right-dashed',
  imports: [],
  templateUrl: './arrow-right-dashed.html',
})
export class ArrowRightDashed {
  class = input<string>('size-5');
}
