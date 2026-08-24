import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbState } from '@core/services/breadcrumb-state';
import { ChevronRight } from '@icons/chevron-right/chevron-right';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, ChevronRight],
  templateUrl: './breadcrumbs.html',
})
export class Breadcrumbs {
  protected readonly breadcrumbState = inject(BreadcrumbState);
}
