import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { CoinIcon } from '@shared/ui/coin-icon/coin-icon';

import { CoinDetailState } from './services/coin-detail-state';

@Component({
  selector: 'app-coin-detail',
  imports: [CoinIcon, CurrencyPipe],
  templateUrl: './coin-detail.html',
})
export class CoinDetail implements OnInit {
  protected readonly coinDetailState = inject(CoinDetailState);

  id = input.required<string>();

  ngOnInit(): void {
    this.coinDetailState.setCoinId(this.id());
  }
}
