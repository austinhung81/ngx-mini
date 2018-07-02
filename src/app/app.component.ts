import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header title="NGX-MINI"></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent {}
