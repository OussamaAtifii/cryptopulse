import { Component, input } from '@angular/core';

@Component({
  selector: 'app-arrow-left-dashed',
  imports: [],
  templateUrl: './arrow-left-dashed.html',
})
export class ArrowLeftDashed {
  class = input<string>('size-5');
}
