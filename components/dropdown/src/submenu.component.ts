import { Component, Input, ViewChild } from '@angular/core';

import { NmDropdownComponent } from './dropdown.component';
import { NmDropdownToggleDirective } from './dropdown-toggle.directive';
import { NmMenuItemComponent } from '@ngx-mini/menu';

function mixins(target: any, bases: any[]) {
  bases.forEach(basis => {
    Object.getOwnPropertyNames(basis.prototype).forEach(name => {
      target.prototype[name] = basis.prototype[name];
    });
  });
}

@Component({
  selector: '[nm-submenu]',
  templateUrl: './submenu.component.html'
})
export class NmSubmenuComponent extends NmDropdownComponent {
  /** specifies event that should trigger */
  @Input() trigger = 'hover';
  @Input() active: boolean;

  @ViewChild(NmDropdownToggleDirective) toggle: NmDropdownToggleDirective;

  protected setCurrentClasses(): void {
    this.classes = {
      'nm-menu-item': true,
      'nm-submenu': true,
      'nm-submenu-open': this.open,
      'active': this.active,
      'disabled': this.disabled
    };
  }
}