import { inject, Service, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Service()
export class BreadcrumbState {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private _breadcrumbs = signal<Breadcrumb[]>([]);
  readonly breadcrumbs = this._breadcrumbs.asReadonly();

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() =>
        this._breadcrumbs.set(this.buildBreadcrumbs(this.activatedRoute, ''))
      );
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string,
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeUrl = child.snapshot.url
        .map(segment => segment.path)
        .join('/');

      if (routeUrl !== '') {
        url += `/${routeUrl}`;
      }

      const breadcrumb = child.snapshot.data['breadcrumb'];

      const label =
        typeof breadcrumb === 'function'
          ? breadcrumb(child.snapshot.params)
          : breadcrumb;

      if (label) {
        breadcrumbs.push({ label: label, url });
      }

      if (child.children.length > 0) {
        return this.buildBreadcrumbs(child, url, breadcrumbs);
      }
    }

    return breadcrumbs;
  }
}
