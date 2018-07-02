import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

import { routes } from '../../app.routes';

export class NabGroup {
  id: string;
  name: string;
  order: number;
}

export class Nav {
  constructor(
    public path: string,
    public name: string,
    public keywords: string[],
    public group?: NabGroup
  ) {}
}

@Injectable()
export class AppSidenavService {
  public navs: Nav[] = [];
  public active: string;

  constructor() {
    this.navs = routes
      .filter(route => route.data && route.data.name)
      .map(route => new Nav(route.path, route.data.name, route.data.keywords));
  }
}