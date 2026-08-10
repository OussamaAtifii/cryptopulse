import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortCurrency',
})
export class ShortCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || isNaN(Number(value))) return '';

    if (value >= 1000000000000) {
      return (value / 1000000000000).toFixed(1) + 'T';
    }

    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + 'B';
    }

    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }

    return value.toString();
  }
}
