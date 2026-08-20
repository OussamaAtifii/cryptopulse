import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chevrons-down',
  imports: [],
  templateUrl: './chevrons-down.html',
})
export class ChevronsDown {
  class = input<string>('size-5');
}
