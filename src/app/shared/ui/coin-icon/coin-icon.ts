import { Component, input } from '@angular/core';

@Component({
  selector: 'app-coin-icon',
  imports: [],
  templateUrl: './coin-icon.html',
})
export class CoinIcon {
  coinImage = input.required<string>();
  coinName = input.required<string>();

  size = input<'small' | 'big'>('small');
}
