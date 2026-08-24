import { Component, input } from '@angular/core';

@Component({
  selector: 'app-wallet',
  imports: [],
  templateUrl: './wallet.html',
})
export class Wallet {
  class = input<string>('size-5');
}
