import { Component, inject } from '@angular/core';
import { CoinGecko } from '@core/services/coin-gecko';
import { ArrowLeftDashed } from '@icons/arrow-left-dashed/arrow-left-dashed';
import { ArrowRightDashed } from '@icons/arrow-right-dashed/arrow-right-dashed';

import { CoinTablePaginationButton } from '../coin-table-pagination-button/coin-table-pagination-button';

@Component({
  selector: 'app-coin-table-pagination',
  imports: [ArrowLeftDashed, ArrowRightDashed, CoinTablePaginationButton],
  templateUrl: './coin-table-pagination.html',
})
export class CoinTablePagination {
  protected coinGecko = inject(CoinGecko);

  changePage(page: number) {
    this.coinGecko.changePage(page);
  }
}
