import { Component, input } from '@angular/core';

@Component({
  selector: 'app-barrier-block',
  imports: [],
  templateUrl: './barrier-block.html',
})
export class BarrierBlock {
  class = input<string>('size-5');
}
