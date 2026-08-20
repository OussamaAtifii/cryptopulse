import { Component, input } from '@angular/core';

@Component({
  selector: 'app-refresh',
  imports: [],
  templateUrl: './refresh.html',
})
export class Refresh {
  class = input<string>('size-5');
}
