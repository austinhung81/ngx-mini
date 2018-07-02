import { Routes } from '@angular/router';

import { LandingComponent } from './common/landing/landing.component';
import { GettingStartedComponent } from './common/getting-started/getting-started.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'main',
    component: LandingComponent
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent
  },
  {
    path: 'button',
    data: {
      name: 'Button',
      keywords: [
        'buttons'
      ]
    },
    loadChildren: './demo/demo-button/demo-button.module#DemoButtonModule'
  },
  {
    path: 'loader',
    data: {
      name: 'Loader',
      keywords: [
        'loader',
        'spinner'
      ]
    },
    loadChildren: './demo/demo-loader/demo-loader.module#DemoLoaderModule'
  },
  {
    path: 'dropdown',
    data: {
      name: 'Dropdown',
      keywords: [
        'dropdowns'
      ]
    },
    loadChildren: './demo/demo-dropdown/demo-dropdown.module#DemoDropdownModule'
  },
  {
    path: 'navbar',
    data: {
      name: 'Navigation Bar',
      keywords: [
        'navigation',
        'navbar'
      ]
    },
    loadChildren: './demo/demo-navbar/demo-navbar.module#DemoNavbarModule'
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
