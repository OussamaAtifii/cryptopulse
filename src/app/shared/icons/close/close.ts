import { Component, input } from '@angular/core';

@Component({
  selector: 'app-close',
  imports: [],
  templateUrl: './close.html',
})
export class Close {
  class = input<string>('size-5');
}
