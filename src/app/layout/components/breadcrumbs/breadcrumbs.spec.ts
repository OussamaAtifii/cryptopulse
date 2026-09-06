import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Breadcrumb, BreadcrumbState } from '@core/services/breadcrumb-state';

import { Breadcrumbs } from './breadcrumbs';

describe('Breadcrumbs', () => {
  let component: Breadcrumbs;
  let fixture: ComponentFixture<Breadcrumbs>;
  let mockBreadcrumbState: {
    breadcrumbs: ReturnType<typeof signal<Breadcrumb[]>>;
  };

  beforeEach(async () => {
    mockBreadcrumbState = {
      breadcrumbs: signal<Breadcrumb[]>([]),
    };

    await TestBed.configureTestingModule({
      imports: [Breadcrumbs],
      providers: [
        provideRouter([]),
        { provide: BreadcrumbState, useValue: mockBreadcrumbState },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Breadcrumbs);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockBreadcrumbState.breadcrumbs.set([{ label: 'Market', url: '/market' }]);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render nothing when there are no breadcrumbs', () => {
    mockBreadcrumbState.breadcrumbs.set([]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const nav = compiled.querySelector('nav');

    expect(nav?.children.length).toBe(0);
  });

  it('should render a single breadcrumb as text, not as a link', () => {
    mockBreadcrumbState.breadcrumbs.set([{ label: 'Market', url: '/market' }]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    const span = compiled.querySelector('span');

    expect(link).toBeNull();
    expect(span).toBeTruthy();
    expect(span?.textContent.trim()).toBe('Market');
  });

  it('should not render a chevron before the first breadcrumb', () => {
    mockBreadcrumbState.breadcrumbs.set([
      { label: 'Market', url: '/market' },
      { label: 'Coin', url: '/coin' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const chevrons = compiled.querySelectorAll('app-chevron-right');

    expect(chevrons.length).toBe(1);
  });

  it('should render a chevron between each breadcrumb', () => {
    mockBreadcrumbState.breadcrumbs.set([
      { label: 'Home', url: '/home' },
      { label: 'Market', url: '/market' },
      { label: 'Coin', url: '/coin' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const chevrons = compiled.querySelectorAll('app-chevron-right');

    expect(chevrons.length).toBe(2);
  });

  it('should render the last breadcrumb as a span, not a link', () => {
    mockBreadcrumbState.breadcrumbs.set([
      { label: 'Market', url: '/market' },
      { label: 'Coin', url: '/coin' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a');
    const span = compiled.querySelector('span');

    expect(links.length).toBe(1);
    expect(span?.textContent.trim()).toBe('Coin');
  });

  it('should render non-last breadcrumbs as links with the correct routerLink', () => {
    mockBreadcrumbState.breadcrumbs.set([
      { label: 'Market', url: '/market' },
      { label: 'Coin', url: '/coin' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');

    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('/market');
    expect(link?.textContent.trim()).toBe('Market');
  });
});
