import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chevrons-up',
  imports: [],
  templateUrl: './chevrons-up.html',
})
export class ChevronsUp {
  class = input<string>('size-5');
}
