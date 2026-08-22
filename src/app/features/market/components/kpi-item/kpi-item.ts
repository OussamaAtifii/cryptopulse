import { Component, input } from '@angular/core';
import { MarketKpi } from '@features/market/models/market-kpi.model';
import { PriceChange } from '@shared/ui/price-change/price-change';

@Component({
  selector: 'app-kpi-item',
  imports: [PriceChange],
  templateUrl: './kpi-item.html',
})
export class KpiItem {
  kpi = input.required<MarketKpi>();
}
