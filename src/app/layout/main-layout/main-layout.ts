import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Breadcrumbs } from '@layout/components/breadcrumbs/breadcrumbs';

import { Sidebar } from '../components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, Breadcrumbs],
  templateUrl: './main-layout.html',
  styles: `
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }
  `,
})
export class MainLayout {}
