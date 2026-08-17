import { Component, input } from '@angular/core';

@Component({
  selector: 'app-coins',
  imports: [],
  templateUrl: './coins.html',
})
export class Coins {
  class = input<string>('size-5');
}
