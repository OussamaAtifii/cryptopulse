import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Coin } from '@core/models/coin.model';
import { CoinGecko } from '@core/services/coin-gecko';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';
import { PriceChange } from '@shared/ui/price-change/price-change';

@Component({
  selector: 'app-coin-table',
  imports: [CurrencyPipe, ShortCurrencyPipe, PriceChange],
  templateUrl: './coin-table.html',
})
export class CoinTable implements OnInit {
  coinGecko = inject(CoinGecko);

  coins = signal<Coin[]>([]);

  ngOnInit(): void {
    this.coinGecko.getMarketCoins().subscribe({
      next: value => {
        this.coins.set(value);
      },
    });
  }
}
