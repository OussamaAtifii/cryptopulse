import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[coinTableSkeleton]',
  imports: [],
  templateUrl: './coin-table-skeleton.html',
  styles: `
    :host {
      height: 64px;
    }
  `,
})
export class CoinTableSkeleton {}
