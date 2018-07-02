import { Component } from '@angular/core';

import { Nav, AppSidenavService } from './app-sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './app-sidenav.component.html',
  providers: [
    AppSidenavService
  ]
})
export class AppSidenavComponent {
  public navs: Nav[];
  public search: string = '';

  constructor(private sidenav: AppSidenavService) {
    this.navs = this.sidenav.navs;
  }

  handleSearchInput() {
    this.navs = this.sidenav.navs.filter(nav => nav.keywords.some(v => v.indexOf(this.search) > -1));
  }
}
