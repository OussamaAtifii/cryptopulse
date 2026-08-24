import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbState } from '@core/services/breadcrumb-state';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
})
export class Breadcrumbs {
  protected readonly breadcrumbState = inject(BreadcrumbState);
}
