import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Mode } from './navbar.config';

@Component({
  selector: 'nm-navbar',
  templateUrl: './navbar.component.html'
})
export class NmNavbarComponent {
  @Input() mode: Mode = 'horizontal';
  @Output() clickItem = new EventEmitter<any>();

  constructor() { }

  clickMenuItem(item) {
    this.clickItem.emit(item);
  }
}