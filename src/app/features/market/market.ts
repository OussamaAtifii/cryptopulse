import { Component } from '@angular/core';

import { CoinTable } from './components/coin-table/coin-table';

@Component({
  selector: 'app-market',
  imports: [CoinTable],
  templateUrl: './market.html',
})
export class Market {}
