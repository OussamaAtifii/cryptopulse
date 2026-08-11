import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-coin-table-pagination-button',
  imports: [],
  templateUrl: './coin-table-pagination-button.html',
})
export class CoinTablePaginationButton {
  class = input<string>();

  buttonClicked = output();
}
