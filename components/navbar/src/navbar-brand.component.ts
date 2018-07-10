import { Component } from '@angular/core';

@Component({
  selector: '[nm-navbar-brand]',
  template: '<ng-content></ng-content>',
  host: {
    'nm-navbar-brand': 'true'
  }
})
export class MiniNavbarBrandComponent {

  constructor() { }
}